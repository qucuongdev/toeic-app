import { describe, it, expect } from 'vitest';
import { 
  calculateNextSrsState, 
  getReviewStatus, 
  selectCardsForReview, 
  getSrsStatistics 
} from '@/services/srsEngine';
import { Flashcard } from '@/types';

describe('SrsEngine Service (TDD)', () => {
  const baseCard: Flashcard = {
    id: 'w1',
    word: 'comply',
    phonetic: '/kəmˈplaɪ/',
    partOfSpeech: 'verb',
    definitionVi: 'tuân thủ, tuân theo',
    definitionEn: 'act in accordance with a wish or command',
    exampleSentence: 'All employees must comply with the rules.',
    exampleTranslation: 'Tất cả nhân viên phải tuân thủ quy tắc.',
    boxLevel: 1,
    nextReviewDate: new Date('2026-01-01').toISOString(),
  };

  describe('calculateNextSrsState()', () => {
    it('promotes card to Box 2 on "good" rating', () => {
      const now = new Date('2026-01-01T12:00:00Z');
      const updated = calculateNextSrsState(baseCard, 'good', now);
      expect(updated.boxLevel).toBe(2);
      // Box 2 interval: 3 days
      const reviewDate = new Date(updated.nextReviewDate);
      const diffDays = Math.round((reviewDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
      expect(diffDays).toBe(3);
    });

    it('promotes card to Box 3 on "easy" rating directly from Box 1', () => {
      const now = new Date('2026-01-01T12:00:00Z');
      const updated = calculateNextSrsState(baseCard, 'easy', now);
      expect(updated.boxLevel).toBe(2); // or skips to 2/3
      expect(updated.boxLevel).toBeGreaterThan(1);
    });

    it('resets card to Box 1 when rated "again"', () => {
      const highCard: Flashcard = { ...baseCard, boxLevel: 4 };
      const now = new Date('2026-01-01T12:00:00Z');
      const updated = calculateNextSrsState(highCard, 'again', now);
      expect(updated.boxLevel).toBe(1);
      // Box 1 interval is 1 day
      const reviewDate = new Date(updated.nextReviewDate);
      const diffDays = Math.round((reviewDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
      expect(diffDays).toBe(1);
    });

    it('maintains box level when rated "hard"', () => {
      const midCard: Flashcard = { ...baseCard, boxLevel: 3 };
      const now = new Date('2026-01-01T12:00:00Z');
      const updated = calculateNextSrsState(midCard, 'hard', now);
      expect(updated.boxLevel).toBe(3);
    });

    it('caps box level at maximum 5', () => {
      const maxCard: Flashcard = { ...baseCard, boxLevel: 5 };
      const now = new Date('2026-01-01T12:00:00Z');
      const updated = calculateNextSrsState(maxCard, 'easy', now);
      expect(updated.boxLevel).toBe(5);
    });
  });

  describe('getReviewStatus()', () => {
    it('detects card is due for review when nextReviewDate is in the past', () => {
      const pastCard: Flashcard = {
        ...baseCard,
        nextReviewDate: new Date('2025-01-01').toISOString(),
      };
      expect(getReviewStatus(pastCard, new Date('2026-01-01'))).toBe('due');
    });

    it('detects card is learning when nextReviewDate is in future', () => {
      const futureCard: Flashcard = {
        ...baseCard,
        nextReviewDate: new Date('2026-01-05').toISOString(),
      };
      expect(getReviewStatus(futureCard, new Date('2026-01-01'))).toBe('learning');
    });

    it('detects card is mastered when boxLevel is 5 and not due', () => {
      const masteredCard: Flashcard = {
        ...baseCard,
        boxLevel: 5,
        nextReviewDate: new Date('2026-02-01').toISOString(),
      };
      expect(getReviewStatus(masteredCard, new Date('2026-01-01'))).toBe('mastered');
    });
  });

  describe('selectCardsForReview() (True Leitner Due-Date Scheduling)', () => {
    const now = new Date('2026-11-16T12:00:00Z');

    const sampleCards: Flashcard[] = [
      {
        ...baseCard,
        id: 'c_due_box1',
        word: 'acquire',
        boxLevel: 1,
        nextReviewDate: new Date('2026-11-14T00:00:00Z').toISOString(), // 2 days overdue
      },
      {
        ...baseCard,
        id: 'c_due_box3',
        word: 'comply',
        boxLevel: 3,
        nextReviewDate: new Date('2026-11-15T00:00:00Z').toISOString(), // 1 day overdue
      },
      {
        ...baseCard,
        id: 'c_future_box2',
        word: 'negotiate',
        boxLevel: 2,
        nextReviewDate: new Date('2026-11-20T00:00:00Z').toISOString(), // future (not due)
      },
      {
        ...baseCard,
        id: 'c_mastered_future',
        word: 'revenue',
        boxLevel: 5,
        nextReviewDate: new Date('2026-12-01T00:00:00Z').toISOString(), // future
      },
    ];

    it('prioritizes overdue cards first, ordered by lowest boxLevel', () => {
      const selected = selectCardsForReview(sampleCards, 2, { referenceDate: now });
      expect(selected).toHaveLength(2);
      expect(selected[0].id).toBe('c_due_box1'); // Box 1 is more urgent than Box 3
      expect(selected[1].id).toBe('c_due_box3');
    });

    it('fills remaining quota with future cards if due cards are insufficient', () => {
      const selected = selectCardsForReview(sampleCards, 3, { referenceDate: now });
      expect(selected).toHaveLength(3);
      expect(selected[0].id).toBe('c_due_box1');
      expect(selected[1].id).toBe('c_due_box3');
      expect(['c_future_box2', 'c_mastered_future']).toContain(selected[2].id);
    });

    it('respects excludeIds to avoid immediate repetition within session', () => {
      const selected = selectCardsForReview(sampleCards, 2, {
        referenceDate: now,
        excludeIds: ['c_due_box1'],
      });
      expect(selected).toHaveLength(2);
      expect(selected[0].id).toBe('c_due_box3');
      expect(selected.map((c) => c.id)).not.toContain('c_due_box1');
    });
  });

  describe('getSrsStatistics()', () => {
    it('accurately calculates due, learning, mastered, and box breakdown', () => {
      const now = new Date('2026-11-16T12:00:00Z');
      const sampleCards: Flashcard[] = [
        { ...baseCard, id: '1', boxLevel: 1, nextReviewDate: new Date('2026-11-15').toISOString() }, // due
        { ...baseCard, id: '2', boxLevel: 2, nextReviewDate: new Date('2026-11-20').toISOString() }, // learning
        { ...baseCard, id: '3', boxLevel: 5, nextReviewDate: new Date('2026-12-01').toISOString() }, // mastered
      ];

      const stats = getSrsStatistics(sampleCards, now);
      expect(stats.total).toBe(3);
      expect(stats.dueCount).toBe(1);
      expect(stats.learningCount).toBe(1);
      expect(stats.masteredCount).toBe(1);
      expect(stats.boxDistribution[1]).toBe(1);
      expect(stats.boxDistribution[2]).toBe(1);
      expect(stats.boxDistribution[5]).toBe(1);
    });
  });
});
