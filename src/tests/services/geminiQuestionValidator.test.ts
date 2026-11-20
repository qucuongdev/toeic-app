import { describe, it, expect } from 'vitest';
import { validateAndParseGeminiQuestions } from '@/services/geminiQuestionValidator';

describe('GeminiQuestionValidator Service (TDD)', () => {
  it('successfully parses valid JSON response from Gemini', () => {
    const validJson = JSON.stringify([
      {
        id: 'q_ai_01',
        category: 'collocation',
        clueGroup: 'with',
        clueWord: 'with',
        sentence: 'We must comply _____ industry standards.',
        options: [
          { key: 'A', text: 'with' },
          { key: 'B', text: 'to' },
          { key: 'C', text: 'for' },
          { key: 'D', text: 'by' }
        ],
        correctAnswer: 'A',
        explanation: {
          translation: 'Chúng ta phải tuân thủ các tiêu chuẩn ngành.',
          keySignal: 'comply đi với with',
          whyCorrect: 'comply with là cụm cố định',
          whyIncorrect: {
            B: 'to không đi với comply',
            C: 'for không đi với comply',
            D: 'by không đi với comply'
          },
          fastTip: 'comply with = tuân thủ'
        }
      }
    ]);

    const result = validateAndParseGeminiQuestions(validJson);
    expect(result.isValid).toBe(true);
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].correctAnswer).toBe('A');
  });

  it('extracts JSON even if Gemini wraps it in markdown code fences ```json ... ```', () => {
    const wrappedJson = `
    Here are the generated questions:
    \`\`\`json
    [
      {
        "id": "q_ai_02",
        "category": "word-form",
        "sentence": "She made a _____ decision.",
        "options": [
          { "key": "A", "text": "quick" },
          { "key": "B", "text": "quickly" },
          { "key": "C", "text": "quicken" },
          { "key": "D", "text": "quickness" }
        ],
        "correctAnswer": "A",
        "explanation": {
          "translation": "Cô ấy đã đưa ra một quyết định nhanh chóng.",
          "keySignal": "a + [Adj] + decision (Noun)",
          "whyCorrect": "Cần tính từ bổ nghĩa cho danh từ decision",
          "whyIncorrect": {
            "B": "quickly là trạng từ",
            "C": "quicken là động từ",
            "D": "quickness là danh từ"
          },
          "fastTip": "Trước danh từ là tính từ"
        }
      }
    ]
    \`\`\`
    Hope this helps!
    `;

    const result = validateAndParseGeminiQuestions(wrappedJson);
    expect(result.isValid).toBe(true);
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].options).toHaveLength(4);
  });

  it('rejects invalid or missing required fields', () => {
    const invalidJson = JSON.stringify([
      {
        // missing sentence & explanation
        id: 'bad_q',
        options: [{ key: 'A', text: 'hi' }]
      }
    ]);

    const result = validateAndParseGeminiQuestions(invalidJson);
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.questions).toHaveLength(0);
  });

  it('rejects malformed non-JSON strings', () => {
    const malformed = "I'm sorry, I cannot generate questions.";
    const result = validateAndParseGeminiQuestions(malformed);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Không thể trích xuất JSON');
  });
});
