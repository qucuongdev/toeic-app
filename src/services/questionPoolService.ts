import { Question } from '@/types';
import { SEED_12_TENSES_QUESTIONS, TenseId } from './tensesEngine';
import { SEED_QUESTIONS } from '@/data/seedQuestions';
import { CURATED_ETS_PART5_BANK } from '@/data/curatedToeicBank';
import { generateCombinatorialTenseQuestions, TenseFilter } from './combinatorialTenseGenerator';
import { generateCombinatorialCollocationQuestions } from './combinatorialCollocationGenerator';
import { 
  generateWordFamilyQuestions, 
  generateWordFormSentenceCompletionQuestions 
} from './wordFamilyEngine';
import { useHistoryStore } from '@/stores/useHistoryStore';

/**
 * Fisher-Yates array shuffling
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface QuizSessionOptions {
  category?: 'tense' | 'collocation' | 'word-form' | 'exam' | 'all-signals';
  targetTense?: TenseId | 'all' | string;
  count: number;
  excludeIds?: string[];
}

export interface QuizSession {
  id: string;
  category: string;
  targetFilter: string;
  totalQuestions: number;
  currentIndex: number;
  questions: Question[];
  answeredQuestions: Record<string, 'A' | 'B' | 'C' | 'D'>;
  isCompleted: boolean;
}

export interface QuestionResultDetail {
  question: Question;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

export interface QuizSessionResult {
  total: number;
  correctCount: number;
  incorrectCount: number;
  accuracyPercentage: number;
  badge: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Cần rèn thêm';
  feedback: string;
  details: QuestionResultDetail[];
}

/**
 * Creates a customized quiz session with the exact count requested (e.g. 5, 10, 15, 20, 25, 30...)
 * without repeating previously answered questions.
 */
export function createQuizSession(options: QuizSessionOptions): QuizSession {
  const { 
    category = 'tense', 
    targetTense = 'all', 
    count = 10, 
    excludeIds = [] 
  } = options;

  const globalAnswered = useHistoryStore ? useHistoryStore.getState().answeredIds : [];
  const excludeSet = new Set([...excludeIds, ...globalAnswered]);
  let pool: Question[] = [];

  if (category === 'tense') {
    // 1. Gather matching seed questions
    let matchingSeeds = SEED_12_TENSES_QUESTIONS;
    if (targetTense && targetTense !== 'all') {
      if (targetTense.startsWith('group-')) {
        const group = targetTense.replace('group-', '');
        matchingSeeds = SEED_12_TENSES_QUESTIONS.filter(q => q.clueGroup?.includes(group));
      } else {
        matchingSeeds = SEED_12_TENSES_QUESTIONS.filter(q => q.clueGroup === targetTense);
      }
    }

    const eligibleSeeds = matchingSeeds.filter(q => !excludeSet.has(q.id));
    pool.push(...eligibleSeeds);

    // 2. Synthesize combinatorial questions if more are needed
    if (pool.length < count) {
      const neededCount = count - pool.length;
      const combQuestions = generateCombinatorialTenseQuestions({
        count: neededCount,
        tenseId: targetTense as TenseFilter,
        excludeIds: Array.from(excludeSet).concat(pool.map(q => q.id))
      });
      pool.push(...combQuestions);
    }
  } else if (category === 'collocation') {
    // 1. Gather matching seed collocation questions
    let matchingSeeds = SEED_QUESTIONS.filter(q => q.category === 'collocation');
    if (targetTense && targetTense !== 'all') {
      matchingSeeds = matchingSeeds.filter(q => q.clueGroup === targetTense);
    }
    const eligibleSeeds = matchingSeeds.filter(q => !excludeSet.has(q.id));
    pool.push(...eligibleSeeds);

    // 2. Synthesize combinatorial collocation questions
    if (pool.length < count) {
      const neededCount = count - pool.length;
      const combQuestions = generateCombinatorialCollocationQuestions({
        count: neededCount,
        group: targetTense,
        excludeIds: Array.from(excludeSet).concat(pool.map(q => q.id))
      });
      pool.push(...combQuestions);
    }
  } else if (category === 'word-form') {
    // 1. Seed suffix questions
    const suffixSeeds = SEED_QUESTIONS.filter(q => q.category === 'word-form' && !excludeSet.has(q.id));
    pool.push(...suffixSeeds);

    // 2. Add word family questions (verb, noun, adj, adv)
    if (targetTense === 'find-verb') {
      pool.push(...generateWordFamilyQuestions('verb').filter(q => !excludeSet.has(q.id)));
    } else if (targetTense === 'find-noun') {
      pool.push(...generateWordFamilyQuestions('noun').filter(q => !excludeSet.has(q.id)));
    } else if (targetTense === 'find-adj') {
      pool.push(...generateWordFamilyQuestions('adjective').filter(q => !excludeSet.has(q.id)));
    } else if (targetTense === 'find-adv') {
      pool.push(...generateWordFamilyQuestions('adverb').filter(q => !excludeSet.has(q.id)));
    } else {
      // mix all 4 POS
      pool.push(
        ...generateWordFamilyQuestions('verb').filter(q => !excludeSet.has(q.id)),
        ...generateWordFamilyQuestions('noun').filter(q => !excludeSet.has(q.id)),
        ...generateWordFamilyQuestions('adjective').filter(q => !excludeSet.has(q.id)),
        ...generateWordFamilyQuestions('adverb').filter(q => !excludeSet.has(q.id))
      );
    }

    // 3. Synthesize sentence completion word form questions if more are needed
    if (pool.length < count) {
      const neededCount = count - pool.length;
      let targetPos: 'verb' | 'noun' | 'adjective' | 'adverb' | 'all' = 'all';
      if (targetTense === 'find-verb') targetPos = 'verb';
      else if (targetTense === 'find-noun') targetPos = 'noun';
      else if (targetTense === 'find-adj') targetPos = 'adjective';
      else if (targetTense === 'find-adv') targetPos = 'adverb';

      const completionQuestions = generateWordFormSentenceCompletionQuestions({
        count: neededCount,
        targetPos,
        excludeIds: Array.from(excludeSet).concat(pool.map(q => q.id))
      });
      pool.push(...completionQuestions);
    }
  } else if (category === 'all-signals') {
    // Combines Collocations + Word Forms
    let matchingSeeds = SEED_QUESTIONS;
    if (targetTense && targetTense !== 'all') {
      if (targetTense.startsWith('find-')) {
        const pos = targetTense.replace('find-', '') as 'verb' | 'noun' | 'adj' | 'adv';
        const posMap: Record<string, 'verb' | 'noun' | 'adjective' | 'adverb'> = {
          verb: 'verb',
          noun: 'noun',
          adj: 'adjective',
          adv: 'adverb'
        };
        matchingSeeds = generateWordFamilyQuestions(posMap[pos] || 'verb');
      } else {
        matchingSeeds = SEED_QUESTIONS.filter(q => q.clueGroup === targetTense);
      }
    }
    pool.push(...matchingSeeds.filter(q => !excludeSet.has(q.id)));

    if (pool.length < count) {
      const neededCount = count - pool.length;
      const extraCollocs = generateCombinatorialCollocationQuestions({
        count: neededCount,
        group: targetTense.startsWith('find-') ? 'all' : targetTense,
        excludeIds: Array.from(excludeSet).concat(pool.map(q => q.id))
      });
      pool.push(...extraCollocs);
    }
  } else if (category === 'exam') {
    // Balanced realistic ETS Part 5 distribution:
    // Curated ETS questions (Vocabulary/Conjunctions/Pronouns) + Tenses + Collocations + Word Forms
    const curatedPool = CURATED_ETS_PART5_BANK.filter(q => !excludeSet.has(q.id));
    const targetCuratedCount = Math.min(curatedPool.length, Math.max(1, Math.round(count * 0.25)));
    const selectedCurated = shuffleArray(curatedPool).slice(0, targetCuratedCount);

    const remainingCount = count - selectedCurated.length;
    const tenseCount = Math.max(1, Math.round(remainingCount * 0.4));
    const collocCount = Math.max(1, Math.round(remainingCount * 0.3));
    const wordFormCount = Math.max(1, remainingCount - tenseCount - collocCount);

    const tenses = generateCombinatorialTenseQuestions({
      count: tenseCount,
      tenseId: 'all',
      excludeIds: Array.from(excludeSet).concat(selectedCurated.map(q => q.id))
    });

    const collocs = generateCombinatorialCollocationQuestions({
      count: collocCount,
      group: 'all',
      excludeIds: Array.from(excludeSet).concat(selectedCurated.map(q => q.id), tenses.map(q => q.id))
    });

    const wordForms = generateWordFormSentenceCompletionQuestions({
      count: wordFormCount,
      targetPos: 'all',
      excludeIds: Array.from(excludeSet).concat(selectedCurated.map(q => q.id), tenses.map(q => q.id), collocs.map(q => q.id))
    });

    pool.push(...selectedCurated, ...tenses, ...collocs, ...wordForms);
  }

  // Shuffle and slice to the requested count
  const finalQuestions = shuffleArray(pool).slice(0, count);

  return {
    id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    category,
    targetFilter: targetTense,
    totalQuestions: finalQuestions.length,
    currentIndex: 0,
    questions: finalQuestions,
    answeredQuestions: {},
    isCompleted: false
  };
}

/**
 * Evaluates the completed quiz session and calculates performance metrics
 */
export function evaluateQuizSession(
  questions: Question[], 
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>
): QuizSessionResult {
  const total = questions.length;
  let correctCount = 0;

  const details: QuestionResultDetail[] = questions.map(q => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correctCount++;

    return {
      question: q,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect
    };
  });

  const incorrectCount = total - correctCount;
  const accuracyPercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  let badge: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Cần rèn thêm' = 'Cần rèn thêm';
  let feedback = 'Hãy ôn lại các dấu hiệu nhận biết then chốt và làm thêm một vòng luyện tập nhé!';

  if (accuracyPercentage >= 90) {
    badge = 'Xuất sắc';
    feedback = 'Tuyệt vời! Phản xạ ngữ pháp và dấu hiệu nhận biết của bạn đạt chuẩn thí sinh 900+ TOEIC!';
  } else if (accuracyPercentage >= 75) {
    badge = 'Giỏi';
    feedback = 'Rất tốt! Bạn nắm vững hầu hết các dạng câu hỏi và chỉ sai một số ít trường hợp nâng cao.';
  } else if (accuracyPercentage >= 50) {
    badge = 'Khá';
    feedback = 'Khá ổn! Hãy chú ý phân tích kỹ các phương án gây nhiễu để tránh bẫy đề thi.';
  }

  return {
    total,
    correctCount,
    incorrectCount,
    accuracyPercentage,
    badge,
    feedback,
    details
  };
}
