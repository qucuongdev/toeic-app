import { describe, it, expect, beforeEach } from 'vitest';
import { useExamStore } from '@/stores/useExamStore';
import { Question } from '@/types';

describe('useExamStore (Session Persistence across Tabs)', () => {
  const dummyQuestions: Question[] = [
    {
      id: 'q1',
      category: 'collocation',
      sentence: 'The contract was signed _____ the president.',
      options: [
        { key: 'A', text: 'by' },
        { key: 'B', text: 'for' },
        { key: 'C', text: 'to' },
        { key: 'D', text: 'with' },
      ],
      correctAnswer: 'A',
      explanation: {
        translation: 'Bản dịch',
        keySignal: 'Dấu hiệu',
        whyCorrect: 'Lý do đúng',
        whyIncorrect: { B: 'sai', C: 'sai', D: 'sai' },
        fastTip: 'Mẹo',
      },
    },
    {
      id: 'q2',
      category: 'collocation',
      sentence: 'Please review the attached document _____ detail.',
      options: [
        { key: 'A', text: 'in' },
        { key: 'B', text: 'on' },
        { key: 'C', text: 'at' },
        { key: 'D', text: 'for' },
      ],
      correctAnswer: 'A',
      explanation: {
        translation: 'Bản dịch 2',
        keySignal: 'Dấu hiệu 2',
        whyCorrect: 'Lý do đúng 2',
        whyIncorrect: { B: 'sai', C: 'sai', D: 'sai' },
        fastTip: 'Mẹo 2',
      },
    },
  ];

  beforeEach(() => {
    useExamStore.getState().resetExam();
  });

  it('starts exam session and sets questions, count, and timer', () => {
    useExamStore.getState().startExam(dummyQuestions, 600, 2);
    const state = useExamStore.getState();

    expect(state.isStarted).toBe(true);
    expect(state.isSubmitted).toBe(false);
    expect(state.questions).toHaveLength(2);
    expect(state.timeLeft).toBe(600);
    expect(state.answers).toEqual({});
  });

  it('records answers and toggles flagged state without losing prior choices', () => {
    useExamStore.getState().startExam(dummyQuestions, 600, 2);
    useExamStore.getState().setAnswer(0, 'A');
    useExamStore.getState().setAnswer(1, 'B');
    useExamStore.getState().toggleFlag(0);

    const state = useExamStore.getState();
    expect(state.answers[0]).toBe('A');
    expect(state.answers[1]).toBe('B');
    expect(state.flagged[0]).toBe(true);
  });

  it('decrements time accurately and auto-submits when time reaches 0', () => {
    useExamStore.getState().startExam(dummyQuestions, 2, 2);
    useExamStore.getState().setAnswer(0, 'A');
    
    useExamStore.getState().decrementTime();
    expect(useExamStore.getState().timeLeft).toBe(1);

    useExamStore.getState().decrementTime();
    const finalState = useExamStore.getState();
    expect(finalState.timeLeft).toBe(0);
    expect(finalState.isSubmitted).toBe(true);
    expect(finalState.scoreResult).not.toBeNull();
  });

  it('calculates honest Part 5 score with scope disclaimer upon submission', () => {
    useExamStore.getState().startExam(dummyQuestions, 600, 2);
    useExamStore.getState().setAnswer(0, 'A'); // Correct (1/2 = 50%)
    useExamStore.getState().setAnswer(1, 'B'); // Wrong

    useExamStore.getState().submitExam();
    const state = useExamStore.getState();

    expect(state.isSubmitted).toBe(true);
    expect(state.scoreResult?.correctCount).toBe(1);
    expect(state.scoreResult?.totalQuestions).toBe(2);
    expect(state.scoreResult?.accuracyPercentage).toBe(50);
    expect(state.scoreResult?.disclaimer).toContain('Part 5');
  });
});
