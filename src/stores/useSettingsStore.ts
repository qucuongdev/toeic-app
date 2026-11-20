import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';
export type GeminiModelId = 'gemini-2.5-flash' | 'gemini-2.0-flash' | 'gemini-2.5-pro';

interface SettingsState {
  geminiApiKey: string;
  geminiModel: GeminiModelId;
  soundEnabled: boolean;
  autoSpeak: boolean;
  isSettingsOpen: boolean;
  theme: ThemeMode;
  setGeminiApiKey: (key: string) => void;
  clearGeminiApiKey: () => void;
  setGeminiModel: (model: GeminiModelId) => void;
  toggleSound: () => void;
  toggleAutoSpeak: () => void;
  setSettingsOpen: (open: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const API_KEY_STORAGE = 'engmaster_gemini_api_key';
const MODEL_STORAGE = 'engmaster_gemini_model';
const THEME_STORAGE = 'engmaster_theme';

function applyThemeClass(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE) as ThemeMode | null;
    if (saved === 'dark' || saved === 'light') {
      applyThemeClass(saved);
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyThemeClass('dark');
      return 'dark';
    }
  } catch {
    // fallback
  }
  applyThemeClass('light');
  return 'light';
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  geminiApiKey: typeof window !== 'undefined' ? localStorage.getItem(API_KEY_STORAGE) || '' : '',
  geminiModel: (typeof window !== 'undefined' ? (localStorage.getItem(MODEL_STORAGE) as GeminiModelId) || 'gemini-2.5-flash' : 'gemini-2.5-flash'),
  soundEnabled: true,
  autoSpeak: true,
  isSettingsOpen: false,
  theme: getInitialTheme(),

  setGeminiApiKey: (key: string) => {
    const trimmed = key.trim();
    if (typeof window !== 'undefined') {
      localStorage.setItem(API_KEY_STORAGE, trimmed);
    }
    set({ geminiApiKey: trimmed });
  },

  clearGeminiApiKey: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(API_KEY_STORAGE);
    }
    set({ geminiApiKey: '' });
  },

  setGeminiModel: (model: GeminiModelId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MODEL_STORAGE, model);
    }
    set({ geminiModel: model });
  },

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleAutoSpeak: () => set((state) => ({ autoSpeak: !state.autoSpeak })),
  setSettingsOpen: (open: boolean) => set({ isSettingsOpen: open }),

  setTheme: (theme: ThemeMode) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(THEME_STORAGE, theme);
      } catch {
        // storage fallback
      }
    }
    applyThemeClass(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const nextTheme: ThemeMode = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(nextTheme);
  }
}));
