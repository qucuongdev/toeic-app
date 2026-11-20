import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar, ActiveTab } from '@/components/common/Navbar';
import { ApiKeyModal } from '@/components/common/ApiKeyModal';
import { Question } from '@/types';
import { safeGetItem, safeSetItem, isQuestionArray } from '@/utils/safeStorage';
import { useStreakStore } from '@/stores/useStreakStore';

// Code-split dynamic feature chunks for optimal bundle size and instant initial load
const SignalQuizView = lazy(() => import('@/features/signals/SignalQuizView').then(m => ({ default: m.SignalQuizView })));
const TensesQuizView = lazy(() => import('@/features/tenses/TensesQuizView').then(m => ({ default: m.TensesQuizView })));
const AiStudioView = lazy(() => import('@/features/ai-generator/AiStudioView').then(m => ({ default: m.AiStudioView })));
const FlashcardView = lazy(() => import('@/features/vocabulary/FlashcardView').then(m => ({ default: m.FlashcardView })));
const DictationView = lazy(() => import('@/features/dictation/DictationView').then(m => ({ default: m.DictationView })));
const ExamSimulatorView = lazy(() => import('@/features/exam/ExamSimulatorView').then(m => ({ default: m.ExamSimulatorView })));
const MistakeNotebookView = lazy(() => import('@/features/dashboard/MistakeNotebookView').then(m => ({ default: m.MistakeNotebookView })));

const ViewLoadingFallback = () => (
  <div className="mx-auto max-w-4xl py-20 px-4 flex flex-col items-center justify-center text-center animate-in fade-in duration-150">
    <div className="h-8 w-8 animate-spin rounded-full border-3 border-indigo-600 border-t-transparent shadow-sm" />
    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
      Đang tải dữ liệu bài học...
    </p>
  </div>
);

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('signals');
  const streak = useStreakStore((state) => state.streak);
  
  // Mistake Notebook state with safe storage validation
  const [mistakes, setMistakes] = useState<Question[]>(() => {
    return safeGetItem<Question[]>('engmaster_mistakes', [], isQuestionArray);
  });

  useEffect(() => {
    safeSetItem('engmaster_mistakes', mistakes);
  }, [mistakes]);

  const handleSaveMistake = (q: Question) => {
    setMistakes((prev) => {
      if (prev.some((item) => item.id === q.id)) return prev;
      return [q, ...prev];
    });
  };

  const handleRemoveMistake = (id: string) => {
    setMistakes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllMistakes = () => {
    setMistakes([]);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        streakDays={streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        <Suspense fallback={<ViewLoadingFallback />}>
          <div key={activeTab} className="animate-in fade-in-50 slide-in-from-bottom-1 duration-200">
            {activeTab === 'signals' && <SignalQuizView onSaveMistake={handleSaveMistake} />}
            {activeTab === 'tenses' && <TensesQuizView onSaveMistake={handleSaveMistake} />}
            {activeTab === 'ai-gen' && <AiStudioView onSaveMistake={handleSaveMistake} />}
            {activeTab === 'vocab' && <FlashcardView />}
            {activeTab === 'dictation' && <DictationView />}
            {activeTab === 'exam' && <ExamSimulatorView onSaveMistake={handleSaveMistake} />}
            {activeTab === 'mistakes' && (
              <MistakeNotebookView
                mistakes={mistakes}
                onRemoveMistake={handleRemoveMistake}
                onClearAll={handleClearAllMistakes}
              />
            )}
          </div>
        </Suspense>
      </main>

      {/* Global API Key Configuration Modal */}
      <ApiKeyModal />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 EngMaster. Luyện thi TOEIC ETS & Dấu hiệu nhận biết chuyên sâu.</p>
          <p className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <span>Powered by React 18, Vite, Tailwind CSS, shadcn/ui & Gemini AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
