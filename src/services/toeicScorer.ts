// Standard ETS TOEIC raw score to scaled score conversion (10 - 990 points)

export interface ToeicScoreResult {
  listening: number;
  reading: number;
  total: number;
  cefrLevel: 'A1/A2' | 'B1/B2' | 'C1';
}

/**
 * Calculates TOEIC Listening section score (5 - 495 points)
 * @param rawCount Number of correct answers out of 100
 */
export function calculateListeningScore(rawCount: number): number {
  if (rawCount <= 0) return 5;
  if (rawCount >= 98) return 495;

  // Approximate ETS regression curve for Listening
  // Minimum score: 5
  // Score around 50 is ~245
  // Scale increments by 5
  const raw = Math.min(100, Math.max(0, rawCount));
  
  if (raw <= 10) return 5 + raw * 2;
  if (raw <= 30) return 25 + (raw - 10) * 4.5;
  if (raw <= 50) return 115 + (raw - 30) * 6.5; // at 50: ~245
  if (raw <= 75) return 245 + (raw - 50) * 5.5; // at 75: ~382
  if (raw <= 95) return 382 + (raw - 75) * 5;   // at 95: ~482
  
  const estimated = 482 + (raw - 95) * 4.3;
  // Round to nearest multiple of 5
  return Math.min(495, Math.max(5, Math.round(estimated / 5) * 5));
}

/**
 * Calculates TOEIC Reading section score (5 - 495 points)
 * @param rawCount Number of correct answers out of 100
 */
export function calculateReadingScore(rawCount: number): number {
  if (rawCount <= 0) return 5;
  if (rawCount >= 99) return 495;

  // Reading scale is slightly harsher than listening
  const raw = Math.min(100, Math.max(0, rawCount));
  
  if (raw <= 15) return 5 + raw * 1.5;
  if (raw <= 35) return 30 + (raw - 15) * 4.5;
  if (raw <= 50) return 120 + (raw - 35) * 7.0; // at 50: ~225
  if (raw <= 75) return 225 + (raw - 50) * 6.0; // at 75: ~375
  if (raw <= 95) return 375 + (raw - 75) * 5.2; // at 95: ~479
  
  const estimated = 479 + (raw - 95) * 4.0;
  return Math.min(495, Math.max(5, Math.round(estimated / 5) * 5));
}

/**
 * Calculates total scaled score and CEFR proficiency
 */
export function calculateTotalToeicScore(rawListening: number, rawReading: number): ToeicScoreResult {
  const listening = calculateListeningScore(rawListening);
  const reading = calculateReadingScore(rawReading);
  const total = listening + reading;

  let cefrLevel: 'A1/A2' | 'B1/B2' | 'C1' = 'A1/A2';
  if (total >= 785) {
    cefrLevel = 'C1';
  } else if (total >= 450) {
    cefrLevel = 'B1/B2';
  } else {
    cefrLevel = 'A1/A2';
  }

  return {
    listening,
    reading,
    total,
    cefrLevel
  };
}

export interface Part5ScoreResult {
  correctCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  part5ScaledScore: number; // 5 - 495 (Reading Part 5 scaled score)
  estimatedFullToeic: number; // reference overall scale (~10 - 990)
  cefrLevel: 'A1/A2' | 'B1/B2' | 'C1';
  disclaimer: string;
}

/**
 * Calculates accurate Part 5 Reading scaled score (out of 495)
 * and provides projected overall TOEIC score with explicit ETS scope disclaimer.
 */
export function calculatePart5Score(correctCount: number, totalQuestions: number): Part5ScoreResult {
  const safeTotal = Math.max(1, totalQuestions);
  const safeCorrect = Math.max(0, Math.min(correctCount, safeTotal));
  const accuracy = Math.round((safeCorrect / safeTotal) * 100);
  
  // Reading scaled score (out of 495) using ETS raw reading conversion curve
  const part5ScaledScore = calculateReadingScore(accuracy);

  // Projected overall TOEIC (assuming comparable listening proficiency)
  const estimatedFullToeic = part5ScaledScore * 2;

  let cefrLevel: 'A1/A2' | 'B1/B2' | 'C1' = 'A1/A2';
  if (estimatedFullToeic >= 785) {
    cefrLevel = 'C1';
  } else if (estimatedFullToeic >= 450) {
    cefrLevel = 'B1/B2';
  } else {
    cefrLevel = 'A1/A2';
  }

  return {
    correctCount: safeCorrect,
    totalQuestions: safeTotal,
    accuracyPercentage: accuracy,
    part5ScaledScore,
    estimatedFullToeic,
    cefrLevel,
    disclaimer: 'Bài thi này chỉ đánh giá Part 5 (Kỹ năng Đọc - Hoàn thành câu), không đo lường kỹ năng Nghe (Part 1-4) và Đọc hiểu đoạn văn (Part 6-7). Điểm tổng là phép ngoại suy ước tính cho mục đích luyện tập.'
  };
}
