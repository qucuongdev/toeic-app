import { describe, it, expect, beforeEach } from 'vitest';
import { useHistoryStore } from '@/stores/useHistoryStore';

describe('useHistoryStore (Persistent Anti-Repetition Store)', () => {
  beforeEach(() => {
    useHistoryStore.getState().clearHistory();
  });

  it('initializes with empty history', () => {
    const state = useHistoryStore.getState();
    expect(state.answeredIds).toEqual([]);
    expect(state.getAnsweredCount()).toBe(0);
  });

  it('records answered question IDs without duplicates', () => {
    const store = useHistoryStore.getState();
    store.addAnsweredIds(['q1', 'q2', 'q3']);
    
    expect(useHistoryStore.getState().getAnsweredCount()).toBe(3);
    expect(useHistoryStore.getState().isAnswered('q2')).toBe(true);
    expect(useHistoryStore.getState().isAnswered('q99')).toBe(false);

    // Add overlapping
    store.addAnsweredIds(['q2', 'q4']);
    expect(useHistoryStore.getState().getAnsweredCount()).toBe(4);
    expect(useHistoryStore.getState().answeredIds).toEqual(['q1', 'q2', 'q3', 'q4']);
  });

  it('allows clearing history to restart full practice', () => {
    const store = useHistoryStore.getState();
    store.addAnsweredIds(['q1', 'q2']);
    expect(store.getAnsweredCount()).toBe(2);

    store.clearHistory();
    expect(useHistoryStore.getState().getAnsweredCount()).toBe(0);
  });
});
