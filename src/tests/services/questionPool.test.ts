import { describe, it, expect } from 'vitest';
import { 
  generateCombinatorialTenseQuestion, 
  generateCombinatorialTenseQuestions 
} from '@/services/combinatorialTenseGenerator';
import { 
  createQuizSession, 
  shuffleArray, 
  evaluateQuizSession 
} from '@/services/questionPoolService';
import { useHistoryStore } from '@/stores/useHistoryStore';

describe('Combinatorial Tense Question Generator', () => {
  it('should generate a valid question for a specific tense with 4 options and complete explanation', () => {
    const q = generateCombinatorialTenseQuestion('present-continuous');
    
    expect(q).toBeDefined();
    expect(q.id).toMatch(/^q_comb_present-continuous_/);
    expect(q.sentence).toContain('_____');
    expect(q.options).toHaveLength(4);
    expect(['A', 'B', 'C', 'D']).toContain(q.correctAnswer);
    
    // Check 100% full explanation
    expect(q.explanation.translation).toBeTruthy();
    expect(q.explanation.keySignal).toBeTruthy();
    expect(q.explanation.whyCorrect).toBeTruthy();
    expect(q.explanation.whyIncorrect).toBeDefined();
    expect(Object.keys(q.explanation.whyIncorrect)).toHaveLength(3);
    expect(q.explanation.fastTip).toBeTruthy();
  });

  it('should generate multiple non-duplicate questions across specified tenses', () => {
    const questions = generateCombinatorialTenseQuestions({
      count: 20,
      tenseId: 'all'
    });

    expect(questions).toHaveLength(20);
    // Check that question IDs are unique
    const uniqueIds = new Set(questions.map(q => q.id));
    expect(uniqueIds.size).toBe(20);

    // Check that sentences have varied content
    const uniqueSentences = new Set(questions.map(q => q.sentence));
    expect(uniqueSentences.size).toBe(20);
  });

  it('should generate at least 40 non-duplicate questions for a SINGLE tense without exhausting or colliding', () => {
    const singleTenseQuestions = generateCombinatorialTenseQuestions({
      count: 40,
      tenseId: 'past-simple'
    });
    expect(singleTenseQuestions).toHaveLength(40);
    const uniqueSentences = new Set(singleTenseQuestions.map(q => q.sentence));
    expect(uniqueSentences.size).toBe(40);
  });

  it('should support excluding previously answered question IDs to avoid repetition', () => {
    const firstBatch = generateCombinatorialTenseQuestions({
      count: 5,
      tenseId: 'past-simple'
    });
    const excludeIds = firstBatch.map(q => q.id);

    const secondBatch = generateCombinatorialTenseQuestions({
      count: 5,
      tenseId: 'past-simple',
      excludeIds
    });

    // None of the second batch should have IDs from firstBatch
    secondBatch.forEach(q => {
      expect(excludeIds).not.toContain(q.id);
    });
  });
});

describe('Question Pool & Session Service', () => {
  it('should shuffle arrays using Fisher-Yates without losing items', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffleArray(items);

    expect(shuffled).toHaveLength(10);
    expect(shuffled.sort((a, b) => a - b)).toEqual(items);
  });

  it('should create a quiz session with the exact requested count (e.g. 5, 10, 15, 25)', () => {
    const session10 = createQuizSession({
      category: 'tense',
      targetTense: 'all',
      count: 10
    });

    expect(session10.questions).toHaveLength(10);
    expect(session10.totalQuestions).toBe(10);
    expect(session10.currentIndex).toBe(0);

    const session25 = createQuizSession({
      category: 'tense',
      targetTense: 'present-perfect',
      count: 25
    });

    expect(session25.questions).toHaveLength(25);
    expect(session25.totalQuestions).toBe(25);
  });

  it('should support creating sessions for collocation and word-form categories with custom count', () => {
    const collocSession = createQuizSession({
      category: 'collocation',
      targetTense: 'with',
      count: 15
    });
    expect(collocSession.questions).toHaveLength(15);
    expect(new Set(collocSession.questions.map(q => q.id)).size).toBe(15);

    const wordFormSession = createQuizSession({
      category: 'word-form',
      count: 30
    });
    expect(wordFormSession.questions).toHaveLength(30);
  });

  it('should support creating comprehensive exam sessions combining all categories with 50 questions', () => {
    const examSession = createQuizSession({
      category: 'exam',
      count: 50
    });
    expect(examSession.questions).toHaveLength(50);
    expect(new Set(examSession.questions.map(q => q.id)).size).toBe(50);

    // Verify questions come from multiple categories
    const categories = new Set(examSession.questions.map(q => q.category));
    expect(categories.size).toBeGreaterThanOrEqual(2);
  });

  it('should evaluate quiz session and compute accuracy, score, and performance level', () => {
    const session = createQuizSession({
      category: 'tense',
      targetTense: 'all',
      count: 5
    });

    // Simulate answering 4 out of 5 correctly
    const answers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    session.questions.forEach((q, idx) => {
      if (idx < 4) {
        answers[q.id] = q.correctAnswer;
      } else {
        // wrong answer
        const wrongKey = q.options.find(o => o.key !== q.correctAnswer)!.key;
        answers[q.id] = wrongKey;
      }
    });

    const result = evaluateQuizSession(session.questions, answers);

    expect(result.total).toBe(5);
    expect(result.correctCount).toBe(4);
    expect(result.incorrectCount).toBe(1);
    expect(result.accuracyPercentage).toBe(80);
    expect(result.badge).toBe('Giỏi');
    expect(result.details).toHaveLength(5);
    expect(result.details[0].isCorrect).toBe(true);
    expect(result.details[4].isCorrect).toBe(false);
  });

  it('should automatically exclude questions recorded in global useHistoryStore', () => {
    useHistoryStore.getState().clearHistory();

    const sessionA = createQuizSession({
      category: 'tense',
      targetTense: 'present-simple',
      count: 5
    });

    const sessionAIds = sessionA.questions.map(q => q.id);
    useHistoryStore.getState().addAnsweredIds(sessionAIds);

    const sessionB = createQuizSession({
      category: 'tense',
      targetTense: 'present-simple',
      count: 5
    });

    // None of sessionB's question IDs should match sessionA
    sessionB.questions.forEach(q => {
      expect(sessionAIds).not.toContain(q.id);
    });
  });
});
