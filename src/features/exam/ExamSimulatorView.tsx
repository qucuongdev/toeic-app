import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types';
import { createQuizSession } from '@/services/questionPoolService';
import { ExplanationCard } from '@/components/common/ExplanationCard';
import { 
  GraduationCap, 
  Timer, 
  Flag, 
  RotateCcw, 
  Hash,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useStreakStore } from '@/stores/useStreakStore';
import { useExamStore } from '@/stores/useExamStore';

const EXAM_PRESET_COUNTS = [10, 20, 30, 50];

interface ExamSimulatorViewProps {
  onSaveMistake?: (q: Question) => void;
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({ onSaveMistake }) => {
  const { soundEnabled } = useSettingsStore();
  const persistentAnsweredCount = useHistoryStore(s => s.answeredIds.length);
  const clearGlobalHistory = useHistoryStore(s => s.clearHistory);

  // Persistent store state (preserves session across tab switching)
  const {
    questions,
    answers,
    flagged,
    currentIndex,
    timeLeft,
    examCount,
    isStarted,
    isSubmitted,
    scoreResult,
    startExam,
    setAnswer,
    toggleFlag,
    setCurrentIndex,
    decrementTime,
    submitExam,
  } = useExamStore();

  const [customCountInput, setCustomCountInput] = useState<string>(examCount.toString());
  const [historyAnsweredIds, setHistoryAnsweredIds] = useState<string[]>([]);

  const startNewExam = useCallback((count: number, exclude: string[] = []) => {
    const session = createQuizSession({
      category: 'exam',
      count,
      excludeIds: exclude
    });
    startExam(session.questions, count * 60, count);
  }, [startExam]);

  useEffect(() => {
    if (!isStarted || questions.length === 0) {
      startNewExam(examCount, historyAnsweredIds);
    }
  }, [isStarted, questions.length, examCount, historyAnsweredIds, startNewExam]);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;
    submitExam();

    const state = useExamStore.getState();
    const incorrectList: Question[] = [];

    state.questions.forEach((q, idx) => {
      if (state.answers[idx] !== q.correctAnswer) {
        incorrectList.push(q);
      }
    });

    // Auto save incorrect questions to Mistake Notebook
    if (onSaveMistake && incorrectList.length > 0) {
      incorrectList.forEach(q => onSaveMistake(q));
    }

    // Track answered IDs to persistent store
    const finishedIds = state.questions.map(q => q.id);
    useHistoryStore.getState().addAnsweredIds(finishedIds);
    useStreakStore.getState().recordActivity();
    setHistoryAnsweredIds(prev => Array.from(new Set([...prev, ...finishedIds])));

    if (soundEnabled && (state.scoreResult?.part5ScaledScore || 0) >= 350) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    }
  }, [isSubmitted, submitExam, onSaveMistake, soundEnabled]);

  // Countdown timer (preserves remaining time across tab navigation)
  useEffect(() => {
    if (!isStarted || isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      decrementTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [isStarted, isSubmitted, timeLeft, decrementTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setAnswer(currentIndex, key);
  };

  const handleApplyCustomCount = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customCountInput, 10);
    const count = isNaN(val) || val < 5 ? 5 : Math.min(100, Math.max(5, val));
    setCustomCountInput(count.toString());
    startNewExam(count, historyAnsweredIds);
  };

  // Keyboard shortcut listener for Exam Simulator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (!isSubmitted) {
        if (key === 'A' || key === 'B' || key === 'C' || key === 'D') {
          handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
        } else if (key === 'F') {
          toggleFlag(currentIndex);
        } else if (e.key === 'ArrowLeft') {
          setCurrentIndex(Math.max(0, currentIndex - 1));
        } else if (e.key === 'ArrowRight') {
          setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitted, currentIndex, questions.length, toggleFlag, setCurrentIndex]);

  const currentQ = questions[currentIndex] || questions[0];

  return (
    <div className="mx-auto max-w-5xl py-6 px-4">
      {/* Top Meta & Timer Bar */}
      <div className="mb-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Phòng Thi Thử TOEIC Part 5</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {questions.length} câu hỏi trộn chuẩn ETS • Thang điểm chuẩn 10 - 990 ETS • {Math.round(timeLeft / 60)} phút làm bài
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/60">
                <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>Đã luyện bền vững: <strong>{persistentAnsweredCount}</strong> câu không trùng</span>
                {persistentAnsweredCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Bạn có muốn đặt lại lịch sử câu đã luyện để làm lại từ đầu không?')) {
                        clearGlobalHistory();
                        setHistoryAnsweredIds([]);
                      }
                    }}
                    className="ml-1 text-[11px] text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-900 dark:hover:text-emerald-200 cursor-pointer"
                    title="Đặt lại lịch sử"
                  >
                    Đặt lại
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-sm font-bold shadow-xs ${
                timeLeft < 120 
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 animate-pulse' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}>
                <Timer className="h-4 w-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                Nộp bài thi
              </button>
            ) : (
              <button
                onClick={() => startNewExam(examCount, historyAnsweredIds)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Đề thi mới (Không trùng)</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Count Config (only visible before submission) */}
        {!isSubmitted && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Hash className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Chọn số câu thi:</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {EXAM_PRESET_COUNTS.map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setCustomCountInput(count.toString());
                      startNewExam(count, historyAnsweredIds);
                    }}
                    className={`h-7 px-2.5 rounded-lg text-xs font-bold transition ${
                      examCount === count
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
                min="5"
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
        )}
      </div>

      {/* Score Modal Banner if submitted */}
      {isSubmitted && scoreResult && (
        <div className="mb-8 rounded-3xl border border-emerald-200 dark:border-emerald-850/60 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-blue-950/30 p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <Trophy className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Điểm Kỹ Năng Đọc Part 5 (Incomplete Sentences)
                </span>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                    {scoreResult.part5ScaledScore}
                  </h3>
                  <span className="text-base font-bold text-slate-500 dark:text-slate-400">/ 495 Điểm</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    (Ước lượng toàn bài: ~{scoreResult.estimatedFullToeic}/990)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span>Đúng: <strong>{scoreResult.correctCount} / {scoreResult.totalQuestions}</strong> ({scoreResult.accuracyPercentage}%)</span>
                  <span>•</span>
                  <span>Trình độ ước tính: <strong className="text-indigo-700 dark:text-indigo-400 font-bold">{scoreResult.cefrLevel}</strong></span>
                  {scoreResult.totalQuestions - scoreResult.correctCount > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1">
                        <BookmarkCheck className="h-3.5 w-3.5" />
                        Đã lưu {scoreResult.totalQuestions - scoreResult.correctCount} câu sai vào Sổ tay
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => startNewExam(examCount, historyAnsweredIds)}
                className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-700 transition"
              >
                <Sparkles className="h-4 w-4" />
                <span>Thi đề mới</span>
              </button>
              <button
                onClick={() => {
                  startExam(questions, examCount * 60, examCount);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Thi lại đề này</span>
              </button>
            </div>
          </div>

          {/* Honest Scope & ETS Disclaimer Box */}
          <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 text-xs text-amber-900 dark:text-amber-200">
            <strong>⚠️ Lưu ý về phạm vi đánh giá:</strong> {scoreResult.disclaimer}
          </div>
        </div>
      )}

      {/* Main Layout: Question + Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Question area */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Câu {currentIndex + 1} / {questions.length}
            </span>

            <button
              onClick={() => toggleFlag(currentIndex)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                flagged[currentIndex]
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Flag className="h-3.5 w-3.5" />
              <span>{flagged[currentIndex] ? 'Đã cắm cờ (Phím F)' : 'Cắm cờ xem lại (F)'}</span>
            </button>
          </div>

          <div className="text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed min-h-[60px]">
            {currentQ?.sentence}
          </div>

          {/* 4 Choices */}
          <div className="mt-8 space-y-3">
            {currentQ?.options.map((opt) => {
              const isSelected = answers[currentIndex] === opt.key;
              const isCorrect = opt.key === currentQ.correctAnswer;

              let style = 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-800 dark:text-slate-100 hover:shadow-xs active:scale-[0.99]';
              let badgeStyle = isSelected
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300';

              if (isSubmitted) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
                  badgeStyle = 'bg-rose-600 text-white';
                } else {
                  style = 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400';
                  badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-800';
                }
              } else if (isSelected) {
                style = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-950 dark:text-indigo-200 font-semibold ring-2 ring-indigo-500/20 shadow-xs';
                badgeStyle = 'bg-indigo-600 text-white shadow-xs';
              }

              return (
                <button
                  key={opt.key}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-150 ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold transition-colors ${badgeStyle}`}>
                      {opt.key}
                    </span>
                    <span className="text-sm font-semibold">{opt.text}</span>
                  </div>

                  {isSubmitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Shortcut guide */}
          {!isSubmitted && (
            <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
              💡 Phím tắt: <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">A</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">B</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">C</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">D</kbd> để chọn • <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">F</kbd> để cắm cờ • <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">←</kbd> <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">→</kbd> để chuyển câu
            </p>
          )}

          {/* Explanation if submitted */}
          {isSubmitted && currentQ && (
            <div className="mt-8">
              <ExplanationCard
                explanation={currentQ.explanation}
                userAnswer={answers[currentIndex]}
                correctAnswer={currentQ.correctAnswer}
              />
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-5">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex(Math.max(0, currentIndex - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 active:scale-95 transition"
            >
              ← Câu trước
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => {
                setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-xl bg-slate-900 dark:bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:hover:bg-indigo-700 disabled:opacity-40 active:scale-95 transition shadow-xs"
            >
              Câu kế tiếp →
            </button>
          </div>
        </div>

        {/* Right: Question Palette */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Bảng Câu Hỏi (Question Palette)</h4>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Đã làm: {Object.keys(answers).length} / {questions.length}
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-[420px] overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const isAns = answers[idx] !== undefined;
              const isCur = currentIndex === idx;
              const isFlg = flagged[idx];
              const isCor = answers[idx] === q.correctAnswer;

              let btnStyle = 'bg-slate-50 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-indigo-50/80 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-slate-600';
              if (isSubmitted) {
                btnStyle = isCor ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs' : 'bg-rose-500 text-white font-bold border-rose-500 shadow-xs';
              } else if (isAns) {
                btnStyle = 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-xs';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative flex h-10 items-center justify-center rounded-xl text-xs font-bold border transition-all active:scale-95 ${btnStyle} ${
                    isCur ? 'ring-2 ring-indigo-600 dark:ring-indigo-400 ring-offset-2 dark:ring-offset-slate-900 scale-105 z-10 shadow-xs' : ''
                  }`}
                >
                  {idx + 1}
                  {isFlg && (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-indigo-600" />
              <span>Đã chọn đáp án</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
              <span>Chưa làm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>Được đánh dấu xem lại (Cắm cờ)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
