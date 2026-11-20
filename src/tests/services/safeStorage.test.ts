import { describe, it, expect, beforeEach } from 'vitest';
import { safeGetItem, safeSetItem, safeRemoveItem, isQuestionArray, isFlashcardArray } from '@/utils/safeStorage';
import { Question, Flashcard } from '@/types';

describe('Safe Storage Utility (Defensive Anti-Crash)', () => {
  beforeEach(() => {
    window.localStorage?.clear();
  });

  it('returns fallback when key does not exist in localStorage', () => {
    const result = safeGetItem('non_existent_key', ['default_item']);
    expect(result).toEqual(['default_item']);
  });

  it('safely handles corrupted or invalid JSON without throwing errors', () => {
    window.localStorage?.setItem('corrupted_key', '{ bad json: true, ...');
    const result = safeGetItem('corrupted_key', { fallback: true });
    expect(result).toEqual({ fallback: true });
  });

  it('safely validates parsed data using custom validator', () => {
    // Stored data is valid JSON, but wrong type (object instead of array)
    window.localStorage?.setItem('invalid_type_key', JSON.stringify({ notAnArray: true }));
    const result = safeGetItem('invalid_type_key', ['fallback_val'], (val): val is string[] => Array.isArray(val));
    expect(result).toEqual(['fallback_val']);
  });

  it('validates Question array properly with isQuestionArray', () => {
    const validQuestions: Question[] = [
      {
        id: 'q1',
        category: 'collocation',
        sentence: 'We comply _____ the law.',
        options: [
          { key: 'A', text: 'with' },
          { key: 'B', text: 'for' },
          { key: 'C', text: 'to' },
          { key: 'D', text: 'in' },
        ],
        correctAnswer: 'A',
        explanation: {
          translation: 'Bản dịch',
          keySignal: 'Dấu hiệu',
          whyCorrect: 'Lý do đúng',
          whyIncorrect: { B: 'sai', C: 'sai', D: 'sai' },
          fastTip: 'Mẹo 5s',
        },
      },
    ];

    expect(isQuestionArray(validQuestions)).toBe(true);
    expect(isQuestionArray('not an array')).toBe(false);
    expect(isQuestionArray([{ id: 'incomplete_q' }])).toBe(false);
    expect(isQuestionArray([null])).toBe(false);
  });

  it('validates Flashcard array properly with isFlashcardArray', () => {
    const validFlashcards: Flashcard[] = [
      {
        id: 'fc1',
        word: 'acquire',
        phonetic: '/əˈkwaɪər/',
        partOfSpeech: 'verb',
        definitionVi: 'đạt được, thâu tóm',
        definitionEn: 'to buy or obtain',
        exampleSentence: 'The firm acquired a new subsidiary.',
        exampleTranslation: 'Công ty đã mua lại một công ty con mới.',
        boxLevel: 1,
        nextReviewDate: new Date().toISOString(),
      },
    ];

    expect(isFlashcardArray(validFlashcards)).toBe(true);
    expect(isFlashcardArray('string')).toBe(false);
    expect(isFlashcardArray([{ word: 'only' }])).toBe(false);
  });

  it('safely saves and removes items with safeSetItem and safeRemoveItem', () => {
    const success = safeSetItem('test_key', { score: 100 });
    expect(success).toBe(true);

    const retrieved = safeGetItem('test_key', null);
    expect(retrieved).toEqual({ score: 100 });

    safeRemoveItem('test_key');
    expect(safeGetItem('test_key', null)).toBeNull();
  });
});
