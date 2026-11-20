import { describe, it, expect } from 'vitest';
import { 
  detectSuffixType, 
  guessExpectedPartOfSpeech, 
  getWordFormRules 
} from '@/services/wordFormChecker';

describe('WordFormChecker Service (TDD)', () => {
  describe('detectSuffixType()', () => {
    it('should correctly identify NOUN suffixes', () => {
      expect(detectSuffixType('information')).toBe('noun');
      expect(detectSuffixType('management')).toBe('noun');
      expect(detectSuffixType('darkness')).toBe('noun');
      expect(detectSuffixType('possibility')).toBe('noun');
      expect(detectSuffixType('performance')).toBe('noun');
      expect(detectSuffixType('supervisor')).toBe('noun');
    });

    it('should correctly identify ADJECTIVE suffixes', () => {
      expect(detectSuffixType('reliable')).toBe('adjective');
      expect(detectSuffixType('competitive')).toBe('adjective');
      expect(detectSuffixType('successful')).toBe('adjective');
      expect(detectSuffixType('economic')).toBe('adjective');
      expect(detectSuffixType('financial')).toBe('adjective');
      expect(detectSuffixType('careless')).toBe('adjective');
    });

    it('should correctly identify ADVERB suffixes', () => {
      expect(detectSuffixType('quickly')).toBe('adverb');
      expect(detectSuffixType('efficiently')).toBe('adverb');
      expect(detectSuffixType('significantly')).toBe('adverb');
    });

    it('should correctly identify VERB suffixes', () => {
      expect(detectSuffixType('maximize')).toBe('verb');
      expect(detectSuffixType('broaden')).toBe('verb');
      expect(detectSuffixType('simplify')).toBe('verb');
    });

    it('should return undefined for non-matching or unknown words', () => {
      expect(detectSuffixType('table')).toBeUndefined();
      expect(detectSuffixType('')).toBeUndefined();
    });
  });

  describe('guessExpectedPartOfSpeech()', () => {
    it('predicts ADJECTIVE when blank is between determiner and noun', () => {
      // e.g. "a [_____] decision"
      const result = guessExpectedPartOfSpeech({
        wordBefore: 'a',
        wordAfter: 'decision'
      });
      expect(result).toBe('adjective');
    });

    it('predicts ADVERB when blank is between auxiliary and main verb', () => {
      // e.g. "has [_____] completed"
      const result = guessExpectedPartOfSpeech({
        wordBefore: 'has',
        wordAfter: 'completed'
      });
      expect(result).toBe('adverb');
    });

    it('predicts ADJECTIVE after linking verbs (remain, seem, be)', () => {
      // e.g. "remains [_____]."
      const result = guessExpectedPartOfSpeech({
        wordBefore: 'remains',
        wordAfter: '.'
      });
      expect(result).toBe('adjective');
    });

    it('predicts NOUN after prepositions or possessive adjectives when followed by punctuation', () => {
      // e.g. "their [_____]."
      const result = guessExpectedPartOfSpeech({
        wordBefore: 'their',
        wordAfter: '.'
      });
      expect(result).toBe('noun');
    });
  });

  describe('getWordFormRules()', () => {
    it('returns a comprehensive list of rules with explanations', () => {
      const rules = getWordFormRules();
      expect(rules.length).toBeGreaterThanOrEqual(4);
      expect(rules[0]).toHaveProperty('title');
      expect(rules[0]).toHaveProperty('pattern');
      expect(rules[0]).toHaveProperty('example');
      expect(rules[0]).toHaveProperty('tip');
    });
  });
});
