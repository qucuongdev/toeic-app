import React, { useState } from 'react';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { generateQuestionsWithGemini } from '@/services/geminiService';
import { Question } from '@/types';
import { ExplanationCard } from '@/components/common/ExplanationCard';
import { 
  BrainCircuit, 
  Sparkles, 
  Key, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface AiStudioViewProps {
  onSaveMistake?: (q: Question) => void;
}

export const AiStudioView: React.FC<AiStudioViewProps> = ({ onSaveMistake }) => {
  const { geminiApiKey, geminiModel, setSettingsOpen } = useSettingsStore();

  const [topic, setTopic] = useState<string>('Dấu hiệu đi với giới từ WITH (comply with, collaborate with, deal with...)');
  const [count, setCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Generated questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const predefinedTopics = [
    'Dấu hiệu đi với giới từ WITH (comply with, collaborate with, deal with, provide with...)',
    'Dấu hiệu đi với giới từ FOR (responsible for, eligible for, apply for...)',
    'Dấu hiệu đi với giới từ TO (look forward to, commit to, adhere to...)',
    'Cặp liên từ song hành (Between...and, Either...or, Neither...nor)',
    'Phân biệt biến thể từ loại Noun / Adj / Adv / Verb theo đuôi từ và vị trí',
    '12 Thì Tiếng Anh & Dấu hiệu nhận biết thời gian',
    'Đề thi thử tổng hợp TOEIC Part 5 chuẩn ETS'
  ];

  const handleGenerate = async () => {
    if (!geminiApiKey) {
      setSettingsOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateQuestionsWithGemini({
        apiKey: geminiApiKey,
        category: topic,
        count: count,
        modelName: geminiModel,
      });

      setQuestions(generated);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể sinh câu hỏi từ Gemini.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentQ = questions[currentIndex];

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(key);
    setIsAnswered(true);

    if (key !== currentQ.correctAnswer && onSaveMistake) {
      onSaveMistake(currentQ);
    }
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-6 px-4">
      {/* Title Header */}
      <div className="mb-6 rounded-3xl border border-indigo-200/30 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/30 text-indigo-300">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">{geminiModel}</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">AI Question Studio</h2>
            <p className="mt-1 text-sm text-indigo-200">
              Sinh đề thi TOEIC tự động theo đúng chủ đề và dấu hiệu nhận biết bạn mong muốn
            </p>
          </div>

          {!geminiApiKey ? (
            <button
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-bold text-indigo-950 shadow-md hover:bg-indigo-50 active:scale-95 transition"
            >
              <Key className="h-4 w-4 text-indigo-600" />
              <span>Nhập Gemini Key (Miễn phí)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-2 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Đã kết nối Gemini API</span>
            </div>
          )}
        </div>
      </div>

      {/* No API Key Notice banner */}
      {!geminiApiKey && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-bold text-amber-900">Bạn chưa nhập Gemini API Key</h4>
                <p className="mt-0.5 text-xs text-amber-800 leading-relaxed">
                  Google cung cấp Gemini API hoàn toàn miễn phí (không mất tiền). Hãy lấy key và dán vào web để sử dụng tính năng sinh đề AI này!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition"
              >
                <span>Lấy Key tại Google AI Studio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => setSettingsOpen(true)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
              >
                Dán Key vào đây
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generation Config Box */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Tùy Chọn Sinh Đề:</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
              Chủ đề & Dấu hiệu nhận biết:
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 p-3 text-sm font-medium text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {predefinedTopics.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Số lượng câu:</span>
              <div className="flex gap-1.5">
                {[3, 5, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCount(num)}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                      count === num
                        ? 'bg-slate-900 dark:bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {num} câu
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isLoading}
              onClick={handleGenerate}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Gemini đang sinh đề...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Sinh bộ câu hỏi ngay</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}
      </div>

      {/* Generated Questions Interactive Area */}
      {questions.length > 0 && currentQ && (
        <div className="rounded-3xl border border-indigo-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-indigo-100/50 dark:shadow-none animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
            <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Câu {currentIndex + 1} / {questions.length} (Đề do Gemini AI sinh)
            </span>
            <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Đầy đủ giải thích 100%
            </span>
          </div>

          <div className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed min-h-[60px]">
            {currentQ.sentence}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isCorrect = opt.key === currentQ.correctAnswer;

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
                  onClick={() => handleSelect(opt.key)}
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

          {/* 100% EXPLANATIONS FROM GEMINI (DISPLAYS ON RIGHT OR WRONG) */}
          {isAnswered && selectedOption && (
            <ExplanationCard
              explanation={currentQ.explanation}
              userAnswer={selectedOption}
              correctAnswer={currentQ.correctAnswer}
            />
          )}

          {isAnswered && (
            <div className="mt-6 flex items-center justify-end border-t border-slate-100 dark:border-slate-800 pt-5">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-700 transition"
              >
                <span>{currentIndex < questions.length - 1 ? 'Câu kế tiếp' : 'Hoàn thành bộ đề AI'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
