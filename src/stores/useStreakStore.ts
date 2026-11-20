import { create } from 'zustand';
import { safeGetItem, safeSetItem } from '@/utils/safeStorage';
import { calculateStreakUpdate, getStreakStatus } from '@/services/streakService';

interface StreakStorageData {
  streak: number;
  lastActiveDate: string | null;
}

interface StreakState {
  streak: number;
  lastActiveDate: string | null;
  completedToday: boolean;
  recordActivity: () => void;
  getEffectiveStreak: () => number;
}

const STREAK_STORAGE_KEY = 'engmaster_streak_data';

function loadInitialStreak(): { streak: number; lastActiveDate: string | null; completedToday: boolean } {
  const data = safeGetItem<StreakStorageData>(
    STREAK_STORAGE_KEY,
    { streak: 0, lastActiveDate: null },
    (val): val is StreakStorageData => {
      if (!val || typeof val !== 'object') return false;
      const v = val as Partial<StreakStorageData>;
      return typeof v.streak === 'number' && (v.lastActiveDate === null || typeof v.lastActiveDate === 'string');
    }
  );

  const status = getStreakStatus(data.lastActiveDate, data.streak);
  return {
    streak: status.activeStreak,
    lastActiveDate: data.lastActiveDate,
    completedToday: status.completedToday,
  };
}

export const useStreakStore = create<StreakState>((set, get) => {
  const initial = loadInitialStreak();

  return {
    streak: initial.streak,
    lastActiveDate: initial.lastActiveDate,
    completedToday: initial.completedToday,

    recordActivity: () => {
      const current = get();
      const result = calculateStreakUpdate(current.lastActiveDate, current.streak);
      
      safeSetItem(STREAK_STORAGE_KEY, {
        streak: result.streak,
        lastActiveDate: result.lastActiveDate,
      });

      set({
        streak: result.streak,
        lastActiveDate: result.lastActiveDate,
        completedToday: true,
      });
    },

    getEffectiveStreak: () => {
      const { lastActiveDate, streak } = get();
      const status = getStreakStatus(lastActiveDate, streak);
      return status.activeStreak;
    },
  };
});
