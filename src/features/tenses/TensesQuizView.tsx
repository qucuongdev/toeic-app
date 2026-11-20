import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types';
import { 
  getAll12TensesCheatSheet, 
  ALL_12_TENSES_METADATA,
  TenseMetadata 
} from '@/services/tensesEngine';
import { 
  createQuizSession, 
  evaluateQuizSession, 
  QuizSessionResult 
} from '@/services/questionPoolService';
import { ExplanationCard } from '@/components/common/ExplanationCard';
import { 
  Clock, 
  BookMarked, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Zap, 
  Eye, 
  Layers,
  Trophy,
  Award,
  Sparkles,
  Hash,
  ListFilter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useStreakStore } from '@/stores/useStreakStore';

interface TensesQuizViewProps {
  onSaveMistake?: (q: Question) => void;
}

const QUICK_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

export const TensesQuizView: React.FC<TensesQuizViewProps> = ({ onSaveMistake }) => {
  const { soundEnabled } = useSettingsStore();
  const persistentAnsweredCount = useHistoryStore(s => s.answeredIds.length);
  const clearGlobalHistory = useHistoryStore(s => s.clearHistory);

  const [activeMode, setActiveMode] = useState<'quiz' | 'matrix'>('quiz');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('10');
  
  // History of answered IDs in the current session/runtime to prevent repeats
  const [historyAnsweredIds, setHistoryAnsweredIds] = useState<string[]>([]);
  
  // Active Quiz State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showClueHighlight, setShowClueHighlight] = useState<boolean>(true);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [sessionResult, setSessionResult] = useState<QuizSessionResult | null>(null);

  const cheatSheet: TenseMetadata[] = getAll12TensesCheatSheet();

  // Helper to start a fresh non-repeating quiz session
  const startNewSession = useCallback((filter: string, count: number, exclude: string[] = []) => {
    const session = createQuizSession({
      category: 'tense',
      targetTense: filter,
      count,
      excludeIds: exclude
    });

    setQuestions(session.questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setSessionAnswers({});
    setIsSessionFinished(false);
    setSessionResult(null);
  }, []);

  // Initialize or re-create session when filter or target count changes
  useEffect(() => {
    startNewSession(selectedFilter, questionCount, historyAnsweredIds);
  }, [selectedFilter, questionCount, startNewSession]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = useCallback((key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(key);
    setIsAnswered(true);

    const updatedAnswers = {
      ...sessionAnswers,
      [currentQ.id]: key
    };
    setSessionAnswers(updatedAnswers);

    // Track answered ID to avoid repeats in future rounds
    setHistoryAnsweredIds(prev => Array.from(new Set([...prev, currentQ.id])));

    const isCorrect = key === currentQ.correctAnswer;
    if (isCorrect) {
      if (soundEnabled) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      }
    } else {
      if (onSaveMistake) {
        onSaveMistake(currentQ);
      }
    }
  }, [isAnswered, currentQ, sessionAnswers, soundEnabled, onSaveMistake]);

  const handleNext = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed the whole session -> Evaluate results
      const result = evaluateQuizSession(questions, sessionAnswers);
      setSessionResult(result);
      setIsSessionFinished(true);

      // Record to persistent store so these questions are never repeated across days/weeks
      const finishedIds = questions.map(q => q.id);
      useHistoryStore.getState().addAnsweredIds(finishedIds);
      useStreakStore.getState().recordActivity();
      setHistoryAnsweredIds(prev => Array.from(new Set([...prev, ...finishedIds])));

      if (soundEnabled && result.accuracyPercentage >= 70) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      }
    }
  }, [currentIndex, questions, sessionAnswers, soundEnabled]);

  const handleRestartCurrentSession = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setSessionAnswers({});
    setIsSessionFinished(false);
    setSessionResult(null);
  };

  const handleStartFreshRound = () => {
    startNewSession(selectedFilter, questionCount, historyAnsweredIds);
  };

  const handleApplyCustomCount = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customCountInput, 10);
    if (isNaN(val) || val <= 0) {
      setQuestionCount(5);
      setCustomCountInput('5');
    } else {
      const clamped = Math.min(100, Math.max(1, val));
      setQuestionCount(clamped);
      setCustomCountInput(clamped.toString());
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (!isSessionFinished) {
        if (!isAnswered && (key === 'A' || key === 'B' || key === 'C' || key === 'D')) {
          handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
        } else if (isAnswered && (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight')) {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, isSessionFinished, handleSelectOption, handleNext]);

  // Render sentence with neon highlight for signal words
  const renderSentenceWithClue = () => {
    if (!currentQ) return null;
    if (!currentQ.clueWord || !showClueHighlight) {
      return <span>{currentQ.sentence}</span>;
    }

    const regex = new RegExp(`(${currentQ.clueWord}|_____|since|yesterday|currently|every|all morning|by the time|at this time|by the end|by next month|already|rarely)`, 'gi');
    const parts = currentQ.sentence.split(regex);

    return parts.map((part, idx) => {
      if (part.toLowerCase() === currentQ.clueWord?.toLowerCase() || 
          ['since', 'yesterday', 'currently', 'every', 'all morning', 'by the time', 'at this time', 'by the end', 'by next month', 'already', 'rarely'].includes(part.toLowerCase())) {
        return (
          <span
            key={idx}
            className="rounded-lg bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 font-bold text-amber-950 dark:text-amber-200 ring-1 ring-amber-300 dark:ring-amber-700/60 shadow-xs inline-block"
          >
            {part}
          </span>
        );
      }
      if (part === '_____') {
        return (
          <span
            key={idx}
            className="inline-block min-w-[70px] border-b-2 border-dashed border-indigo-500 text-center font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/50 px-2 py-0.5 rounded"
          >
            {isAnswered && selectedOption ? (
              <span className={selectedOption === currentQ.correctAnswer ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                {currentQ.options.find(o => o.key === selectedOption)?.text}
              </span>
            ) : (
              '_____'
            )}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const groupPills = [
    { id: 'all', label: 'Tất cả 12 Thì' },
    { id: 'group-present', label: '🌱 Nhóm Hiện Tại (4 thì)' },
    { id: 'group-past', label: '⏳ Nhóm Quá Khứ (4 thì)' },
    { id: 'group-future', label: '🚀 Nhóm Tương Lai (4 thì)' },
  ];

  const currentTenseNameVi = ALL_12_TENSES_METADATA.find(t => t.id === selectedFilter)?.nameVi || 
    (selectedFilter === 'all' ? 'Tất cả' : selectedFilter.replace('group-', 'Nhóm '));

  return (
    <div className="mx-auto max-w-4xl py-6 px-4">
      {/* Top Banner */}
      <div className="mb-6 rounded-3xl border border-indigo-200/30 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Clock className="h-4 w-4 text-amber-300" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Mastery 12 Tenses</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">12 Thì Tiếng Anh & Dấu Hiệu Nhận Biết</h2>
            <p className="mt-1 text-sm text-indigo-100/80">
              Chuyên sâu 12 loại thì với công thức chuẩn, ngân hàng đề phong phú, chống lặp câu và chấm điểm tự động
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100 border border-white/15">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Đã luyện bền vững: <strong className="text-white">{persistentAnsweredCount}</strong> câu không trùng</span>
              {persistentAnsweredCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Bạn có muốn đặt lại lịch sử để luyện tập lại các câu hỏi từ đầu không?')) {
                      clearGlobalHistory();
                      setHistoryAnsweredIds([]);
                    }
                  }}
                  className="ml-1 text-[11px] text-amber-300 underline hover:text-white cursor-pointer"
                  title="Đặt lại lịch sử câu đã làm"
                >
                  Đặt lại
                </button>
              )}
            </div>
          </div>

          {/* Switch Mode: Quiz vs Matrix */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-white/10 dark:bg-slate-900/40 p-1.5 border border-white/20 backdrop-blur-md">
            <button
              onClick={() => setActiveMode('quiz')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeMode === 'quiz' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Luyện Trắc Nghiệm</span>
            </button>
            <button
              onClick={() => setActiveMode('matrix')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeMode === 'matrix' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-indigo-200 hover:text-white'
              }`}
            >
              <BookMarked className="h-3.5 w-3.5" />
              <span>Bí Kíp 12 Thì</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: MATRIX / CHEAT SHEET */}
      {activeMode === 'matrix' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>Bảng Tổng Hợp Công Thức & Dấu Hiệu Nhận Biết 12 Thì Chuẩn ETS</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">12/12 thì hoàn chỉnh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cheatSheet.map((tense) => (
              <div 
                key={tense.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      {tense.nameEn}
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">{tense.nameVi}</h4>
                  </div>
                  <span className={`rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                    tense.group === 'present' 
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' 
                      : tense.group === 'past' 
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200' 
                      : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200'
                  }`}>
                    {tense.group}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-indigo-700 dark:text-indigo-400">Công thức: </span>
                    {tense.formula}
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Dấu hiệu nhận biết:</span>
                    <div className="flex flex-wrap gap-1">
                      {tense.signalWords.map((sig, sIdx) => (
                        <span key={sIdx} className="rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/60 px-2 py-0.5 font-semibold">
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-slate-600 dark:text-slate-300 italic">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 not-italic">Ví dụ: </span>
                    "{tense.example}"
                  </div>

                  <div className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 p-2 text-indigo-900 dark:text-indigo-300 font-medium border border-indigo-100/60 dark:border-indigo-900/40">
                    ⚡ {tense.fastTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: INTERACTIVE QUIZ */}
      {activeMode === 'quiz' && (
        <div className="space-y-6">
          {/* Controls Bar: Group Switcher & Question Count Picker */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            {/* Top row: Filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {groupPills.map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setSelectedFilter(pill.id)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                      selectedFilter === pill.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowClueHighlight(!showClueHighlight)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  showClueHighlight
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800/60'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showClueHighlight ? 'Đang soi dấu hiệu' : 'Ẩn dấu hiệu'}</span>
              </button>
            </div>

            {/* Individual 12 Tenses Selector Bar */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <ListFilter className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Chọn chính xác 1 trong 12 thì để luyện riêng:</span>
                </span>
                <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/60">
                  Đang lọc: {currentTenseNameVi}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                {ALL_12_TENSES_METADATA.map((tense) => {
                  const isSelected = selectedFilter === tense.id;
                  return (
                    <button
                      key={tense.id}
                      onClick={() => setSelectedFilter(tense.id)}
                      className={`flex flex-col items-start rounded-xl p-2.5 text-left text-xs transition border cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/80 text-indigo-950 dark:text-indigo-200 font-bold shadow-xs ring-1 ring-indigo-500/30'
                          : 'border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/70 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase">
                        {tense.nameEn}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {tense.nameVi}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count Picker (5, 10, 15, 20, 25, 30... + Custom) */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Hash className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Số câu hỏi:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {QUICK_COUNT_OPTIONS.map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setQuestionCount(count);
                        setCustomCountInput(count.toString());
                      }}
                      className={`h-7 px-2.5 rounded-lg text-xs font-bold transition ${
                        questionCount === count
                          ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {count} câu
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom count input form */}
              <form onSubmit={handleApplyCustomCount} className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tùy chỉnh:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customCountInput}
                  onChange={(e) => setCustomCountInput(e.target.value)}
                  className="w-16 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 text-xs font-bold text-slate-900 dark:text-slate-100 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="h-7 px-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-bold transition border border-indigo-200 dark:border-indigo-800/60"
                >
                  Áp dụng
                </button>
              </form>
            </div>
          </div>

          {/* ACTIVE QUIZ OR FINISHED EVALUATION */}
          {!isSessionFinished ? (
            /* Question Card */
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
              {/* Meta bar & Progress */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-indigo-600 text-white px-2.5 py-1 text-xs font-black shadow-xs">
                      Câu {currentIndex + 1} / {questions.length}
                    </span>
                    <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                      {currentQ?.clueGroup || 'CHUYÊN ĐỀ 12 THÌ'}
                    </span>
                    {currentQ?.clueWord && (
                      <span className="rounded-lg bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 text-xs font-bold text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60">
                        Dấu hiệu: "{currentQ.clueWord}"
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Tiến độ: {Math.round(((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100)}%
                  </span>
                </div>

                {/* Progress track */}
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Sentence */}
              <div className="min-h-[70px] text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                {renderSentenceWithClue()}
              </div>

              {/* 4 Choices */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQ?.options.map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  const isCorrect = opt.key === currentQ.correctAnswer;

                  let style = 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-800 dark:text-slate-100 hover:shadow-xs';
                  if (isAnswered) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isCorrect) {
                      style = 'border-rose-500 bg-rose-50/90 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
                    } else {
                      style = 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`flex items-center justify-between rounded-2xl border p-4 text-left font-medium transition-all duration-150 shadow-xs active:scale-[0.99] ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-extrabold shadow-xs ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : isAnswered && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-base font-semibold">{opt.text}</span>
                      </div>

                      {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Shortcut hint */}
              {!isAnswered && (
                <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
                  💡 Mẹo: Bấm phím <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">A</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">B</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">C</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">D</kbd> để chọn nhanh!
                </p>
              )}

              {/* 100% EXPLANATIONS */}
              {isAnswered && selectedOption && (
                <ExplanationCard
                  explanation={currentQ.explanation}
                  userAnswer={selectedOption}
                  correctAnswer={currentQ.correctAnswer}
                />
              )}

              {/* Footer Controls */}
              {isAnswered && (
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-5">
                  <button
                    onClick={handleRestartCurrentSession}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Làm lại từ đầu</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-700 transition"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Câu kế tiếp' : 'Xem kết quả & Chấm điểm'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* EVALUATION & SCORE SUMMARY CARD */
            sessionResult && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8 animate-in fade-in duration-300">
                {/* Result Hero Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
                    {sessionResult.accuracyPercentage >= 75 ? (
                      <Trophy className="h-8 w-8 text-amber-500" />
                    ) : (
                      <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  
                  <div>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                      sessionResult.accuracyPercentage >= 90
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                        : sessionResult.accuracyPercentage >= 75
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200'
                        : sessionResult.accuracyPercentage >= 50
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200'
                    }`}>
                      Xếp loại: {sessionResult.badge}
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                      {sessionResult.correctCount} / {sessionResult.total} Câu Đúng
                    </h3>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      Độ chính xác: {sessionResult.accuracyPercentage}%
                    </p>
                  </div>

                  <p className="mx-auto max-w-md text-sm text-slate-600 dark:text-slate-300">
                    {sessionResult.feedback}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleStartFreshRound}
                    className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Luyện tiếp bộ câu mới (Không trùng)</span>
                  </button>

                  <button
                    onClick={handleRestartCurrentSession}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Làm lại bộ đề này</span>
                  </button>
                </div>

                {/* Per-Question Detailed Breakdown */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Chi tiết bài thi ({sessionResult.total} câu):</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      Đúng: <strong className="text-emerald-600 dark:text-emerald-400">{sessionResult.correctCount}</strong> | Sai: <strong className="text-rose-600 dark:text-rose-400">{sessionResult.incorrectCount}</strong>
                    </span>
                  </h4>

                  <div className="space-y-3">
                    {sessionResult.details.map((item, idx) => (
                      <div
                        key={item.question.id}
                        className={`rounded-2xl border p-4 transition ${
                          item.isCorrect
                            ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                            : 'border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                                item.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                              }`}>
                                {idx + 1}
                              </span>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                                {item.question.clueGroup}
                              </span>
                              {item.question.clueWord && (
                                <span className="rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 text-[10px] font-bold border border-amber-200 dark:border-amber-800/50">
                                  {item.question.clueWord}
                                </span>
                              )}
                            </div>

                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {item.question.sentence.replace('_____', `[ ${item.question.options.find(o => o.key === item.correctAnswer)?.text} ]`)}
                            </p>

                            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                              "{item.question.explanation.translation}"
                            </p>

                            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                              <span className={item.isCorrect ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-rose-700 dark:text-rose-400 font-bold'}>
                                Bạn chọn: ({item.userAnswer || 'Chưa chọn'}) {item.question.options.find(o => o.key === item.userAnswer)?.text || ''}
                              </span>
                              {!item.isCorrect && (
                                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                                  ➜ Đáp án đúng: ({item.correctAnswer}) {item.question.options.find(o => o.key === item.correctAnswer)?.text}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            {item.isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
