import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types';
import { ExplanationCard } from '@/components/common/ExplanationCard';
import { 
  BookmarkCheck, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Play, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSettingsStore } from '@/stores/useSettingsStore';

interface MistakeNotebookViewProps {
  mistakes: Question[];
  onRemoveMistake: (id: string) => void;
  onClearAll: () => void;
}

export const MistakeNotebookView: React.FC<MistakeNotebookViewProps> = ({
  mistakes,
  onRemoveMistake,
  onClearAll,
}) => {
  const { soundEnabled } = useSettingsStore();

  const [mode, setMode] = useState<'review' | 'quiz'>('review');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    mistakes.length > 0 ? mistakes[0] : null
  );

  // Quiz Mode State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [masteredCount, setMasteredCount] = useState<number>(0);

  // Sync selected question when mistakes list changes
  useEffect(() => {
    if (mistakes.length > 0) {
      if (!selectedQuestion || !mistakes.some(m => m.id === selectedQuestion.id)) {
        setSelectedQuestion(mistakes[0]);
      }
    } else {
      setSelectedQuestion(null);
    }
  }, [mistakes, selectedQuestion]);

  const currentQuizQ = mistakes[quizIndex] || mistakes[0];

  const handleSelectQuizOption = useCallback((key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !currentQuizQ) return;
    setSelectedOption(key);
    setIsAnswered(true);

    const isCorrect = key === currentQuizQ.correctAnswer;
    if (isCorrect) {
      setMasteredCount(c => c + 1);
      if (soundEnabled) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }
  }, [isAnswered, currentQuizQ, soundEnabled]);

  const handleNextQuizQuestion = () => {
    // If answered correctly, optionally remove from mistakes
    if (selectedOption === currentQuizQ.correctAnswer) {
      onRemoveMistake(currentQuizQ.id);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (quizIndex < mistakes.length - 1) {
      setQuizIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed re-quiz session
      setQuizIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setMode('review');
    }
  };

  // Keyboard shortcut listener for Quiz mode
  useEffect(() => {
    if (mode !== 'quiz' || mistakes.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (!isAnswered && (key === 'A' || key === 'B' || key === 'C' || key === 'D')) {
        handleSelectQuizOption(key as 'A' | 'B' | 'C' | 'D');
      } else if (isAnswered && (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight')) {
        e.preventDefault();
        handleNextQuizQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isAnswered, mistakes.length, handleSelectQuizOption]);

  return (
    <div className="mx-auto max-w-4xl py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <BookmarkCheck className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Sổ Tay Câu Sai (Mistake Notebook)</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Lưu vết tự động các câu làm sai từ tất cả các bài tập & phòng thi để rèn luyện lại
          </p>
        </div>

        {mistakes.length > 0 && (
          <div className="flex items-center gap-2">
            {/* Toggle Mode: Review vs Re-Quiz */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setMode('review')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  mode === 'review'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Xem lại</span>
              </button>
              <button
                onClick={() => {
                  setMode('quiz');
                  setQuizIndex(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  mode === 'quiz'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Luyện giải lại ({mistakes.length})</span>
              </button>
            </div>

            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition shadow-xs"
              title="Xóa toàn bộ câu sai"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Xóa sổ tay</span>
            </button>
          </div>
        )}
      </div>

      {mistakes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">Sổ tay câu sai đang trống!</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Tuyệt vời! Bất kỳ câu hỏi nào bạn làm sai trong phần "Dấu hiệu nhận biết", "12 Thì", hay "Phòng thi thử" sẽ được gom về đây để bạn ôn luyện lại.
          </p>
        </div>
      ) : mode === 'quiz' ? (
        /* QUIZ RE-TEST MODE */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          {/* Header Meta & Progress */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-rose-600 text-white px-2.5 py-1 text-xs font-black shadow-xs">
                Câu {quizIndex + 1} / {mistakes.length}
              </span>
              <span className="rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900/60 px-2.5 py-1 text-xs font-bold uppercase">
                {currentQuizQ?.clueGroup || 'CÂU SAI CẦN PHẢN XẠ'}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Đã làm đúng: <strong className="text-emerald-600 dark:text-emerald-400">{masteredCount}</strong> câu
            </span>
          </div>

          {/* Sentence */}
          <div className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed min-h-[60px]">
            {currentQuizQ?.sentence}
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQuizQ?.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isCorrect = opt.key === currentQuizQ.correctAnswer;

              let style = 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-800 dark:text-slate-100 hover:shadow-xs active:scale-[0.99]';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
                } else {
                  style = 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400';
                }
              }

              return (
                <button
                  key={opt.key}
                  disabled={isAnswered}
                  onClick={() => handleSelectQuizOption(opt.key)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left font-medium transition-all shadow-xs ${style}`}
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

                  {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* 100% Full Explanation Card */}
          {isAnswered && selectedOption && (
            <ExplanationCard
              explanation={currentQuizQ.explanation}
              userAnswer={selectedOption}
              correctAnswer={currentQuizQ.correctAnswer}
            />
          )}

          {/* Controls */}
          {isAnswered && (
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-5">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {selectedOption === currentQuizQ.correctAnswer 
                  ? '✨ Làm đúng! Câu này sẽ tự động xóa khỏi sổ tay khi bấm kế tiếp.'
                  : '⚠️ Vẫn làm sai, câu này sẽ được giữ lại trong sổ tay để tiếp tục rèn luyện.'}
              </span>

              <button
                onClick={handleNextQuizQuestion}
                className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-700 transition"
              >
                <span>{quizIndex < mistakes.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành lượt luyện'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* STATIC REVIEW MODE */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* List of mistakes */}
          <div className="md:col-span-1 space-y-2">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Danh sách ({mistakes.length} câu)
              </span>
            </div>

            <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1">
              {mistakes.map((q, idx) => {
                const isSelected = selectedQuestion?.id === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className={`cursor-pointer rounded-2xl border p-3.5 transition shadow-xs ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 ring-1 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400">Câu #{idx + 1}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveMistake(q.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                        title="Đã thuộc, xóa khỏi sổ tay"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="line-clamp-2 text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                      {q.sentence}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed view of selected mistake */}
          <div className="md:col-span-2">
            {selectedQuestion && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="rounded-lg bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 text-xs font-bold text-rose-700 dark:text-rose-300">
                    Chi tiết câu sai
                  </span>
                  <button
                    onClick={() => onRemoveMistake(selectedQuestion.id)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition border border-emerald-200 dark:border-emerald-800/60"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Đã hiểu, xóa câu này</span>
                  </button>
                </div>

                <div className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                  {selectedQuestion.sentence}
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedQuestion.options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-semibold ${
                        opt.key === selectedQuestion.correctAnswer
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                        opt.key === selectedQuestion.correctAnswer
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
                      }`}>
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>

                {/* 100% Full Explanation Card */}
                <ExplanationCard
                  explanation={selectedQuestion.explanation}
                  correctAnswer={selectedQuestion.correctAnswer}
                  userAnswer={selectedQuestion.correctAnswer}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
