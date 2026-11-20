import { describe, it, expect } from 'vitest';
import { 
  filterQuestionsByClue, 
  validateCollocationPair, 
  getCollocationClueTips 
} from '@/services/collocationEngine';
import { 
  generateCombinatorialCollocationQuestions,
  COLLOCATION_PATTERNS 
} from '@/services/combinatorialCollocationGenerator';
import { Question } from '@/types';

describe('CollocationEngine Service (TDD)', () => {
  const sampleQuestions: Question[] = [
    {
      id: 'q1',
      category: 'collocation',
      clueGroup: 'with',
      clueWord: 'with',
      sentence: 'All staff must comply _____ safety rules.',
      options: [
        { key: 'A', text: 'with' },
        { key: 'B', text: 'to' },
        { key: 'C', text: 'for' },
        { key: 'D', text: 'at' },
      ],
      correctAnswer: 'A',
      explanation: {
        translation: 'Nhân viên phải tuân thủ quy định an toàn.',
        keySignal: 'comply đi với with',
        whyCorrect: 'comply with nghĩa là tuân thủ',
        whyIncorrect: { B: 'sai giới từ', C: 'sai giới từ', D: 'sai giới từ' },
        fastTip: 'comply đi với with'
      }
    },
    {
      id: 'q2',
      category: 'collocation',
      clueGroup: 'for',
      clueWord: 'for',
      sentence: 'She is responsible _____ the marketing budget.',
      options: [
        { key: 'A', text: 'with' },
        { key: 'B', text: 'for' },
        { key: 'C', text: 'to' },
        { key: 'D', text: 'in' },
      ],
      correctAnswer: 'B',
      explanation: {
        translation: 'Cô ấy chịu trách nhiệm về ngân sách tiếp thị.',
        keySignal: 'responsible đi với for',
        whyCorrect: 'responsible for nghĩa là chịu trách nhiệm',
        whyIncorrect: { A: 'sai', C: 'sai', D: 'sai' },
        fastTip: 'responsible for'
      }
    },
    {
      id: 'q3',
      category: 'conjunction',
      clueGroup: 'between-and',
      clueWord: 'between',
      sentence: 'The conference is scheduled between Monday _____ Wednesday.',
      options: [
        { key: 'A', text: 'or' },
        { key: 'B', text: 'and' },
        { key: 'C', text: 'with' },
        { key: 'D', text: 'to' },
      ],
      correctAnswer: 'B',
      explanation: {
        translation: 'Hội nghị được lên lịch giữa Thứ Hai và Thứ Tư.',
        keySignal: 'Between đi với and',
        whyCorrect: 'between ... and ...',
        whyIncorrect: { A: 'sai', C: 'sai', D: 'sai' },
        fastTip: 'between A and B'
      }
    }
  ];

  describe('filterQuestionsByClue()', () => {
    it('filters questions accurately by clue group "with"', () => {
      const result = filterQuestionsByClue(sampleQuestions, 'with');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('q1');
    });

    it('returns all questions when clue group is "all" or undefined', () => {
      const result = filterQuestionsByClue(sampleQuestions, 'all');
      expect(result).toHaveLength(3);
    });

    it('returns empty array when no questions match the clue group', () => {
      const result = filterQuestionsByClue(sampleQuestions, 'neither-nor');
      expect(result).toHaveLength(0);
    });
  });

  describe('validateCollocationPair()', () => {
    it('validates common "with" collocations', () => {
      expect(validateCollocationPair('comply', 'with')).toBe(true);
      expect(validateCollocationPair('collaborate', 'with')).toBe(true);
      expect(validateCollocationPair('deal', 'with')).toBe(true);
      expect(validateCollocationPair('responsible', 'with')).toBe(false);
    });

    it('validates common "for" collocations', () => {
      expect(validateCollocationPair('responsible', 'for')).toBe(true);
      expect(validateCollocationPair('eligible', 'for')).toBe(true);
      expect(validateCollocationPair('apply', 'for')).toBe(true);
      expect(validateCollocationPair('comply', 'for')).toBe(false);
    });

    it('validates paired conjunctions', () => {
      expect(validateCollocationPair('between', 'and')).toBe(true);
      expect(validateCollocationPair('either', 'or')).toBe(true);
      expect(validateCollocationPair('neither', 'nor')).toBe(true);
      expect(validateCollocationPair('either', 'nor')).toBe(false);
    });
  });

  describe('getCollocationClueTips()', () => {
    it('returns a cheat-sheet list of collocations for "with"', () => {
      const tips = getCollocationClueTips('with');
      expect(tips.length).toBeGreaterThan(0);
      expect(tips.some(t => t.phrase.includes('comply with'))).toBe(true);
    });
  });

  describe('generateCombinatorialCollocationQuestions()', () => {
    it('has at least 60 rich collocation patterns across prepositions and conjunctions', () => {
      expect(COLLOCATION_PATTERNS.length).toBeGreaterThanOrEqual(60);
    });

    it('generates at least 10 distinct questions specifically for group "with"', () => {
      const qs = generateCombinatorialCollocationQuestions({ count: 10, group: 'with' });
      expect(qs.length).toBe(10);
      const uniqueIds = new Set(qs.map(q => q.id));
      expect(uniqueIds.size).toBe(10);
    });

    it('generates at least 25 parameterized varied questions for group "with" without exhausting', () => {
      const qs = generateCombinatorialCollocationQuestions({ count: 25, group: 'with' });
      expect(qs.length).toBe(25);
      const uniqueIds = new Set(qs.map(q => q.id));
      expect(uniqueIds.size).toBe(25);
    });

    it('generates at least 10 distinct questions specifically for group "for"', () => {
      const qs = generateCombinatorialCollocationQuestions({ count: 10, group: 'for' });
      expect(qs.length).toBe(10);
      const uniqueIds = new Set(qs.map(q => q.id));
      expect(uniqueIds.size).toBe(10);
    });

    it('generates at least 8 distinct questions specifically for group "to"', () => {
      const qs = generateCombinatorialCollocationQuestions({ count: 8, group: 'to' });
      expect(qs.length).toBe(8);
    });

    it('generates at least 8 distinct questions specifically for group "in"', () => {
      const qs = generateCombinatorialCollocationQuestions({ count: 8, group: 'in' });
      expect(qs.length).toBe(8);
    });

    it('generates at least 8 distinct questions specifically for group "on"', () => {
      const qs = generateCombinatorialCollocationQuestions({ count: 8, group: 'on' });
      expect(qs.length).toBe(8);
    });
  });
});
