export interface StreakResult {
  streak: number;
  lastActiveDate: string;
}

export interface StreakStatus {
  activeStreak: number;
  completedToday: boolean;
  isExpired: boolean;
}

/**
 * Returns current date in YYYY-MM-DD local format
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates calendar day difference between date1 (earlier) and date2 (later)
 */
function getDaysDiff(d1Str: string, d2Str: string): number {
  const d1 = new Date(d1Str + 'T00:00:00');
  const d2 = new Date(d2Str + 'T00:00:00');
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculates updated streak when user completes a learning action
 */
export function calculateStreakUpdate(
  lastActiveDate: string | null,
  currentStreak: number,
  todayStr: string = getLocalDateString()
): StreakResult {
  if (!lastActiveDate) {
    return {
      streak: 1,
      lastActiveDate: todayStr,
    };
  }

  const diff = getDaysDiff(lastActiveDate, todayStr);

  if (diff === 0) {
    // Already studied today
    return {
      streak: Math.max(1, currentStreak),
      lastActiveDate: todayStr,
    };
  }

  if (diff === 1) {
    // Consecutive day
    return {
      streak: currentStreak + 1,
      lastActiveDate: todayStr,
    };
  }

  // Missed days (> 1 day ago) or clock went backwards
  return {
    streak: 1,
    lastActiveDate: todayStr,
  };
}

/**
 * Evaluates streak status on page load/app start
 */
export function getStreakStatus(
  lastActiveDate: string | null,
  currentStreak: number,
  todayStr: string = getLocalDateString()
): StreakStatus {
  if (!lastActiveDate || currentStreak <= 0) {
    return {
      activeStreak: 0,
      completedToday: false,
      isExpired: false,
    };
  }

  const diff = getDaysDiff(lastActiveDate, todayStr);

  if (diff === 0) {
    return {
      activeStreak: currentStreak,
      completedToday: true,
      isExpired: false,
    };
  }

  if (diff === 1) {
    // Studied yesterday, streak still alive today
    return {
      activeStreak: currentStreak,
      completedToday: false,
      isExpired: false,
    };
  }

  // Lapsed
  return {
    activeStreak: 0,
    completedToday: false,
    isExpired: true,
  };
}
