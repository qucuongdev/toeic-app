import { describe, it, expect } from 'vitest';
import { 
  getQuestionsByTense, 
  ALL_12_TENSES_METADATA
} from '@/services/tensesEngine';
import { generateCombinatorialTenseQuestions } from '@/services/combinatorialTenseGenerator';

describe('TensesEngine Service (TDD)', () => {
  it('covers all 12 English tenses in metadata', () => {
    expect(ALL_12_TENSES_METADATA).toHaveLength(12);
  });

  describe('Filtering by every individual tense', () => {
    const all12Ids = ALL_12_TENSES_METADATA.map(t => t.id);

    all12Ids.forEach((tenseId) => {
      it(`returns specific questions when filtering by individual tense: "${tenseId}"`, () => {
        const questions = getQuestionsByTense(tenseId);
        expect(questions.length).toBeGreaterThanOrEqual(1);
        questions.forEach(q => {
          expect(q.options).toHaveLength(4);
          expect(q.explanation.translation).toBeDefined();
          expect(q.explanation.keySignal).toBeDefined();
          expect(q.explanation.whyCorrect).toBeDefined();
          expect(Object.keys(q.explanation.whyIncorrect).length).toBe(3);
          expect(q.explanation.fastTip).toBeDefined();
        });
      });
    });
  });

  describe('Group Filtering Accuracy (No Leakage between Present, Past, Future)', () => {
    it('strictly generates only present tenses when filtering by group-present', () => {
      const presentTenses = ['present-simple', 'present-continuous', 'present-perfect', 'present-perfect-continuous'];
      const questions = generateCombinatorialTenseQuestions({
        count: 20,
        tenseId: 'group-present',
      });

      expect(questions).toHaveLength(20);
      questions.forEach((q) => {
        expect(presentTenses).toContain(q.clueGroup);
        expect(q.clueGroup).not.toMatch(/^past-/);
        expect(q.clueGroup).not.toMatch(/^future-/);
      });
    });

    it('strictly generates only past tenses when filtering by group-past', () => {
      const pastTenses = ['past-simple', 'past-continuous', 'past-perfect', 'past-perfect-continuous'];
      const questions = generateCombinatorialTenseQuestions({
        count: 20,
        tenseId: 'group-past',
      });

      expect(questions).toHaveLength(20);
      questions.forEach((q) => {
        expect(pastTenses).toContain(q.clueGroup);
        expect(q.clueGroup).not.toMatch(/^present-/);
        expect(q.clueGroup).not.toMatch(/^future-/);
      });
    });

    it('strictly generates only future tenses when filtering by group-future', () => {
      const futureTenses = ['future-simple', 'future-continuous', 'future-perfect', 'future-perfect-continuous'];
      const questions = generateCombinatorialTenseQuestions({
        count: 20,
        tenseId: 'group-future',
      });

      expect(questions).toHaveLength(20);
      questions.forEach((q) => {
        expect(futureTenses).toContain(q.clueGroup);
        expect(q.clueGroup).not.toMatch(/^present-/);
        expect(q.clueGroup).not.toMatch(/^past-/);
      });
    });
  });
});
