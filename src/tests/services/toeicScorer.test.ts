import { describe, it, expect } from 'vitest';
import { 
  calculateListeningScore, 
  calculateReadingScore, 
  calculateTotalToeicScore,
  calculatePart5Score
} from '@/services/toeicScorer';

describe('ToeicScorer Service (TDD)', () => {
  describe('calculateListeningScore()', () => {
    it('returns minimum 5 points for 0 correct answers', () => {
      expect(calculateListeningScore(0)).toBe(5);
    });

    it('returns maximum 495 points for 100 correct answers', () => {
      expect(calculateListeningScore(100)).toBe(495);
    });

    it('returns accurate ETS conversion for 50 correct answers', () => {
      const score = calculateListeningScore(50);
      expect(score).toBeGreaterThanOrEqual(230);
      expect(score).toBeLessThanOrEqual(260);
    });

    it('clamps negative or >100 raw scores safely', () => {
      expect(calculateListeningScore(-5)).toBe(5);
      expect(calculateListeningScore(120)).toBe(495);
    });
  });

  describe('calculateReadingScore()', () => {
    it('returns minimum 5 points for 0 correct answers', () => {
      expect(calculateReadingScore(0)).toBe(5);
    });

    it('returns maximum 495 points for 100 correct answers', () => {
      expect(calculateReadingScore(100)).toBe(495);
    });

    it('returns accurate ETS conversion for 50 correct answers', () => {
      const score = calculateReadingScore(50);
      expect(score).toBeGreaterThanOrEqual(210);
      expect(score).toBeLessThanOrEqual(245);
    });
  });

  describe('calculateTotalToeicScore()', () => {
    it('returns 10 points minimum for completely blank test', () => {
      const result = calculateTotalToeicScore(0, 0);
      expect(result.total).toBe(10);
      expect(result.listening).toBe(5);
      expect(result.reading).toBe(5);
    });

    it('returns 990 points for perfect test', () => {
      const result = calculateTotalToeicScore(100, 100);
      expect(result.total).toBe(990);
      expect(result.listening).toBe(495);
      expect(result.reading).toBe(495);
    });

    it('calculates CEFR proficiency level estimate', () => {
      const beginner = calculateTotalToeicScore(20, 20);
      expect(beginner.cefrLevel).toBe('A1/A2');

      const intermediate = calculateTotalToeicScore(65, 65);
      expect(intermediate.cefrLevel).toBe('B1/B2');

      const advanced = calculateTotalToeicScore(95, 95);
      expect(advanced.cefrLevel).toBe('C1');
    });
  });

  describe('calculatePart5Score() (Honest Part 5 Scoping & Disclaimer)', () => {
    it('calculates reading scaled score /495 based on Part 5 accuracy', () => {
      // 15 out of 30 = 50% accuracy
      const result = calculatePart5Score(15, 30);
      expect(result.accuracyPercentage).toBe(50);
      expect(result.part5ScaledScore).toBeGreaterThanOrEqual(210);
      expect(result.part5ScaledScore).toBeLessThanOrEqual(245);
      expect(result.estimatedFullToeic).toBe(result.part5ScaledScore * 2);
    });

    it('always includes explicit scope limitation disclaimer', () => {
      const result = calculatePart5Score(10, 10);
      expect(result.disclaimer).toContain('Part 5');
      expect(result.disclaimer).toContain('không đo lường kỹ năng Nghe');
    });

    it('handles perfect score 30/30 properly', () => {
      const result = calculatePart5Score(30, 30);
      expect(result.accuracyPercentage).toBe(100);
      expect(result.part5ScaledScore).toBe(495);
      expect(result.estimatedFullToeic).toBe(990);
      expect(result.cefrLevel).toBe('C1');
    });
  });
});
