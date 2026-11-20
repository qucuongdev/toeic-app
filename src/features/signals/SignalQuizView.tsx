import React, { useState, useEffect, useCallback } from 'react';
import { Question, ClueGroup } from '@/types';
import { ExplanationCard } from '@/components/common/ExplanationCard';
import { getCollocationClueTips } from '@/services/collocationEngine';
import { 
  createQuizSession, 
  evaluateQuizSession, 
  QuizSessionResult 
} from '@/services/questionPoolService';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  RotateCcw, 
  BookMarked,
  Zap,
  CheckCircle2,
  XCircle,
  Eye,
  Flame,
  Hash,
  Trophy,
  Award,
  Sparkles
} from 'lucide-react';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useStreakStore } from '@/stores/useStreakStore';

interface SignalQuizViewProps {
  onSaveMistake?: (q: Question) => void;
}

const QUICK_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

export const SignalQuizView: React.FC<SignalQuizViewProps> = ({ onSaveMistake }) => {
  const { soundEnabled } = useSettingsStore();
  const persistentAnsweredCount = useHistoryStore(s => s.answeredIds.length);
  const clearGlobalHistory = useHistoryStore(s => s.clearHistory);

  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('10');
  const [historyAnsweredIds, setHistoryAnsweredIds] = useState<string[]>([]);

  // Session State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showClueHighlight, setShowClueHighlight] = useState<boolean>(true);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [sessionResult, setSessionResult] = useState<QuizSessionResult | null>(null);

  // Helper to start fresh session
  const startNewSession = useCallback((group: string, count: number, exclude: string[] = []) => {
    let cat: 'collocation' | 'word-form' | 'all-signals' = 'all-signals';
    if (group === 'with' || group === 'for' || group === 'to' || group.includes('-and') || group.includes('-or')) {
      cat = 'collocation';
    } else if (group.startsWith('suffix-') || group.startsWith('find-')) {
      cat = 'word-form';
    }

    const session = createQuizSession({
      category: cat,
      targetTense: group,
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

  useEffect(() => {
    startNewSession(selectedGroup, questionCount, historyAnsweredIds);
  }, [selectedGroup, questionCount, startNewSession]);

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

    // Track answered ID
    setHistoryAnsweredIds(prev => Array.from(new Set([...prev, currentQ.id])));

    const isCorrect = key === currentQ.correctAnswer;
    if (isCorrect) {
      setStreak(st => {
        const next = st + 1;
        if (next % 3 === 0 && soundEnabled) {
          confetti({ particleCount: 50, spread: 55, origin: { y: 0.6 } });
        }
        return next;
      });
    } else {
      setStreak(0);
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
      // Evaluate session
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
    setStreak(0);
  };

  const handleStartFreshRound = () => {
    startNewSession(selectedGroup, questionCount, historyAnsweredIds);
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

  // Keyboard shortcut listener: A/B/C/D to choose, Space/Enter to next
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

  // Render sentence with neon clue highlight
  const renderSentenceWithClue = () => {
    if (!currentQ) return null;
    if (!currentQ.clueWord || !showClueHighlight) {
      return <span>{currentQ.sentence}</span>;
    }

    const regex = new RegExp(`(${currentQ.clueWord}|_____|between|either|neither)`, 'gi');
    const parts = currentQ.sentence.split(regex);

    return parts.map((part, idx) => {
      if (part.toLowerCase() === currentQ.clueWord?.toLowerCase()) {
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

  const cheatTips = getCollocationClueTips(selectedGroup as ClueGroup);

  return (
    <div className="mx-auto max-w-4xl py-6 px-4">
      {/* Top Banner & Mode */}
      <div className="mb-6 rounded-3xl border border-indigo-200/30 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Zap className="h-4 w-4 text-amber-300" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">ETS Part 5 Fast-Hack</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">Phản Xạ Dấu Hiệu & Collocations</h2>
            <p className="mt-1 text-sm text-indigo-100/80">
              Chinh phục câu hỏi 5 giây qua giới từ, liên từ song hành và nhận diện từ loại chuẩn xác
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="flex items-center gap-1.5 rounded-2xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition shadow-sm"
            >
              <BookMarked className="h-4 w-4 text-amber-300" />
              <span>{showCheatSheet ? 'Đóng bí kíp' : 'Bí kíp 5 giây'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cheat Sheet Drawer */}
      {showCheatSheet && cheatTips.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/40 p-5 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3 border-b border-amber-200/60 dark:border-amber-800/40 pb-2">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
              <span>⚡ Bí kíp phản xạ siêu tốc cho nhóm "{selectedGroup}":</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {cheatTips.map((tip, idx) => (
              <div key={idx} className="rounded-xl bg-white/80 dark:bg-slate-900/80 p-2.5 border border-amber-100 dark:border-amber-900/40 shadow-xs">
                <div className="font-bold text-indigo-900 dark:text-indigo-300">{tip.phrase}</div>
                <div className="text-slate-600 dark:text-slate-300 mt-0.5">{tip.meaning}</div>
                <div className="text-[11px] text-amber-800 dark:text-amber-300 italic mt-1 font-mono">Ví dụ: {tip.example}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Config Bar */}
      <div className="mb-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Tất cả dấu hiệu' },
              { id: 'with', label: 'Đi với "with"' },
              { id: 'for', label: 'Đi với "for"' },
              { id: 'to', label: 'Đi với "to"' },
              { id: 'between-and', label: 'Between ... and' },
              { id: 'either-or', label: 'Either ... or' },
              { id: 'suffix-able', label: 'Đuôi -able (Tính từ)' },
              { id: 'suffix-ly', label: 'Đuôi -ly (Trạng từ)' },
              { id: 'suffix-tion', label: 'Đuôi -tion (Danh từ)' },
              { id: 'find-verb', label: '🔍 Tìm ĐỘNG TỪ' },
              { id: 'find-noun', label: '🔍 Tìm DANH TỪ' },
              { id: 'find-adj', label: '🔍 Tìm TÍNH TỪ' },
              { id: 'find-adv', label: '🔍 Tìm TRẠNG TỪ' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setSelectedGroup(pill.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  selectedGroup === pill.id
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

        {/* Question Count Picker Bar */}
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

      {/* QUIZ IN PROGRESS OR SCORE EVALUATION */}
      {!isSessionFinished ? (
        /* Question Card */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          {/* Header Meta & Progress */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-indigo-600 text-white px-2.5 py-1 text-xs font-black shadow-xs">
                  Câu {currentIndex + 1} / {questions.length}
                </span>
                <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                  {currentQ?.clueGroup || 'HACK PART 5'}
                </span>
                {currentQ?.clueWord && (
                  <span className="rounded-lg bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 text-xs font-bold text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60">
                    Dấu hiệu: "{currentQ.clueWord}"
                  </span>
                )}
                {streak > 1 && (
                  <span className="flex items-center gap-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Flame className="h-3.5 w-3.5 text-amber-500" />
                    <span>Streak {streak}</span>
                  </span>
                )}
              </div>

              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Tiến độ: {Math.round(((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100)}%
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Sentence / Question */}
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

          {/* Keyboard Shortcut Hint */}
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
        /* SCORE EVALUATION & SUMMARY SCREEN */
        sessionResult && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8 animate-in fade-in duration-300">
            {/* Header Hero */}
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

            {/* Question Breakdown */}
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
  );
};
