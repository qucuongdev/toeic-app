import React from 'react';
import { QuestionExplanation } from '@/types';
import { Lightbulb, CheckCircle2, XCircle, Sparkles, BookOpen } from 'lucide-react';

interface ExplanationCardProps {
  explanation: QuestionExplanation;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  explanation,
  userAnswer,
  correctAnswer,
}) => {
  const isCorrect = userAnswer === correctAnswer;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200">
      {/* Top Banner Status */}
      <div
        className={`flex items-center justify-between px-5 py-3 ${
          isCorrect
            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border-b border-emerald-100 dark:border-emerald-900/40'
            : 'bg-rose-50/80 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 border-b border-rose-100 dark:border-rose-900/40'
        }`}
      >
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-bold text-sm">Chính xác! Đáp án đúng là {correctAnswer}</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="font-bold text-sm">
                Chưa chính xác (Bạn chọn {userAnswer || 'chưa chọn'}) — Đáp án đúng là {correctAnswer}
              </span>
            </>
          )}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-full shadow-xs border border-slate-200/60 dark:border-slate-700/60">
          Giải thích chi tiết
        </span>
      </div>

      <div className="p-5 space-y-3.5 text-sm leading-relaxed">
        {/* 1. Translation */}
        <div className="rounded-xl bg-slate-50/80 dark:bg-slate-800/40 p-4 border border-slate-200/60 dark:border-slate-700/50">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide mb-1.5 text-indigo-700 dark:text-indigo-400">
            <BookOpen className="h-4 w-4" />
            <span>1. Bản dịch tiếng Việt:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 italic font-medium leading-normal">
            "{explanation.translation}"
          </p>
        </div>

        {/* 2. Key Signal Clue */}
        <div className="rounded-xl bg-slate-50/80 dark:bg-slate-800/40 p-4 border border-slate-200/60 dark:border-slate-700/50">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 text-xs uppercase tracking-wide mb-1.5">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>2. Dấu hiệu nhận biết then chốt (Key Clue):</span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
            <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 px-2.5 py-1 rounded-lg font-bold ring-1 ring-amber-300 dark:ring-amber-700/60 shadow-xs inline-block">
              {explanation.keySignal}
            </span>
          </p>
        </div>

        {/* 3. Why Correct */}
        <div className="rounded-xl bg-slate-50/80 dark:bg-slate-800/40 p-4 border border-slate-200/60 dark:border-slate-700/50">
          <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 text-xs uppercase tracking-wide mb-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>3. Vì sao đáp án ({correctAnswer}) ĐÚNG:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300">{explanation.whyCorrect}</p>
        </div>

        {/* 4. Why Distractors are Incorrect (Phương pháp loại trừ) */}
        {explanation.whyIncorrect && Object.keys(explanation.whyIncorrect).length > 0 && (
          <div className="rounded-xl bg-slate-50/80 dark:bg-slate-800/40 p-4 border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide mb-2 text-rose-700 dark:text-rose-400">
              <XCircle className="h-4 w-4" />
              <span>4. Phân tích loại trừ các phương án SAI:</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {Object.entries(explanation.whyIncorrect).map(([key, reason]) => (
                <li key={key} className="flex items-start gap-2.5">
                  <span className="font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900/60 shrink-0">
                    {key} sai
                  </span>
                  <span className="pt-0.5">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. 5-Second Fast Tip */}
        <div className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 p-4 border border-indigo-200/80 dark:border-indigo-800/50">
          <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 text-xs uppercase tracking-wider mb-1.5">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span>5. Mẹo ghi nhớ siêu tốc 5 giây:</span>
          </div>
          <p className="text-indigo-950 dark:text-indigo-200 font-bold text-sm bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 shadow-xs">
            👉 {explanation.fastTip}
          </p>
        </div>
      </div>
    </div>
  );
};
