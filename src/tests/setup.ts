import '@testing-library/jest-dom';

// Comprehensive mock for localStorage and sessionStorage in Node/jsdom
const createStorageMock = (): Storage => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = String(value);
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key: (index: number): string | null => Object.keys(store)[index] ?? null,
  };
};

const defaultLocalStorage = createStorageMock();
const defaultSessionStorage = createStorageMock();

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: defaultLocalStorage,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, 'sessionStorage', {
    value: defaultSessionStorage,
    writable: true,
    configurable: true,
  });
}

if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: defaultLocalStorage,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: defaultSessionStorage,
    writable: true,
    configurable: true,
  });
}

// Mock Web Speech API SpeechSynthesis if not available in jsdom
if (typeof window !== 'undefined') {
  if (!window.speechSynthesis) {
    window.speechSynthesis = {
      speak: () => {},
      cancel: () => {},
      pause: () => {},
      resume: () => {},
      getVoices: () => [],
      onvoiceschanged: null,
      paused: false,
      pending: false,
      speaking: false,
    } as unknown as SpeechSynthesis;
  }
}

