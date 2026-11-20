// Core TypeScript schemas for EngMaster

export type QuestionCategory = 
  | 'word-form' 
  | 'collocation' 
  | 'tense' 
  | 'preposition' 
  | 'conjunction'
  | 'toeic-part5';

export type ClueGroup = 
  | 'with' 
  | 'for' 
  | 'to' 
  | 'in' 
  | 'on' 
  | 'between-and' 
  | 'either-or' 
  | 'neither-nor' 
  | 'not-only-but-also'
  | 'since-for' 
  | 'suffix-noun' 
  | 'suffix-adj' 
  | 'suffix-adv';

export interface Option {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuestionExplanation {
  translation: string;
  keySignal: string;
  whyCorrect: string;
  whyIncorrect: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
    [key: string]: string | undefined;
  };
  fastTip: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  clueGroup?: ClueGroup;
  clueWord?: string;
  sentence: string; // "All employees must comply _____ company policies."
  options: Option[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  cluePosition?: [number, number]; // [startIndex, endIndex] in sentence
  explanation: QuestionExplanation;
}

// Flashcard & SRS types
export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface Flashcard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'idiom' | 'collocation';
  definitionVi: string;
  definitionEn: string;
  exampleSentence: string;
  exampleTranslation: string;
  collocationTip?: string;
  boxLevel: number; // 1 to 5
  nextReviewDate: string; // ISO date string
  lastReviewedDate?: string;
}

// Dictation types
export interface DictationItem {
  id: string;
  audioText: string;
  audioUrl?: string; // fallback to SpeechSynthesis
  translation: string;
  hints: string[];
}

export interface DictationResult {
  accuracyPercentage: number;
  isExactMatch: boolean;
  userTokens: { text: string; status: 'correct' | 'incorrect' | 'missing' }[];
  correctWordCount: number;
  totalWordCount: number;
}

// Exam simulator types
export interface ExamAnswerRecord {
  questionId: string;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  isFlagged: boolean;
  timeSpentSeconds: number;
}

export interface ExamSession {
  examId: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, ExamAnswerRecord>;
  score?: {
    listeningScore: number;
    readingScore: number;
    totalScore: number;
    correctCount: number;
    incorrectCount: number;
    unansweredCount: number;
  };
}

// User Settings
export interface UserSettings {
  geminiApiKey: string;
  soundEnabled: boolean;
  autoSpeak: boolean;
  theme: 'light' | 'dark' | 'system';
}
