import '@testing-library/jest-dom';

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
