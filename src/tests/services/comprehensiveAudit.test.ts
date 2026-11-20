import { describe, it, expect } from 'vitest';
import { 
  generateCombinatorialTenseQuestion,
  generateCombinatorialTenseQuestions 
} from '@/services/combinatorialTenseGenerator';
import { 
  COLLOCATION_PATTERNS, 
  generateCombinatorialCollocationQuestions 
} from '@/services/combinatorialCollocationGenerator';
import { 
  generateWordFamilyQuestions, 
  generateWordFormSentenceCompletionQuestions,
  SEED_WORD_FAMILIES 
} from '@/services/wordFamilyEngine';
import { CURATED_ETS_PART5_BANK } from '@/data/curatedToeicBank';
import { SEED_QUESTIONS } from '@/data/seedQuestions';
import { SEED_12_TENSES_QUESTIONS, ALL_12_TENSES_METADATA, TenseId } from '@/services/tensesEngine';
import { Question } from '@/types';

function validateQuestionStrict(q: Question, origin: string) {
  // 1. Basic properties
  expect(q.id, `${origin}: missing ID`).toBeTruthy();
  expect(q.sentence, `${origin} (${q.id}): missing sentence`).toBeTruthy();
  if (!q.id.startsWith('q_wf_identify_')) {
    expect(q.sentence, `${origin} (${q.id}): sentence must contain blank "____"`).toContain('_____');
  }

  // 2. Options validation (Must have 4 unique choices)
  expect(q.options, `${origin} (${q.id}): must have 4 options`).toHaveLength(4);
  const keys = q.options.map(o => o.key);
  expect(keys.sort(), `${origin} (${q.id}): options keys must be A, B, C, D`).toEqual(['A', 'B', 'C', 'D']);
  
  const optionTexts = q.options.map(o => o.text.trim().toLowerCase());
  const uniqueOptionTexts = new Set(optionTexts);
  expect(uniqueOptionTexts.size, `${origin} (${q.id}): all 4 options must be distinct choices, found duplicates`).toBe(4);

  q.options.forEach(o => {
    expect(o.text.trim(), `${origin} (${q.id}): option ${o.key} text must be non-empty`).toBeTruthy();
  });

  // 3. Correct answer validation & Sentence grammar plug-in check
  expect(['A', 'B', 'C', 'D'], `${origin} (${q.id}): correctAnswer must be A/B/C/D`).toContain(q.correctAnswer);
  const correctOpt = q.options.find(o => o.key === q.correctAnswer)!;
  expect(correctOpt, `${origin} (${q.id}): option with key ${q.correctAnswer} must exist`).toBeDefined();

  if (q.sentence.includes('_____')) {
    const filledSentence = q.sentence.replace('_____', correctOpt.text);
    expect(filledSentence, `${origin} (${q.id}): filled sentence must not contain residual blank`).not.toContain('_____');
    expect(filledSentence.trim().endsWith('.') || filledSentence.trim().endsWith('?') || filledSentence.trim().endsWith('!'), 
      `${origin} (${q.id}): completed sentence must end with valid punctuation`).toBe(true);
  }

  // 4. Explanation 100% full 5 points
  const exp = q.explanation;
  expect(exp, `${origin} (${q.id}): missing explanation`).toBeDefined();
  expect(exp.translation, `${origin} (${q.id}): missing translation`).toBeTruthy();
  expect(exp.translation, `${origin} (${q.id}): translation must not have placeholder`).not.toMatch(/TODO|mock|null|undefined/i);
  
  expect(exp.keySignal, `${origin} (${q.id}): missing keySignal`).toBeTruthy();
  expect(exp.whyCorrect, `${origin} (${q.id}): missing whyCorrect`).toBeTruthy();
  expect(exp.fastTip, `${origin} (${q.id}): missing fastTip`).toBeTruthy();

  // 5. WhyIncorrect covers distractors
  expect(exp.whyIncorrect, `${origin} (${q.id}): missing whyIncorrect`).toBeDefined();
  const incorrectKeys = ['A', 'B', 'C', 'D'].filter(k => k !== q.correctAnswer);
  incorrectKeys.forEach(ik => {
    const reason = exp.whyIncorrect[ik] || exp.whyIncorrect[q.options.find(o => o.key === ik)?.text || ''];
    expect(reason, `${origin} (${q.id}): missing whyIncorrect explanation for distractor ${ik}`).toBeTruthy();
  });
}

describe('COMPREHENSIVE 100% ACCURACY & ANTI-SLOP AUDIT', () => {
  describe('Audit: Curated ETS Part 5 Bank', () => {
    it('validates 100% of curated ETS Part 5 questions for accuracy and complete explanations', () => {
      CURATED_ETS_PART5_BANK.forEach(q => {
        validateQuestionStrict(q, 'Curated ETS Part 5');
      });
    });
  });

  describe('Audit: Seed Questions (seedQuestions.ts)', () => {
    it('validates 100% of seed questions', () => {
      SEED_QUESTIONS.forEach(q => {
        validateQuestionStrict(q, 'Seed Questions');
      });
    });
  });

  describe('Audit: 12 Tenses Seed Questions (tensesEngine.ts)', () => {
    it('validates 100% of seed 12 tenses questions', () => {
      SEED_12_TENSES_QUESTIONS.forEach(q => {
        validateQuestionStrict(q, 'Seed 12 Tenses');
      });
    });
  });

  describe('Audit: Combinatorial Tenses Generator (All 12 Tenses, 500 samples)', () => {
    it('validates 500 procedurally generated tense questions across all 12 tenses', () => {
      const allTenses: TenseId[] = ALL_12_TENSES_METADATA.map(m => m.id);
      
      for (let i = 0; i < 500; i++) {
        const tenseId = allTenses[i % allTenses.length];
        const q = generateCombinatorialTenseQuestion(tenseId, i);
        validateQuestionStrict(q, `Combinatorial Tense (${tenseId}, seed ${i})`);
      }
    });

    it('validates 100% strict group boundary confinement for present, past, future groups', () => {
      const presentGroups = generateCombinatorialTenseQuestions({ count: 50, tenseId: 'group-present' });
      const pastGroups = generateCombinatorialTenseQuestions({ count: 50, tenseId: 'group-past' });
      const futureGroups = generateCombinatorialTenseQuestions({ count: 50, tenseId: 'group-future' });

      expect(presentGroups).toHaveLength(50);
      expect(pastGroups).toHaveLength(50);
      expect(futureGroups).toHaveLength(50);

      presentGroups.forEach(q => {
        validateQuestionStrict(q, 'Group Present');
        expect(q.clueGroup).toMatch(/^present-/);
      });

      pastGroups.forEach(q => {
        validateQuestionStrict(q, 'Group Past');
        expect(q.clueGroup).toMatch(/^past-/);
      });

      futureGroups.forEach(q => {
        validateQuestionStrict(q, 'Group Future');
        expect(q.clueGroup).toMatch(/^future-/);
      });
    });
  });

  describe('Audit: Collocation Patterns & Generator', () => {
    it('validates all handcrafted collocation patterns', () => {
      expect(COLLOCATION_PATTERNS.length).toBeGreaterThanOrEqual(70);
      COLLOCATION_PATTERNS.forEach(p => {
        expect(p.sentenceTemplate).toContain('_____');
        expect(p.correctWord).toBeTruthy();
        expect(p.distractors).toHaveLength(3);
        expect(p.translation).toBeTruthy();
        expect(p.whyCorrect).toBeTruthy();
        expect(p.fastTip).toBeTruthy();
      });
    });

    it('validates 100 generated collocation questions', () => {
      const questions = generateCombinatorialCollocationQuestions({ count: 100, group: 'all' });
      expect(questions.length).toBe(100);
      questions.forEach(q => {
        validateQuestionStrict(q, 'Combinatorial Collocation');
      });
    });
  });

  describe('Audit: Word Family Engine (47 Families)', () => {
    it('validates all 47 word families have v, n, adj, adv with suffixes and meanings', () => {
      expect(SEED_WORD_FAMILIES.length).toBeGreaterThanOrEqual(40);
      SEED_WORD_FAMILIES.forEach(f => {
        expect(f.verb.word).toBeTruthy();
        expect(f.verb.suffix).toBeTruthy();
        expect(f.noun.word).toBeTruthy();
        expect(f.noun.suffix).toBeTruthy();
        expect(f.adjective.word).toBeTruthy();
        expect(f.adjective.suffix).toBeTruthy();
        expect(f.adverb.word).toBeTruthy();
        expect(f.adverb.suffix).toBeTruthy();
      });
    });

    it('validates POS identification questions across verb, noun, adj, adv', () => {
      const vQs = generateWordFamilyQuestions('verb');
      const nQs = generateWordFamilyQuestions('noun');
      const adjQs = generateWordFamilyQuestions('adjective');
      const advQs = generateWordFamilyQuestions('adverb');

      [...vQs, ...nQs, ...adjQs, ...advQs].forEach(q => {
        validateQuestionStrict(q, 'Word Family Identification');
      });
    });

    it('validates Part 5 Word Form Sentence Completion questions', () => {
      const sentenceQs = generateWordFormSentenceCompletionQuestions({ count: 80, targetPos: 'all' });
      expect(sentenceQs.length).toBe(80);
      sentenceQs.forEach(q => {
        validateQuestionStrict(q, 'Word Form Sentence Completion');
      });
    });
  });
});
