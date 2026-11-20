import { describe, it, expect, beforeEach, vi } from 'vitest';
import { calculateStreakUpdate, getStreakStatus } from '@/services/streakService';

describe('Streak Service (Authentic Calendar Day Calculation)', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('starts streak at 1 if user has no prior activity', () => {
    const today = '2026-11-16';
    const result = calculateStreakUpdate(null, 0, today);
    expect(result.streak).toBe(1);
    expect(result.lastActiveDate).toBe(today);
  });

  it('keeps streak unchanged if user studies multiple times on the same day', () => {
    const today = '2026-11-16';
    const result = calculateStreakUpdate(today, 5, today);
    expect(result.streak).toBe(5);
    expect(result.lastActiveDate).toBe(today);
  });

  it('increments streak by 1 if user studies on the consecutive next day', () => {
    const yesterday = '2026-11-15';
    const today = '2026-11-16';
    const result = calculateStreakUpdate(yesterday, 3, today);
    expect(result.streak).toBe(4);
    expect(result.lastActiveDate).toBe(today);
  });

  it('resets streak to 1 if user missed one or more days', () => {
    const threeDaysAgo = '2026-11-13';
    const today = '2026-11-16';
    const result = calculateStreakUpdate(threeDaysAgo, 10, today);
    expect(result.streak).toBe(1);
    expect(result.lastActiveDate).toBe(today);
  });

  it('checks streak status correctly on application open', () => {
    const today = '2026-11-16';
    // Active today -> streak intact, completed today
    expect(getStreakStatus('2026-11-16', 4, today)).toEqual({
      activeStreak: 4,
      completedToday: true,
      isExpired: false,
    });

    // Active yesterday -> streak intact, but needs study today
    expect(getStreakStatus('2026-11-15', 4, today)).toEqual({
      activeStreak: 4,
      completedToday: false,
      isExpired: false,
    });

    // Active 2 days ago -> streak lapsed/expired to 0
    expect(getStreakStatus('2026-11-14', 4, today)).toEqual({
      activeStreak: 0,
      completedToday: false,
      isExpired: true,
    });
  });
});
