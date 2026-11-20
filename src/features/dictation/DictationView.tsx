import React, { useState, useEffect } from 'react';
import { SEED_DICTATION } from '@/data/seedDictation';
import { evaluateDictation } from '@/services/dictationMatcher';
import { DictationResult, DictationItem } from '@/types';
import { 
  Headphones, 
  Volume2, 
  ArrowRight, 
  HelpCircle,
  Gauge,
  Hash,
  RotateCcw,
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useStreakStore } from '@/stores/useStreakStore';

const DICTATION_PRESET_COUNTS = [3, 5, 8, 10];

interface DictationHistoryItem {
  item: DictationItem;
  userInput: string;
  result: DictationResult;
}

export const DictationView: React.FC = () => {
  const { soundEnabled } = useSettingsStore();

  const [sessionCount, setSessionCount] = useState<number>(5);
  const [customCountInput, setCustomCountInput] = useState<string>('5');
  const [sessionItems, setSessionItems] = useState<DictationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<DictationResult | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [sessionHistory, setSessionHistory] = useState<DictationHistoryItem[]>([]);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);

  // Initialize session
  const startNewSession = (count: number) => {
    const shuffled = [...SEED_DICTATION].sort(() => Math.random() - 0.5);
    setSessionItems(shuffled.slice(0, count));
    setCurrentIndex(0);
    setUserInput('');
    setResult(null);
    setShowHint(false);
    setSessionHistory([]);
    setIsSessionFinished(false);
  };

  useEffect(() => {
    startNewSession(sessionCount);
  }, [sessionCount]);

  const currentItem = sessionItems[currentIndex] || sessionItems[0];

  const playAudio = (speed: number = playbackSpeed) => {
    if (!currentItem) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentItem.audioText);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    if (!currentItem) return;
    const evalResult = evaluateDictation(userInput, currentItem.audioText);
    setResult(evalResult);
    useStreakStore.getState().recordActivity();

    if (soundEnabled && evalResult.accuracyPercentage >= 90) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleNext = () => {
    if (!currentItem) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Record in history
    const evalResult = result || evaluateDictation(userInput, currentItem.audioText);
    const updatedHistory = [...sessionHistory, { item: currentItem, userInput, result: evalResult }];
    setSessionHistory(updatedHistory);

    setUserInput('');
    setResult(null);
    setShowHint(false);

    if (currentIndex < sessionItems.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsSessionFinished(true);
      const avgAcc = Math.round(updatedHistory.reduce((acc, h) => acc + h.result.accuracyPercentage, 0) / updatedHistory.length);
      if (soundEnabled && avgAcc >= 75) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
      }
    }
  };

  const handleApplyCustomCount = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customCountInput, 10);
    if (isNaN(val) || val <= 0) {
      setSessionCount(3);
      setCustomCountInput('3');
    } else {
      const clamped = Math.min(SEED_DICTATION.length, Math.max(1, val));
      setSessionCount(clamped);
      setCustomCountInput(clamped.toString());
    }
  };

  const averageAccuracy = sessionHistory.length > 0
    ? Math.round(sessionHistory.reduce((acc, h) => acc + h.result.accuracyPercentage, 0) / sessionHistory.length)
    : 0;

  return (
    <div className="mx-auto max-w-3xl py-6 px-4">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Headphones className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Nghe Chép Chính Tả (Dictation)</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Luyện nghe từng âm tiết, gõ lại chuẩn xác 100%</p>
        </div>

        {currentItem && !isSessionFinished && (
          <span className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
            Câu {currentIndex + 1} / {sessionItems.length}
          </span>
        )}
      </div>

      {/* Sentence Count Config Bar (visible when not finished) */}
      {!isSessionFinished && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Số câu chép chính tả:</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {DICTATION_PRESET_COUNTS.map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    setSessionCount(count);
                    setCustomCountInput(count.toString());
                  }}
                  className={`h-7 px-2.5 rounded-lg text-xs font-bold transition ${
                    sessionCount === count
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
              max={SEED_DICTATION.length}
              value={customCountInput}
              onChange={(e) => setCustomCountInput(e.target.value)}
              className="w-14 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 text-xs font-bold text-slate-900 dark:text-slate-100 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="h-7 px-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-bold transition border border-indigo-200 dark:border-indigo-800/60"
            >
              Lọc
            </button>
          </form>
        </div>
      )}

      {!isSessionFinished ? (
        /* Main Player Card */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          {/* Progress Bar */}
          <div className="mb-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Tiến độ: {Math.round(((currentIndex) / sessionItems.length) * 100)}%</span>
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIndex) / sessionItems.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Audio Player Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 p-5 border border-indigo-100 dark:border-indigo-900/40">
            <div className="flex items-center gap-3">
              <button
                onClick={() => playAudio(playbackSpeed)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition"
              >
                <Volume2 className="h-6 w-6" />
              </button>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Bấm để nghe audio mẫu</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Giọng chuẩn Mỹ, phát âm tự nhiên</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5" /> Tốc độ:
              </span>
              {[0.75, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setPlaybackSpeed(rate);
                    playAudio(rate);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    playbackSpeed === rate
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Typing Box */}
          <div className="mt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Gõ lại chính xác những gì bạn nghe được:
            </label>
            <textarea
              rows={3}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Gõ câu tiếng Anh tại đây..."
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-base font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Action Row */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Xem từ gợi ý'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCheck}
                disabled={!userInput.trim()}
                className="rounded-xl bg-slate-900 dark:bg-slate-800 border border-transparent dark:border-slate-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 dark:hover:bg-slate-750 disabled:opacity-40 transition"
              >
                Kiểm tra câu này
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
              >
                <span>{currentIndex < sessionItems.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả bài nghe'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hints Drawer */}
          {showHint && currentItem && (
            <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-xs border border-amber-200/80 dark:border-amber-800/60">
              <span className="font-bold text-amber-900 dark:text-amber-200">Gợi ý từ vựng: </span>
              <span className="text-amber-800 dark:text-amber-300 font-mono">{currentItem.hints.join(' • ')}</span>
            </div>
          )}

          {/* Comparison Results */}
          {result && currentItem && (
            <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Kết quả kiểm tra</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${
                  result.accuracyPercentage >= 90
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                    : result.accuracyPercentage >= 60
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                    : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200'
                }`}>
                  Độ chính xác: {result.accuracyPercentage}%
                </span>
              </div>

              {/* Tokenized diff view */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Phân tích từng từ:</span>
                <div className="flex flex-wrap gap-1.5">
                  {result.userTokens.map((token, idx) => {
                    let color = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800';
                    if (token.status === 'missing') color = 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800 line-through';
                    if (token.status === 'incorrect') color = 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800';

                    return (
                      <span key={idx} className={`rounded-lg px-2 py-0.5 text-xs font-medium border ${color}`}>
                        {token.text}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Correct Sentence & Translation */}
              <div className="rounded-xl bg-white dark:bg-slate-800 p-3 border border-slate-200/80 dark:border-slate-700 space-y-1 text-xs">
                <div>
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">Câu chuẩn: </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{currentItem.audioText}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 dark:text-slate-400">Dịch nghĩa: </span>
                  <span className="text-slate-600 dark:text-slate-300">{currentItem.translation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* DICTATION SESSION COMPLETION & SCORE SUMMARY SCREEN */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
              {averageAccuracy >= 75 ? (
                <Trophy className="h-8 w-8 text-amber-500" />
              ) : (
                <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>

            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                averageAccuracy >= 85
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                  : averageAccuracy >= 65
                  ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
              }`}>
                Hoàn thành lượt nghe chép {sessionHistory.length} câu
              </span>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                Độ chính xác trung bình: {averageAccuracy}%
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => startNewSession(sessionCount)}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Luyện tiếp lượt nghe mới</span>
            </button>

            <button
              onClick={() => {
                setCurrentIndex(0);
                setUserInput('');
                setResult(null);
                setSessionHistory([]);
                setIsSessionFinished(false);
              }}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Luyện lại lượt này</span>
            </button>
          </div>

          {/* Sentence Breakdown */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Chi tiết các câu đã nghe:</h4>
            <div className="space-y-3">
              {sessionHistory.map((h, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 p-3.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Câu {idx + 1}:</span>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                      h.result.accuracyPercentage >= 80 ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                    }`}>
                      {h.result.accuracyPercentage}% chính xác
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">"{h.item.audioText}"</p>
                  <p className="text-slate-500 dark:text-slate-400 italic">➜ {h.item.translation}</p>
                  <p className="text-slate-600 dark:text-slate-300 pt-1">
                    <strong className="text-slate-700 dark:text-slate-300">Bạn đã gõ: </strong>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">{h.userInput || '(Chưa gõ)'}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
