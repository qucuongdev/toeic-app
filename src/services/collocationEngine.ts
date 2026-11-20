import { Question, ClueGroup } from '@/types';

// Normalized collocation pairs database
const VALID_COLLOCATIONS: Record<string, Set<string>> = {
  // with
  with: new Set([
    'comply', 'collaborate', 'deal', 'provide', 'familiar', 
    'associated', 'consistent', 'agree', 'interact', 'equip',
    'compatible', 'consult', 'coincide', 'interfere'
  ]),
  // for
  for: new Set([
    'responsible', 'eligible', 'apply', 'substitute', 'account', 
    'wait', 'prepare', 'ask', 'qualify', 'compensate',
    'charge', 'noted', 'allow', 'opt', 'apologize'
  ]),
  // to
  to: new Set([
    'look forward', 'commit', 'lead', 'prior', 'adhere', 
    'dedicate', 'reply', 'respond', 'refer', 'relate',
    'subject', 'entitled', 'conform', 'contribute'
  ]),
  // in
  in: new Set([
    'invest', 'specialize', 'participate', 'succeed', 'result', 
    'interested', 'involve', 'engage', 'skilled', 'assist',
    'confide', 'persist'
  ]),
  // on
  on: new Set([
    'depend', 'rely', 'focus', 'concentrate', 'insist', 'based',
    'reflect', 'congratulate', 'comment'
  ]),
  // Paired conjunctions
  and: new Set(['between', 'both']),
  or: new Set(['either', 'whether']),
  nor: new Set(['neither']),
  'but also': new Set(['not only']),
};

export function filterQuestionsByClue(
  questions: Question[], 
  clueGroup: ClueGroup | 'all' | string
): Question[] {
  if (!clueGroup || clueGroup === 'all') {
    return questions;
  }
  return questions.filter(q => q.clueGroup === clueGroup);
}

export function validateCollocationPair(word: string, particle: string): boolean {
  const cleanWord = word.toLowerCase().trim();
  const cleanParticle = particle.toLowerCase().trim();

  // Check preposition-first index
  if (VALID_COLLOCATIONS[cleanParticle]?.has(cleanWord)) {
    return true;
  }

  // Check word-first search
  for (const [prep, words] of Object.entries(VALID_COLLOCATIONS)) {
    if (prep === cleanParticle && words.has(cleanWord)) {
      return true;
    }
  }

  return false;
}

export interface CollocationTip {
  phrase: string;
  meaning: string;
  example: string;
}

export function getCollocationClueTips(clueGroup: ClueGroup | string): CollocationTip[] {
  switch (clueGroup) {
    case 'with':
      return [
        { phrase: 'comply with', meaning: 'tuân thủ theo (quy định/luật lệ)', example: 'comply with safety guidelines' },
        { phrase: 'collaborate with', meaning: 'hợp tác với (ai/đơn vị nào)', example: 'collaborate with the engineering team' },
        { phrase: 'deal with', meaning: 'giải quyết, xử lý (vấn đề)', example: 'deal with customer complaints' },
        { phrase: 'provide [sb] with [sth]', meaning: 'cung cấp cho ai cái gì', example: 'provide employees with health insurance' },
        { phrase: 'familiar with', meaning: 'quen thuộc với điều gì', example: 'familiar with the latest software' },
        { phrase: 'consistent with', meaning: 'nhất quán, phù hợp với', example: 'consistent with our brand strategy' }
      ];
    case 'for':
      return [
        { phrase: 'responsible for', meaning: 'chịu trách nhiệm về việc gì', example: 'responsible for quality assurance' },
        { phrase: 'eligible for', meaning: 'đủ điều kiện hưởng cái gì', example: 'eligible for a promotion' },
        { phrase: 'apply for', meaning: 'nộp đơn ứng tuyển cho vị trí gì', example: 'apply for the managerial position' },
        { phrase: 'substitute for', meaning: 'thay thế cho ai/cái gì', example: 'substitute for the team leader' }
      ];
    case 'to':
      return [
        { phrase: 'look forward to (+ V-ing)', meaning: 'trông đợi, mong chờ điều gì', example: 'look forward to meeting you' },
        { phrase: 'adhere to', meaning: 'tuân thủ triệt để (quy chế)', example: 'adhere to company standards' },
        { phrase: 'prior to (+ Noun / V-ing)', meaning: 'trước khi diễn ra việc gì', example: 'prior to the grand opening' },
        { phrase: 'commit to (+ V-ing)', meaning: 'cam kết làm gì', example: 'commit to delivering on time' }
      ];
    case 'between-and':
      return [
        { phrase: 'between A and B', meaning: 'ở giữa / trong khoảng A và B', example: 'between 9 AM and 5 PM' }
      ];
    case 'either-or':
      return [
        { phrase: 'either A or B', meaning: 'hoặc A hoặc B', example: 'either by email or in person' }
      ];
    case 'neither-nor':
      return [
        { phrase: 'neither A nor B', meaning: 'cả A lẫn B đều không', example: 'neither the manager nor the director' }
      ];
    default:
      return [
        { phrase: 'comply with', meaning: 'tuân thủ quy định', example: 'must comply with rules' },
        { phrase: 'responsible for', meaning: 'chịu trách nhiệm', example: 'responsible for project' }
      ];
  }
}
