import React from 'react';
import { 
  Sparkles, 
  Clock,
  BrainCircuit, 
  Layers, 
  Headphones, 
  GraduationCap, 
  BookmarkCheck, 
  Key, 
  Flame,
  Volume2,
  VolumeX,
  Sun,
  Moon
} from 'lucide-react';
import { useSettingsStore } from '@/stores/useSettingsStore';

export type ActiveTab = 'signals' | 'tenses' | 'ai-gen' | 'vocab' | 'dictation' | 'exam' | 'mistakes';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  streakDays?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  streakDays = 3,
}) => {
  const { geminiApiKey, setSettingsOpen, soundEnabled, toggleSound, theme, toggleTheme } = useSettingsStore();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'signals',
      label: 'Dấu Hiệu Nhận Biết',
      icon: <Sparkles className="h-4 w-4" />,
      badge: 'HOT',
    },
    {
      id: 'tenses',
      label: '12 Loại Thì',
      icon: <Clock className="h-4 w-4" />,
      badge: 'NEW',
    },
    {
      id: 'ai-gen',
      label: 'Gemini AI Studio',
      icon: <BrainCircuit className="h-4 w-4" />,
      badge: 'AI',
    },
    {
      id: 'vocab',
      label: 'Từ Vựng SRS',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 'dictation',
      label: 'Nghe Chép Chính Tả',
      icon: <Headphones className="h-4 w-4" />,
    },
    {
      id: 'exam',
      label: 'Phòng Thi Thử',
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      id: 'mistakes',
      label: 'Sổ Tay Câu Sai',
      icon: <BookmarkCheck className="h-4 w-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => onTabChange('signals')}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
            <span className="text-xl font-black">E</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">EngMaster</span>
              <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20 dark:ring-indigo-400/30">
                PRO
              </span>
            </div>
            <p className="hidden text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:block">TOEIC ETS & Grammar Signal Hacks</p>
          </div>
        </div>

        {/* Center Nav tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl px-2 xl:px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-200/90 shadow-xs dark:bg-indigo-600 dark:text-white dark:ring-0'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-black uppercase ${
                      isActive
                        ? 'bg-indigo-200/70 text-indigo-800 dark:bg-indigo-800 dark:text-white'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak indicator */}
          <div 
            title={streakDays > 0 ? `Chuỗi học liên tục: ${streakDays} ngày` : 'Học bài ngay hôm nay để bắt đầu chuỗi Streak!'}
            className={`flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-bold shadow-xs transition-colors ${
              streakDays > 0
                ? 'border-amber-200/80 dark:border-amber-800/40 bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
            }`}
          >
            <Flame className={`h-4 w-4 ${streakDays > 0 ? 'text-amber-500 fill-amber-500 animate-bounce' : 'text-slate-400'}`} />
            <span>{streakDays}d</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition shadow-xs"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-button"
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng (Light mode)' : 'Chuyển sang chế độ Tối (Dark mode)'}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition shadow-xs cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-180 duration-200" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600 animate-in spin-in-180 duration-200" />
            )}
          </button>

          {/* Gemini API Key Configuration Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            title="Cấu hình Gemini API Key"
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold active:scale-95 transition shadow-xs ${
              geminiApiKey
                ? 'border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                : 'border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">
              {geminiApiKey ? 'Gemini Key' : 'Thêm Key'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex overflow-x-auto border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-2 lg:hidden no-scrollbar gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition active:scale-95 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-200/90 dark:bg-indigo-600 dark:text-white dark:ring-0'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
