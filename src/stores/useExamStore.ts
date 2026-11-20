import { create } from 'zustand';
import { Question } from '@/types';
import { calculatePart5Score, Part5ScoreResult } from '@/services/toeicScorer';

interface ExamState {
  questions: Question[];
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  flagged: Record<number, boolean>;
  currentIndex: number;
  timeLeft: number;
  examCount: number;
  isStarted: boolean;
  isSubmitted: boolean;
  scoreResult: Part5ScoreResult | null;

  startExam: (questions: Question[], durationSeconds: number, examCount: number) => void;
  setAnswer: (index: number, answer: 'A' | 'B' | 'C' | 'D') => void;
  toggleFlag: (index: number) => void;
  setCurrentIndex: (index: number) => void;
  decrementTime: () => void;
  submitExam: () => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  questions: [],
  answers: {},
  flagged: {},
  currentIndex: 0,
  timeLeft: 0,
  examCount: 10,
  isStarted: false,
  isSubmitted: false,
  scoreResult: null,

  startExam: (questions, durationSeconds, examCount) => {
    set({
      questions,
      answers: {},
      flagged: {},
      currentIndex: 0,
      timeLeft: durationSeconds,
      examCount,
      isStarted: true,
      isSubmitted: false,
      scoreResult: null,
    });
  },

  setAnswer: (index, answer) => {
    const { isSubmitted } = get();
    if (isSubmitted) return;
    set((state) => ({
      answers: { ...state.answers, [index]: answer },
    }));
  },

  toggleFlag: (index) => {
    set((state) => ({
      flagged: { ...state.flagged, [index]: !state.flagged[index] },
    }));
  },

  setCurrentIndex: (index) => {
    set({ currentIndex: index });
  },

  decrementTime: () => {
    const { timeLeft, isSubmitted, isStarted } = get();
    if (!isStarted || isSubmitted) return;

    if (timeLeft <= 1) {
      set({ timeLeft: 0 });
      get().submitExam();
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  submitExam: () => {
    const { questions, answers, isSubmitted } = get();
    if (isSubmitted || questions.length === 0) return;

    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const scoreResult = calculatePart5Score(correct, questions.length);

    set({
      isSubmitted: true,
      scoreResult,
    });
  },

  resetExam: () => {
    set({
      questions: [],
      answers: {},
      flagged: {},
      currentIndex: 0,
      timeLeft: 0,
      isStarted: false,
      isSubmitted: false,
      scoreResult: null,
    });
  },
}));
