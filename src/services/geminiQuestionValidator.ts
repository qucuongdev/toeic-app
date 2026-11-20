import { Question } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  questions: Question[];
  error?: string;
}

/**
 * Validates and extracts structured questions from raw Gemini output string
 */
export function validateAndParseGeminiQuestions(rawOutput: string): ValidationResult {
  if (!rawOutput || typeof rawOutput !== 'string') {
    return {
      isValid: false,
      questions: [],
      error: 'Dữ liệu đầu vào rỗng hoặc không hợp lệ.'
    };
  }

  // 1. Try to extract JSON content if wrapped in markdown code fence
  let jsonString = rawOutput.trim();
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = jsonBlockRegex.exec(jsonString);

  if (match && match[1]) {
    jsonString = match[1].trim();
  } else {
    // If no markdown fence, locate the first '[' or '{' and last ']' or '}'
    const firstBracket = jsonString.indexOf('[');
    const lastBracket = jsonString.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      jsonString = jsonString.substring(firstBracket, lastBracket + 1);
    }
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    return {
      isValid: false,
      questions: [],
      error: 'Không thể trích xuất JSON hợp lệ từ phản hồi của Gemini.'
    };
  }

  const arrayData = Array.isArray(parsed) ? parsed : [parsed];
  const validQuestions: Question[] = [];

  for (let i = 0; i < arrayData.length; i++) {
    const item = arrayData[i] as Partial<Question>;

    if (!item || typeof item !== 'object') {
      return {
        isValid: false,
        questions: [],
        error: `Phần tử thứ ${i + 1} không phải là một đối tượng câu hỏi hợp lệ.`
      };
    }

    // Required fields: sentence, options (length >= 4), correctAnswer, explanation
    if (!item.sentence || typeof item.sentence !== 'string' || item.sentence.trim().length === 0) {
      return {
        isValid: false,
        questions: [],
        error: `Câu hỏi thứ ${i + 1} thiếu nội dung 'sentence'.`
      };
    }

    if (!Array.isArray(item.options) || item.options.length < 4) {
      return {
        isValid: false,
        questions: [],
        error: `Câu hỏi thứ ${i + 1} phải có đủ 4 phương án lựa chọn (A, B, C, D).`
      };
    }

    if (!item.correctAnswer || !['A', 'B', 'C', 'D'].includes(item.correctAnswer)) {
      return {
        isValid: false,
        questions: [],
        error: `Câu hỏi thứ ${i + 1} có đáp án đúng 'correctAnswer' không hợp lệ (phải là A, B, C hoặc D).`
      };
    }

    if (!item.explanation || typeof item.explanation !== 'object') {
      return {
        isValid: false,
        questions: [],
        error: `Câu hỏi thứ ${i + 1} thiếu bảng giải thích chi tiết 'explanation'.`
      };
    }

    const exp = item.explanation;
    if (!exp.translation || !exp.whyCorrect) {
      return {
        isValid: false,
        questions: [],
        error: `Câu hỏi thứ ${i + 1} giải thích phải có bản dịch và lý do đáp án đúng.`
      };
    }

    validQuestions.push({
      id: item.id || `q_gemini_${Date.now()}_${i}`,
      category: item.category || 'toeic-part5',
      clueGroup: item.clueGroup,
      clueWord: item.clueWord,
      sentence: item.sentence,
      options: item.options.map(opt => ({
        key: opt.key as 'A' | 'B' | 'C' | 'D',
        text: opt.text
      })),
      correctAnswer: item.correctAnswer as 'A' | 'B' | 'C' | 'D',
      cluePosition: item.cluePosition,
      explanation: {
        translation: exp.translation,
        keySignal: exp.keySignal || 'Dấu hiệu nhận biết ngữ pháp / từ vựng',
        whyCorrect: exp.whyCorrect,
        whyIncorrect: exp.whyIncorrect || {},
        fastTip: exp.fastTip || 'Mẹo nhớ nhanh'
      }
    });
  }

  if (validQuestions.length === 0) {
    return {
      isValid: false,
      questions: [],
      error: 'Không tìm thấy câu hỏi hợp lệ nào.'
    };
  }

  return {
    isValid: true,
    questions: validQuestions
  };
}
