import { DictationResult } from '@/types';

/**
 * Strips punctuation and trims lowercase words
 */
function cleanWord(str: string): string {
  return str.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '').trim();
}

/**
 * Tokenizes text into individual clean words
 */
function tokenizeWords(text: string): string[] {
  if (!text) return [];
  return text.trim().split(/\s+/).filter(w => w.length > 0);
}

/**
 * Compares user transcribed speech against authentic target transcript
 */
export function evaluateDictation(userInput: string, targetTranscript: string): DictationResult {
  const targetWords = tokenizeWords(targetTranscript);
  const userWords = tokenizeWords(userInput);

  if (targetWords.length === 0) {
    return {
      accuracyPercentage: 0,
      isExactMatch: false,
      userTokens: [],
      correctWordCount: 0,
      totalWordCount: 0,
    };
  }

  if (userWords.length === 0) {
    return {
      accuracyPercentage: 0,
      isExactMatch: false,
      userTokens: targetWords.map(w => ({ text: w, status: 'missing' })),
      correctWordCount: 0,
      totalWordCount: targetWords.length,
    };
  }

  const userTokens: { text: string; status: 'correct' | 'incorrect' | 'missing' }[] = [];
  let correctCount = 0;

  const maxLen = Math.max(targetWords.length, userWords.length);

  for (let i = 0; i < maxLen; i++) {
    const targetWord = targetWords[i];
    const userWord = userWords[i];

    if (userWord && targetWord) {
      const isMatch = cleanWord(userWord) === cleanWord(targetWord);
      if (isMatch) {
        userTokens.push({ text: userWord, status: 'correct' });
        correctCount++;
      } else {
        userTokens.push({ text: userWord, status: 'incorrect' });
      }
    } else if (userWord && !targetWord) {
      // User typed extra word
      userTokens.push({ text: userWord, status: 'incorrect' });
    } else if (!userWord && targetWord) {
      // User missed word
      userTokens.push({ text: targetWord, status: 'missing' });
    }
  }

  const accuracy = Math.round((correctCount / targetWords.length) * 100);
  const isExact = accuracy === 100 && userWords.length === targetWords.length;

  return {
    accuracyPercentage: accuracy,
    isExactMatch: isExact,
    userTokens,
    correctWordCount: correctCount,
    totalWordCount: targetWords.length,
  };
}
