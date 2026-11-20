// Service: Word Form & Suffix Identification Engine

export type PartOfSpeech = 'noun' | 'adjective' | 'adverb' | 'verb';

const NOUN_SUFFIXES = [
  'tion', 'sion', 'ment', 'ness', 'ity', 'ty', 'ance', 'ence', 
  'ship', 'hood', 'dom', 'er', 'or', 'ist', 'ant', 'ent'
];

const ADJECTIVE_SUFFIXES = [
  'able', 'ible', 'ive', 'ous', 'ful', 'less', 'ic', 'al', 
  'ish', 'ant', 'ent', 'ary', 'ory'
];

const ADVERB_SUFFIXES = ['ly'];

const VERB_SUFFIXES = ['ize', 'ise', 'ate', 'ify', 'en'];

/**
 * Detects part of speech based on English suffix patterns
 */
export function detectSuffixType(word: string): PartOfSpeech | undefined {
  if (!word || typeof word !== 'string') return undefined;
  const clean = word.toLowerCase().trim();
  if (clean.length < 3) return undefined;

  // 1. Check Adverb (-ly)
  for (const suf of ADVERB_SUFFIXES) {
    if (clean.endsWith(suf) && clean.length > suf.length + 1) {
      return 'adverb';
    }
  }

  // 2. Check Noun suffixes
  for (const suf of NOUN_SUFFIXES) {
    if (clean.endsWith(suf) && clean.length > suf.length + 1) {
      return 'noun';
    }
  }

  // 3. Check Adjective suffixes
  for (const suf of ADJECTIVE_SUFFIXES) {
    if (clean.endsWith(suf) && clean.length > suf.length + 1) {
      return 'adjective';
    }
  }

  // 4. Check Verb suffixes
  for (const suf of VERB_SUFFIXES) {
    if (clean.endsWith(suf) && clean.length > suf.length + 1) {
      return 'verb';
    }
  }

  return undefined;
}

interface ContextClue {
  wordBefore?: string;
  wordAfter?: string;
}

const DETERMINERS = new Set(['a', 'an', 'the', 'this', 'that', 'these', 'those']);
const POSSESSIVES = new Set(['my', 'your', 'his', 'her', 'its', 'our', 'their']);
const AUXILIARIES = new Set(['has', 'have', 'had', 'is', 'are', 'was', 'were', 'will', 'would', 'can', 'could', 'should', 'must']);
const LINKING_VERBS = new Set(['remain', 'remains', 'remained', 'seem', 'seems', 'seemed', 'look', 'looks', 'looked', 'appear', 'become', 'becomes', 'became', 'be']);
const PUNCTUATION = new Set(['.', ',', ';', '!', '?', ')', ':']);

/**
 * Guess expected part of speech in a blank based on surrounding words
 */
export function guessExpectedPartOfSpeech(context: ContextClue): PartOfSpeech | undefined {
  const before = context.wordBefore?.toLowerCase().trim() || '';
  const after = context.wordAfter?.toLowerCase().trim() || '';

  const isAfterPunctuation = PUNCTUATION.has(after) || after === '';

  // Rule 1: Determiner/Possessive + [BLANK] + Noun -> ADJECTIVE
  // e.g. "a [_____] decision", "his [_____] performance"
  if ((DETERMINERS.has(before) || POSSESSIVES.has(before)) && !isAfterPunctuation) {
    return 'adjective';
  }

  // Rule 2: Auxiliary + [BLANK] + Main Verb -> ADVERB
  // e.g. "has [_____] completed", "will [_____] evaluate"
  if (AUXILIARIES.has(before) && !isAfterPunctuation) {
    return 'adverb';
  }

  // Rule 3: Linking Verb + [BLANK] -> ADJECTIVE
  // e.g. "remains [_____].", "seems [_____]"
  if (LINKING_VERBS.has(before)) {
    return 'adjective';
  }

  // Rule 4: Possessive / Preposition + [BLANK] + Punctuation -> NOUN
  // e.g. "their [_____].", "for [_____]."
  if (POSSESSIVES.has(before) && isAfterPunctuation) {
    return 'noun';
  }

  return undefined;
}

export interface WordFormRule {
  id: string;
  title: string;
  pattern: string;
  example: string;
  tip: string;
}

/**
 * Returns foundational TOEIC Part 5 position rules
 */
export function getWordFormRules(): WordFormRule[] {
  return [
    {
      id: 'rule-adj-before-noun',
      title: 'Tính từ đứng trước Danh từ',
      pattern: 'a / an / the / sở hữu + [ TÍNH TỪ ] + Danh từ',
      example: 'a [successful] candidate',
      tip: 'Nhìn trước thấy mạo từ/tính từ sở hữu, nhìn sau thấy danh từ -> 100% chọn Tính từ đuôi -ful, -ive, -able, -al.'
    },
    {
      id: 'rule-adv-between-verbs',
      title: 'Trạng từ xen giữa Cụm Động từ',
      pattern: 'Trợ động từ (has/will/is) + [ TRẠNG TỪ ] + Động từ chính',
      example: 'has [quickly] approved the budget',
      tip: 'Chỗ trống nằm kẹp giữa Trợ động từ và Động từ chính -> 100% chọn Trạng từ đuôi -ly.'
    },
    {
      id: 'rule-adj-after-linking',
      title: 'Tính từ sau Linking Verb',
      pattern: 'be / seem / remain / become / look + [ TÍNH TỪ ]',
      example: 'The documents remain [confidential].',
      tip: 'Sau động từ to be và các động từ nối (remain, seem, look...) ưu tiên chọn Tính từ mô tả trạng thái.'
    },
    {
      id: 'rule-noun-object',
      title: 'Danh từ làm Tân ngữ sau Giới từ/Tính từ sở hữu',
      pattern: 'Giới từ (in/on/with/for) / Tính từ sở hữu + [ DANH TỪ ]',
      example: 'responsible for the [management] of the team.',
      tip: 'Sau giới từ nếu không có danh từ phía sau, bắt buộc phải là Danh từ đuôi -tion, -ment, -ness, -ity.'
    }
  ];
}
