import { Flashcard, SrsRating } from '@/types';

// Leitner intervals in days per box level (1 to 5)
export const SRS_INTERVAL_DAYS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

export type CardReviewStatus = 'due' | 'learning' | 'mastered';

/**
 * Calculates updated box level and next review date based on user rating
 */
export function calculateNextSrsState(
  card: Flashcard,
  rating: SrsRating,
  referenceDate: Date = new Date()
): Flashcard {
  let newBoxLevel = card.boxLevel;

  switch (rating) {
    case 'again':
      // Reset back to box 1
      newBoxLevel = 1;
      break;
    case 'hard':
      // Keep same box level
      newBoxLevel = card.boxLevel;
      break;
    case 'good':
      // Advance by 1
      newBoxLevel = Math.min(5, card.boxLevel + 1);
      break;
    case 'easy':
      // Advance by 1 (or 2 if box 1)
      newBoxLevel = Math.min(5, card.boxLevel === 1 ? 2 : card.boxLevel + 1);
      break;
  }

  const intervalDays = SRS_INTERVAL_DAYS[newBoxLevel] || 1;
  const nextDate = new Date(referenceDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    ...card,
    boxLevel: newBoxLevel,
    nextReviewDate: nextDate.toISOString(),
    lastReviewedDate: referenceDate.toISOString(),
  };
}

/**
 * Evaluates the current state of a flashcard relative to current time
 */
export function getReviewStatus(
  card: Flashcard,
  referenceDate: Date = new Date()
): CardReviewStatus {
  const nextReview = new Date(card.nextReviewDate);
  const isDue = nextReview.getTime() <= referenceDate.getTime();

  if (isDue) {
    return 'due';
  }

  if (card.boxLevel === 5) {
    return 'mastered';
  }

  return 'learning';
}

export interface SelectCardsOptions {
  referenceDate?: Date;
  excludeIds?: string[];
}

export interface SrsStatistics {
  total: number;
  dueCount: number;
  learningCount: number;
  masteredCount: number;
  boxDistribution: Record<number, number>;
}

/**
 * Selects flashcards for review based strictly on Leitner SRS scheduling:
 * 1. Overdue/due cards first, prioritized by lowest boxLevel (urgent retention) and oldest due date
 * 2. If due cards < count, fills quota with non-due cards ordered by closest due date
 * 3. Respects session excludeIds to avoid immediate card repetition
 */
export function selectCardsForReview(
  allCards: Flashcard[],
  count: number,
  options: SelectCardsOptions = {}
): Flashcard[] {
  const { referenceDate = new Date(), excludeIds = [] } = options;
  const excludeSet = new Set(excludeIds);

  // Filter available cards not in excludeSet (unless all cards are excluded)
  let eligible = allCards.filter(c => !excludeSet.has(c.id));
  if (eligible.length === 0) {
    eligible = [...allCards];
  }

  // Separate due cards vs future cards
  const dueCards: Flashcard[] = [];
  const futureCards: Flashcard[] = [];

  eligible.forEach(card => {
    const isDue = new Date(card.nextReviewDate).getTime() <= referenceDate.getTime();
    if (isDue) {
      dueCards.push(card);
    } else {
      futureCards.push(card);
    }
  });

  // Sort due cards:
  // a) Lowest box level first (box 1 is most urgent, then box 2...)
  // b) Earliest nextReviewDate first (most overdue)
  dueCards.sort((a, b) => {
    if (a.boxLevel !== b.boxLevel) {
      return a.boxLevel - b.boxLevel;
    }
    return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
  });

  // Sort future cards:
  // a) Lowest box level first
  // b) Closest nextReviewDate first
  futureCards.sort((a, b) => {
    if (a.boxLevel !== b.boxLevel) {
      return a.boxLevel - b.boxLevel;
    }
    return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
  });

  // Combine: due cards first, then fill remaining quota with future cards
  const selected = [...dueCards.slice(0, count)];
  if (selected.length < count) {
    const needed = count - selected.length;
    selected.push(...futureCards.slice(0, needed));
  }

  return selected;
}

/**
 * Calculates current overall SRS statistics across all cards in the user's deck
 */
export function getSrsStatistics(
  allCards: Flashcard[],
  referenceDate: Date = new Date()
): SrsStatistics {
  const boxDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let dueCount = 0;
  let learningCount = 0;
  let masteredCount = 0;

  allCards.forEach(card => {
    boxDistribution[card.boxLevel] = (boxDistribution[card.boxLevel] || 0) + 1;
    const status = getReviewStatus(card, referenceDate);
    if (status === 'due') {
      dueCount++;
    } else if (status === 'mastered') {
      masteredCount++;
    } else {
      learningCount++;
    }
  });

  return {
    total: allCards.length,
    dueCount,
    learningCount,
    masteredCount,
    boxDistribution,
  };
}
