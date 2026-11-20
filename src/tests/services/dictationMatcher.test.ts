import { describe, it, expect } from 'vitest';
import { evaluateDictation } from '@/services/dictationMatcher';

describe('DictationMatcher Service (TDD)', () => {
  const original = "The quarterly report will be released tomorrow morning.";

  it('recognizes 100% exact match regardless of case and punctuation', () => {
    const userInput = "the quarterly report will be released tomorrow morning";
    const result = evaluateDictation(userInput, original);

    expect(result.accuracyPercentage).toBe(100);
    expect(result.isExactMatch).toBe(true);
    expect(result.correctWordCount).toBe(8);
    expect(result.totalWordCount).toBe(8);
  });

  it('accurately identifies typo / incorrect words', () => {
    // "yearly" instead of "quarterly"
    const userInput = "The yearly report will be released tomorrow morning.";
    const result = evaluateDictation(userInput, original);

    expect(result.accuracyPercentage).toBeLessThan(100);
    expect(result.isExactMatch).toBe(false);
    expect(result.correctWordCount).toBe(7);
    expect(result.userTokens.some(t => t.text.toLowerCase() === 'yearly' && t.status === 'incorrect')).toBe(true);
  });

  it('handles missing words when user input is incomplete', () => {
    const userInput = "The quarterly report will";
    const result = evaluateDictation(userInput, original);

    expect(result.accuracyPercentage).toBe(50);
    expect(result.correctWordCount).toBe(4);
    expect(result.totalWordCount).toBe(8);
    expect(result.userTokens.some(t => t.status === 'missing')).toBe(true);
  });

  it('returns 0% for completely empty input', () => {
    const result = evaluateDictation('', original);
    expect(result.accuracyPercentage).toBe(0);
    expect(result.correctWordCount).toBe(0);
    expect(result.isExactMatch).toBe(false);
  });
});
