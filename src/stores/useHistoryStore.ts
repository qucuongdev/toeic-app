import { create } from 'zustand';

interface HistoryState {
  answeredIds: string[];
  addAnsweredIds: (ids: string[]) => void;
  isAnswered: (id: string) => boolean;
  clearHistory: () => void;
  getAnsweredCount: () => number;
}

const STORAGE_KEY = 'engmaster_answered_history';

function loadPersistedHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePersistedHistory(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage might be full or private browsing
  }
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  answeredIds: loadPersistedHistory(),

  addAnsweredIds: (newIds: string[]) => {
    if (!newIds || newIds.length === 0) return;
    const current = get().answeredIds;
    const existingSet = new Set(current);
    const added: string[] = [];

    newIds.forEach((id) => {
      if (!existingSet.has(id)) {
        existingSet.add(id);
        added.push(id);
      }
    });

    if (added.length > 0) {
      const updated = [...current, ...added];
      savePersistedHistory(updated);
      set({ answeredIds: updated });
    }
  },

  isAnswered: (id: string) => {
    return get().answeredIds.includes(id);
  },

  clearHistory: () => {
    savePersistedHistory([]);
    set({ answeredIds: [] });
  },

  getAnsweredCount: () => {
    return get().answeredIds.length;
  }
}));
