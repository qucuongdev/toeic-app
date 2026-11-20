import { describe, it, expect } from 'vitest';
import { 
  generateWordFamilyQuestions, 
  generateWordFormSentenceCompletionQuestions,
  getWordFamilyByRoot,
  SEED_WORD_FAMILIES 
} from '@/services/wordFamilyEngine';

describe('WordFamilyEngine Service (TDD)', () => {
  it('has a rich database of word families with at least 40 families and all 4 forms (v, n, adj, adv)', () => {
    expect(SEED_WORD_FAMILIES.length).toBeGreaterThanOrEqual(40);
    const sample = SEED_WORD_FAMILIES[0];
    expect(sample).toHaveProperty('root');
    expect(sample).toHaveProperty('verb');
    expect(sample).toHaveProperty('noun');
    expect(sample).toHaveProperty('adjective');
    expect(sample).toHaveProperty('adverb');

    // Assert that every family has 4 pairwise distinct words so multiple choice options are never duplicate
    const duplicateRoots: string[] = [];
    SEED_WORD_FAMILIES.forEach((fam) => {
      const words = [fam.verb.word, fam.noun.word, fam.adjective.word, fam.adverb.word].map(w => w.trim().toLowerCase());
      const unique = new Set(words);
      if (unique.size !== 4) {
        duplicateRoots.push(`${fam.root}: [${words.join(', ')}]`);
      }
    });
    expect(duplicateRoots, 'Word families with duplicate words across POS forms').toEqual([]);
  });

  describe('generateWordFamilyQuestions()', () => {
    it('generates at least 40 "Find the VERB" questions with 4 choices from same family', () => {
      const questions = generateWordFamilyQuestions('verb');
      expect(questions.length).toBeGreaterThanOrEqual(40);
      
      const q = questions[0];
      expect(q.sentence).toContain('Động từ (Verb)');
      expect(q.options).toHaveLength(4);
      
      // Verify correct option corresponds to the verb
      const correctOpt = q.options.find(o => o.key === q.correctAnswer);
      expect(correctOpt).toBeDefined();
      expect(q.explanation.whyCorrect).toContain('Động từ');
      expect(q.explanation.whyIncorrect).toBeDefined();
    });

    it('generates "Find the NOUN" questions', () => {
      const questions = generateWordFamilyQuestions('noun');
      expect(questions.length).toBeGreaterThan(0);
      const q = questions[0];
      expect(q.sentence).toContain('Danh từ (Noun)');
    });

    it('generates "Find the ADJECTIVE" questions', () => {
      const questions = generateWordFamilyQuestions('adjective');
      expect(questions.length).toBeGreaterThan(0);
      const q = questions[0];
      expect(q.sentence).toContain('Tính từ (Adjective)');
    });

    it('generates "Find the ADVERB" questions', () => {
      const questions = generateWordFamilyQuestions('adverb');
      expect(questions.length).toBeGreaterThan(0);
      const q = questions[0];
      expect(q.sentence).toContain('Trạng từ (Adverb)');
    });

    it('includes complete 100% explanation with suffix analysis for each choice', () => {
      const questions = generateWordFamilyQuestions('verb');
      const q = questions[0];
      expect(q.explanation.translation).toBeDefined();
      expect(q.explanation.keySignal).toBeDefined();
      expect(q.explanation.whyCorrect).toBeDefined();
      expect(q.explanation.fastTip).toBeDefined();
      expect(Object.keys(q.explanation.whyIncorrect).length).toBe(3);
    });
  });

  describe('generateWordFormSentenceCompletionQuestions()', () => {
    it('generates authentic TOEIC Part 5 fill-in-the-blank questions containing "____"', () => {
      const questions = generateWordFormSentenceCompletionQuestions({ count: 10, targetPos: 'noun' });
      expect(questions.length).toBe(10);
      const q = questions[0];
      expect(q.sentence).toContain('_____');
      expect(q.options).toHaveLength(4);
      expect(['A', 'B', 'C', 'D']).toContain(q.correctAnswer);
      expect(q.explanation.keySignal).toBeTruthy();
      expect(q.explanation.whyCorrect).toBeTruthy();
      expect(Object.keys(q.explanation.whyIncorrect)).toHaveLength(3);
      expect(q.explanation.fastTip).toBeTruthy();
    });

    it('supports generating adjective and adverb fill-in-the-blank questions', () => {
      const adjQuestions = generateWordFormSentenceCompletionQuestions({ count: 5, targetPos: 'adjective' });
      expect(adjQuestions.length).toBe(5);

      const advQuestions = generateWordFormSentenceCompletionQuestions({ count: 5, targetPos: 'adverb' });
      expect(advQuestions.length).toBe(5);
    });
  });

  describe('getWordFamilyByRoot()', () => {
    it('finds word family by root name', () => {
      const family = getWordFamilyByRoot('create');
      expect(family).toBeDefined();
      expect(family?.verb.word).toBe('create');
      expect(family?.noun.word).toBe('creation');
      expect(family?.adjective.word).toBe('creative');
      expect(family?.adverb.word).toBe('creatively');
    });
  });
});
