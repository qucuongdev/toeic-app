import { create } from 'zustand';
import { safeGetItem, safeSetItem } from '@/utils/safeStorage';

interface HistoryState {
  answeredIds: string[];
  addAnsweredIds: (ids: string[]) => void;
  isAnswered: (id: string) => boolean;
  clearHistory: () => void;
  getAnsweredCount: () => number;
}

const STORAGE_KEY = 'engmaster_answered_history';

function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((item) => typeof item === 'string');
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  answeredIds: safeGetItem<string[]>(STORAGE_KEY, [], isStringArray),

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
      safeSetItem(STORAGE_KEY, updated);
      set({ answeredIds: updated });
    }
  },

  isAnswered: (id: string) => {
    return get().answeredIds.includes(id);
  },

  clearHistory: () => {
    safeSetItem(STORAGE_KEY, []);
    set({ answeredIds: [] });
  },

  getAnsweredCount: () => {
    return get().answeredIds.length;
  }
}));
