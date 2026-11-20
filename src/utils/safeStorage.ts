import { Question, Flashcard } from '@/types';

function getStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      return localStorage;
    }
  } catch {
    // blocked or unavailable
  }
  return null;
}

/**
 * Safely retrieves and parses an item from localStorage with error boundary and schema validation.
 */
export function safeGetItem<T>(
  key: string,
  fallback: T,
  validator?: (val: unknown) => val is T
): T {
  try {
    const storage = getStorage();
    if (!storage) {
      return fallback;
    }

    const raw = storage.getItem(key);
    if (raw === null || raw === undefined) {
      return fallback;
    }

    const parsed = JSON.parse(raw);

    if (validator) {
      return validator(parsed) ? (parsed as T) : fallback;
    }

    return parsed as T;
  } catch {
    // Catches JSON.parse errors, SecurityError from localStorage, private browsing issues
    return fallback;
  }
}

/**
 * Safely saves an item to localStorage handling QuotaExceededError or SecurityError.
 */
export function safeSetItem(key: string, value: unknown): boolean {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    const serialized = JSON.stringify(value);
    storage.setItem(key, serialized);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely removes an item from localStorage.
 */
export function safeRemoveItem(key: string): boolean {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Type guard for validating Question arrays loaded from untrusted storage.
 */
export function isQuestionArray(val: unknown): val is Question[] {
  if (!Array.isArray(val)) return false;
  return val.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const q = item as Partial<Question>;
    return (
      typeof q.id === 'string' &&
      typeof q.sentence === 'string' &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correctAnswer === 'string' &&
      q.explanation &&
      typeof q.explanation.whyCorrect === 'string'
    );
  });
}

/**
 * Type guard for validating Flashcard arrays loaded from untrusted storage.
 */
export function isFlashcardArray(val: unknown): val is Flashcard[] {
  if (!Array.isArray(val)) return false;
  return val.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const f = item as Partial<Flashcard>;
    return (
      typeof f.id === 'string' &&
      typeof f.word === 'string' &&
      typeof f.definitionVi === 'string' &&
      typeof f.boxLevel === 'number'
    );
  });
}
