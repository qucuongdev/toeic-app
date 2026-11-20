import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question } from '@/types';
import { validateAndParseGeminiQuestions } from './geminiQuestionValidator';

export interface GenerateOptions {
  apiKey: string;
  category: string; // 'with' | 'for' | 'word-form' | 'tense' | 'toeic-part5'
  count: number;
  modelName?: string;
}

/**
 * Generates structured TOEIC / Grammar Clue questions using Gemini API
 */
export async function generateQuestionsWithGemini(options: GenerateOptions): Promise<Question[]> {
  const { apiKey, category, count, modelName = 'gemini-2.5-flash' } = options;

  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error('Vui lòng nhập Gemini API Key của bạn trước khi sinh đề.');
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim());
  const model = genAI.getGenerativeModel({
    model: modelName,
  });

  const prompt = `
Bạn là chuyên gia khảo thí đề thi tiếng Anh TOEIC chuẩn ETS quốc tế.
Hãy sinh ${count} câu hỏi trắc nghiệm tiếng Anh Part 5 chất lượng cao về chủ đề: "${category}".

YÊU CẦU BẮT BUỘC:
1. Câu hỏi phải tự nhiên, mang ngữ cảnh kinh doanh, công sở (Business English) chuẩn đề thi TOEIC.
2. Đúng 4 phương án lựa chọn A, B, C, D.
3. BẢNG GIẢI THÍCH PHẢI ĐẦY ĐỦ 100%:
   - translation: Bản dịch tiếng Việt sát nghĩa trọn vẹn của cả câu.
   - keySignal: Chỉ ra chính xác dấu hiệu nhận biết (từ khóa manh mối hoặc vị trí từ loại trong câu).
   - whyCorrect: Phân tích ngữ pháp / cấu trúc cụm từ vì sao đáp án này ĐÚNG.
   - whyIncorrect: Phân tích chi tiết phương pháp loại trừ vì sao TẤT CẢ các đáp án còn lại SAI (chỉ rõ vì sao A/B/C/D sai).
   - fastTip: Mẹo ghi nhớ siêu tốc trong 5 giây cho người học.

ĐỊNH DẠNG TRẢ VỀ:
CHỈ trả về MẢNG JSON thuần túy (Array of objects), KHÔNG thêm bất kỳ lời dẫn giải nào ngoài JSON:
[
  {
    "id": "q_ai_1",
    "category": "${category.includes('with') || category.includes('for') ? 'collocation' : 'word-form'}",
    "clueGroup": "${category}",
    "clueWord": "${category.includes('with') ? 'with' : category.includes('for') ? 'for' : ''}",
    "sentence": "The committee must comply _____ environmental regulations.",
    "options": [
      { "key": "A", "text": "with" },
      { "key": "B", "text": "to" },
      { "key": "C", "text": "for" },
      { "key": "D", "text": "in" }
    ],
    "correctAnswer": "A",
    "explanation": {
      "translation": "Ủy ban phải tuân thủ các quy định về môi trường.",
      "keySignal": "Chỗ trống đứng sau động từ 'comply'",
      "whyCorrect": "Động từ 'comply' luôn đi cùng giới từ 'with' (comply with = tuân thủ theo).",
      "whyIncorrect": {
        "B": "'to' thường đi với adhere (adhere to), không đi với comply.",
        "C": "'for' không kết hợp với comply.",
        "D": "'in' không kết hợp với comply."
      },
      "fastTip": "Gặp 'comply' -> phản xạ ngay 'with'!"
    }
  }
]
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const validation = validateAndParseGeminiQuestions(responseText);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Dữ liệu trả về từ Gemini không đúng định dạng mong đợi.');
    }

    return validation.questions;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('API_KEY_INVALID') || message.includes('API key not valid')) {
      throw new Error('Gemini API Key không hợp lệ. Vui lòng kiểm tra lại key của bạn.');
    }
    throw new Error(`Lỗi khi gọi Gemini: ${message}`);
  }
}
