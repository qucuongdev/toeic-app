import React, { useState, useEffect } from 'react';
import { Flashcard, SrsRating } from '@/types';
import { SEED_VOCABULARY } from '@/data/seedVocab';
import { calculateNextSrsState, SRS_INTERVAL_DAYS, selectCardsForReview, getSrsStatistics } from '@/services/srsEngine';
import { safeGetItem, safeSetItem, isFlashcardArray } from '@/utils/safeStorage';
import { useStreakStore } from '@/stores/useStreakStore';
import { 
  Volume2, 
  RotateCw, 
  Layers,
  Hash,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSettingsStore } from '@/stores/useSettingsStore';

const FLASHCARD_PRESET_COUNTS = [5, 10, 15, 20];

interface RatedCardHistory {
  word: string;
  meaning: string;
  rating: SrsRating;
  newBoxLevel: number;
}

export const FlashcardView: React.FC = () => {
  const { soundEnabled } = useSettingsStore();

  const [allCards, setAllCards] = useState<Flashcard[]>(() => {
    return safeGetItem<Flashcard[]>('engmaster_flashcards', SEED_VOCABULARY, isFlashcardArray);
  });

  const [batchCount, setBatchCount] = useState<number>(5);
  const [customCountInput, setCustomCountInput] = useState<string>('5');
  const [batchCards, setBatchCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [batchHistory, setBatchHistory] = useState<RatedCardHistory[]>([]);
  const [isBatchFinished, setIsBatchFinished] = useState<boolean>(false);

  // Calculate real-time SRS statistics
  const srsStats = getSrsStatistics(allCards);

  // Initialize batch with true Leitner due-date scheduling
  const startNewBatch = (count: number) => {
    const selected = selectCardsForReview(allCards, count);
    setBatchCards(selected);
    setCurrentIndex(0);
    setIsFlipped(false);
    setBatchHistory([]);
    setIsBatchFinished(false);
  };

  useEffect(() => {
    startNewBatch(batchCount);
  }, [batchCount]);

  // Save allCards to local storage defensively
  useEffect(() => {
    safeSetItem('engmaster_flashcards', allCards);
  }, [allCards]);

  const currentCard = batchCards[currentIndex] || batchCards[0];

  // Speak word using Web Speech API
  const speakWord = (word: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRate = (rating: SrsRating) => {
    if (!currentCard) return;

    const updatedCard = calculateNextSrsState(currentCard, rating);
    
    // Update in allCards state
    setAllCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));
    useStreakStore.getState().recordActivity();

    // Record in history
    const historyItem: RatedCardHistory = {
      word: currentCard.word,
      meaning: currentCard.definitionVi,
      rating,
      newBoxLevel: updatedCard.boxLevel
    };
    const updatedHistory = [...batchHistory, historyItem];
    setBatchHistory(updatedHistory);

    // Next card or finish
    setIsFlipped(false);
    if (currentIndex < batchCards.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsBatchFinished(true);
      const mastered = updatedHistory.filter(h => h.rating === 'good' || h.rating === 'easy').length;
      if (soundEnabled && (mastered / updatedHistory.length) >= 0.7) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
      }
    }
  };

  const handleApplyCustomCount = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customCountInput, 10);
    if (isNaN(val) || val <= 0) {
      setBatchCount(5);
      setCustomCountInput('5');
    } else {
      const clamped = Math.min(allCards.length, Math.max(1, val));
      setBatchCount(clamped);
      setCustomCountInput(clamped.toString());
    }
  };

  // Keyboard shortcut: Space to flip, 1/2/3/4 to rate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!isBatchFinished) {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped(f => !f);
        } else if (isFlipped) {
          if (e.key === '1') handleRate('again');
          if (e.key === '2') handleRate('hard');
          if (e.key === '3') handleRate('good');
          if (e.key === '4') handleRate('easy');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentCard, isBatchFinished]);

  const masteredCount = batchHistory.filter(h => h.rating === 'good' || h.rating === 'easy').length;
  const accuracyPercentage = batchHistory.length > 0 ? Math.round((masteredCount / batchHistory.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-2xl py-6 px-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Layers className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Flashcard SRS Leitner</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Lặp lại ngắt quãng 5 hộp ghi nhớ từ vựng vĩnh viễn</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/40 px-2.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-200 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Cần ôn: {srsStats.dueCount} thẻ</span>
          </div>

          {currentCard && !isBatchFinished && (
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
              <span>Hộp {currentCard.boxLevel} / 5</span>
              <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">
                ({SRS_INTERVAL_DAYS[currentCard.boxLevel]} ngày)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Batch Count Config (only visible before or after finish) */}
      {!isBatchFinished && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Số thẻ một lượt:</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {FLASHCARD_PRESET_COUNTS.map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    setBatchCount(count);
                    setCustomCountInput(count.toString());
                  }}
                  className={`h-7 px-2.5 rounded-lg text-xs font-bold transition ${
                    batchCount === count
                      ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {count} thẻ
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleApplyCustomCount} className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tùy chỉnh:</span>
            <input
              type="number"
              min="1"
              max={allCards.length}
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

      {!isBatchFinished ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Thẻ {currentIndex + 1} / {batchCards.length}</span>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / batchCards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 3D Flip Flashcard Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="perspective-1000 group relative h-[360px] w-full cursor-pointer select-none"
          >
            <div
              className={`transform-style-3d relative h-full w-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-lg shadow-slate-200/40 dark:shadow-none transition-transform duration-500 ease-out ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT FACE */}
              <div className="backface-hidden absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                  <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 text-indigo-700 dark:text-indigo-300 uppercase font-bold text-[10px] ring-1 ring-indigo-200/50 dark:ring-indigo-800/50">
                    {currentCard?.partOfSpeech}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    <RotateCw className="h-3.5 w-3.5" /> Bấm thẻ hoặc phím Space để lật
                  </span>
                </div>

                <div className="text-center my-auto">
                  <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                    {currentCard?.word}
                  </h3>
                  <p className="mt-2 text-lg font-mono text-slate-500 dark:text-slate-400">{currentCard?.phonetic}</p>

                  <button
                    type="button"
                    onClick={(e) => speakWord(currentCard?.word || '', e)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 active:scale-95 transition shadow-xs"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Nghe phát âm chuẩn</span>
                  </button>
                </div>

                {currentCard?.collocationTip && (
                  <div className="rounded-xl bg-amber-50/80 dark:bg-amber-950/50 p-3 text-center border border-amber-200/70 dark:border-amber-800/60">
                    <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                      💡 Mẹo Collocation: {currentCard.collocationTip}
                    </span>
                  </div>
                )}
              </div>

              {/* BACK FACE */}
              <div className="rotate-y-180 backface-hidden absolute inset-0 flex flex-col justify-between p-8 bg-slate-50/80 dark:bg-slate-900 rounded-3xl">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Nghĩa tiếng Việt</span>
                  <h4 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                    {currentCard?.definitionVi}
                  </h4>
                </div>

                <div className="my-auto space-y-2 rounded-2xl bg-white dark:bg-slate-800 p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Ví dụ ngữ cảnh:</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 italic">"{currentCard?.exampleSentence}"</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">➜ {currentCard?.exampleTranslation}</p>
                </div>

                <div className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Chọn mức độ nhớ bên dưới (Phím 1, 2, 3, 4)
                </div>
              </div>
            </div>
          </div>

          {/* Rating Controls (Leitner 4-button) */}
          {isFlipped ? (
            <div className="mt-6 grid grid-cols-4 gap-2.5 animate-in fade-in-50 slide-in-from-bottom-2 duration-200">
              <button
                onClick={() => handleRate('again')}
                className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-3 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 active:scale-95 transition-all shadow-xs"
              >
                <span className="text-xs font-black">1. Quên</span>
                <span className="text-[10px] text-rose-500 dark:text-rose-400 font-medium">Hộp 1 (1 ngày)</span>
              </button>
              <button
                onClick={() => handleRate('hard')}
                className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 p-3 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 active:scale-95 transition-all shadow-xs"
              >
                <span className="text-xs font-black">2. Khó</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">+1 ngày</span>
              </button>
              <button
                onClick={() => handleRate('good')}
                className="flex flex-col items-center justify-center rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 p-3 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 active:scale-95 transition-all shadow-xs"
              >
                <span className="text-xs font-black">3. Nhớ tốt</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">+1 bậc hộp</span>
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 p-3 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 active:scale-95 transition-all shadow-xs"
              >
                <span className="text-xs font-black">4. Rất dễ</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">+2 bậc hộp</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
              💡 Bấm phím <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Space</kbd> hoặc click vào thẻ để xem đáp án
            </div>
          )}
        </div>
      ) : (
        /* BATCH COMPLETION & SCORE SUMMARY SCREEN */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
              <Trophy className="h-8 w-8 text-amber-500" />
            </div>

            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                accuracyPercentage >= 75 ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
              }`}>
                Hoàn thành lượt học {batchHistory.length} thẻ
              </span>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                {masteredCount} / {batchHistory.length} Từ Đã Nhớ Tốt
              </h3>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                Tỷ lệ nhớ: {accuracyPercentage}%
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => startNewBatch(batchCount)}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Học tiếp bộ thẻ mới</span>
            </button>

            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
                setBatchHistory([]);
                setIsBatchFinished(false);
              }}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Ôn lại bộ thẻ vừa rồi</span>
            </button>
          </div>

          {/* Cards Breakdown */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Chi tiết thẻ trong đợt học:</h4>
            <div className="space-y-2">
              {batchHistory.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 p-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {item.rating === 'good' || item.rating === 'easy' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.word}</span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2">➜ {item.meaning}</span>
                    </div>
                  </div>

                  <span className="rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                    Hộp {item.newBoxLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
