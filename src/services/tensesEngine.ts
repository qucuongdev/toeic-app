import { Question } from '@/types';

export type TenseId = 
  | 'present-simple' 
  | 'present-continuous' 
  | 'present-perfect' 
  | 'present-perfect-continuous'
  | 'past-simple' 
  | 'past-continuous' 
  | 'past-perfect' 
  | 'past-perfect-continuous'
  | 'future-simple' 
  | 'future-continuous' 
  | 'future-perfect' 
  | 'future-perfect-continuous';

export interface TenseMetadata {
  id: TenseId;
  nameVi: string;
  nameEn: string;
  group: 'present' | 'past' | 'future';
  formula: string;
  signalWords: string[];
  example: string;
  fastTip: string;
}

export const ALL_12_TENSES_METADATA: TenseMetadata[] = [
  // --- NHÓM HIỆN TẠI (PRESENT) ---
  {
    id: 'present-simple',
    nameVi: 'Hiện tại đơn',
    nameEn: 'Present Simple',
    group: 'present',
    formula: 'S + V(s/es) / S + do/does not + V_inf',
    signalWords: ['always', 'usually', 'often', 'every day', 'every quarter', 'regularly', 'seldom', 'rarely'],
    example: 'The board meets every Monday morning.',
    fastTip: 'Thấy thói quen, lịch trình cố định, hoặc every/always -> Chọn Hiện tại đơn!'
  },
  {
    id: 'present-continuous',
    nameVi: 'Hiện tại tiếp diễn',
    nameEn: 'Present Continuous',
    group: 'present',
    formula: 'S + is/are/am + V-ing',
    signalWords: ['now', 'right now', 'at the moment', 'currently', 'at present', 'Look!', 'Listen!'],
    example: 'Our IT specialists are currently upgrading the network security.',
    fastTip: 'Thấy "currently", "at the moment", "now" -> 100% chọn [ is/are/am + V-ing ]!'
  },
  {
    id: 'present-perfect',
    nameVi: 'Hiện tại hoàn thành',
    nameEn: 'Present Perfect',
    group: 'present',
    formula: 'S + have/has + V3/ed',
    signalWords: ['since', 'for', 'already', 'yet', 'recently', 'lately', 'so far', 'just', 'ever', 'never'],
    example: 'The company has expanded its operations since 2021.',
    fastTip: 'Gặp "since + mốc", "for + khoảng", "recently", "already" -> Phản xạ ngay [ have/has + V3/ed ]!'
  },
  {
    id: 'present-perfect-continuous',
    nameVi: 'Hiện tại hoàn thành tiếp diễn',
    nameEn: 'Present Perfect Continuous',
    group: 'present',
    formula: 'S + have/has been + V-ing',
    signalWords: ['all day', 'all morning', 'how long', 'since', 'for'],
    example: 'She has been negotiating the contract all morning.',
    fastTip: 'Nhấn mạnh tính liên tục không ngừng từ quá khứ đến hiện tại ("all day", "all week") -> have/has been V-ing!'
  },

  // --- NHÓM QUÁ KHỨ (PAST) ---
  {
    id: 'past-simple',
    nameVi: 'Quá khứ đơn',
    nameEn: 'Past Simple',
    group: 'past',
    formula: 'S + V2/ed / S + did not + V_inf',
    signalWords: ['yesterday', 'ago', 'last week', 'last year', 'in 2020', 'previously'],
    example: 'The firm signed the merger agreement yesterday.',
    fastTip: 'Thấy "yesterday", "ago", "last...", "in + năm quá khứ" -> Chọn ngay V2/ed!'
  },
  {
    id: 'past-continuous',
    nameVi: 'Quá khứ tiếp diễn',
    nameEn: 'Past Continuous',
    group: 'past',
    formula: 'S + was/were + V-ing',
    signalWords: ['at 8 PM yesterday', 'at this time last year', 'when', 'while'],
    example: 'The technicians were repairing the server when the power went out.',
    fastTip: 'Có giờ cụ thể trong quá khứ ("at 9 AM yesterday") hoặc "when/while" một việc đang xảy ra thì việc khác xen vào!'
  },
  {
    id: 'past-perfect',
    nameVi: 'Quá khứ hoàn thành',
    nameEn: 'Past Perfect',
    group: 'past',
    formula: 'S + had + V3/ed',
    signalWords: ['by the time', 'before', 'after', 'by 2022', 'prior to'],
    example: 'By the time the manager arrived, the team had already finalized the report.',
    fastTip: 'Xảy ra TRƯỚC một hành động khác trong quá khứ ("by the time + Quá khứ đơn" -> vế kia là had + V3/ed)!'
  },
  {
    id: 'past-perfect-continuous',
    nameVi: 'Quá khứ hoàn thành tiếp diễn',
    nameEn: 'Past Perfect Continuous',
    group: 'past',
    formula: 'S + had been + V-ing',
    signalWords: ['had been V-ing for ... before ...', 'until then'],
    example: 'He had been working at the agency for ten years before he retired.',
    fastTip: 'Hành động kéo dài liên tục trước một mốc trong quá khứ!'
  },

  // --- NHÓM TƯƠNG LAI (FUTURE) ---
  {
    id: 'future-simple',
    nameVi: 'Tương lai đơn',
    nameEn: 'Future Simple',
    group: 'future',
    formula: 'S + will + V_inf',
    signalWords: ['tomorrow', 'next week', 'soon', 'in the future', 'probably', 'hope that', 'predict'],
    example: 'The CEO will announce the restructuring plan tomorrow.',
    fastTip: 'Thấy "tomorrow", "next week", "soon" -> Chọn [ will + V nguyên mẫu ]!'
  },
  {
    id: 'future-continuous',
    nameVi: 'Tương lai tiếp diễn',
    nameEn: 'Future Continuous',
    group: 'future',
    formula: 'S + will be + V-ing',
    signalWords: ['at 10 AM tomorrow', 'at this time next week', 'during next month'],
    example: 'The delegates will be attending the global summit at this time tomorrow.',
    fastTip: 'Thời điểm cụ thể trong tương lai ("at this time next month") -> [ will be + V-ing ]!'
  },
  {
    id: 'future-perfect',
    nameVi: 'Tương lai hoàn thành',
    nameEn: 'Future Perfect',
    group: 'future',
    formula: 'S + will have + V3/ed',
    signalWords: ['by tomorrow', 'by the end of this month', 'by next year', 'by the time + Hiện tại đơn'],
    example: 'By the end of next month, we will have completed the new facility.',
    fastTip: 'Gặp "BY / BEFORE + mốc tương lai" -> 100% chọn [ will have + V3/ed ] (Bí kíp Part 5 TOEIC)!'
  },
  {
    id: 'future-perfect-continuous',
    nameVi: 'Tương lai hoàn thành tiếp diễn',
    nameEn: 'Future Perfect Continuous',
    group: 'future',
    formula: 'S + will have been + V-ing',
    signalWords: ['by next year ... for ... years', 'by the time ... for ...'],
    example: 'By next December, Dr. Adams will have been teaching here for 25 years.',
    fastTip: 'Nhấn mạnh khoảng thời gian kéo dài đến một mốc tương lai ("by next year ... for 10 years")!'
  }
];

export function getAll12TensesCheatSheet(): TenseMetadata[] {
  return ALL_12_TENSES_METADATA;
}

export const SEED_12_TENSES_QUESTIONS: Question[] = [
  // 1. Present Simple - Câu 1
  {
    id: 'q_tense_pres_simple',
    category: 'tense',
    clueGroup: 'present-simple' as any,
    clueWord: 'every',
    sentence: 'The supervisory committee _____ financial statements every quarter to guarantee transparency.',
    options: [
      { key: 'A', text: 'reviews' },
      { key: 'B', text: 'is reviewing' },
      { key: 'C', text: 'reviewed' },
      { key: 'D', text: 'has reviewed' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Ban giám sát đánh giá các báo cáo tài chính vào mỗi quý để đảm bảo tính minh bạch.',
      keySignal: 'Dấu hiệu nhận biết: cụm từ chỉ tần suất lặp lại "every quarter" (mỗi quý).',
      whyCorrect: 'Chủ ngữ "The supervisory committee" là danh từ số ít, kết hợp với dấu hiệu "every quarter" diễn tả hành động định kỳ lặp lại nên động từ chia ở Hiện tại đơn thêm "s": "reviews".',
      whyIncorrect: {
        B: '"is reviewing" là Hiện tại tiếp diễn, chỉ hành động đang diễn ra tại thời điểm nói.',
        C: '"reviewed" là Quá khứ đơn, chỉ hành động đã kết thúc trong quá khứ.',
        D: '"has reviewed" là Hiện tại hoàn thành, không dùng cho thói quen định kỳ lặp lại.'
      },
      fastTip: 'Thấy "every day / week / quarter" -> Phản xạ chia Hiện tại đơn S + V(s/es)!'
    }
  },
  // 1. Present Simple - Câu 2 (Phủ định)
  {
    id: 'q_tense_pres_simple_2',
    category: 'tense',
    clueGroup: 'present-simple' as any,
    clueWord: 'rarely',
    sentence: 'The regional manager rarely _____ the factory floor without giving prior notification.',
    options: [
      { key: 'A', text: 'visit' },
      { key: 'B', text: 'visits' },
      { key: 'C', text: 'visiting' },
      { key: 'D', text: 'visited' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Giám đốc khu vực hiếm khi đến thăm khu xưởng sản xuất mà không có thông báo trước.',
      keySignal: 'Trạng từ chỉ tần suất "rarely" (hiếm khi) diễn tả thói quen lặp lại.',
      whyCorrect: 'Chủ ngữ số ít "The regional manager" đi với động từ chia thì Hiện tại đơn thêm "s": "visits".',
      whyIncorrect: {
        A: '"visit" là động từ nguyên mẫu (dành cho chủ ngữ số nhiều).',
        C: '"visiting" thiếu trợ động từ to be.',
        D: '"visited" là quá khứ đơn, không phù hợp với thói quen "rarely".'
      },
      fastTip: 'Chủ ngữ số ít + rarely / usually -> Động từ thêm S/ES!'
    }
  },

  // 2. Present Continuous
  {
    id: 'q_tense_pres_cont',
    category: 'tense',
    clueGroup: 'present-continuous' as any,
    clueWord: 'currently',
    sentence: 'Our software engineering division _____ a state-of-the-art mobile application for overseas clients currently.',
    options: [
      { key: 'A', text: 'develops' },
      { key: 'B', text: 'is developing' },
      { key: 'C', text: 'developed' },
      { key: 'D', text: 'will develop' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Bộ phận kỹ thuật phần mềm của chúng tôi hiện đang phát triển một ứng dụng di động tối tân cho các khách hàng nước ngoài.',
      keySignal: 'Dấu hiệu nhận biết then chốt: trạng từ "currently" (hiện tại / đang).',
      whyCorrect: 'Với dấu hiệu "currently" diễn tả một hành động đang tiến hành ở thời điểm hiện tại, động từ phải chia ở thì Hiện tại tiếp diễn: [ is/are + V-ing ] -> "is developing".',
      whyIncorrect: {
        A: '"develops" là Hiện tại đơn, diễn tả quy luật hoặc chân lý.',
        C: '"developed" là Quá khứ đơn, diễn tả sự việc đã xong trong quá khứ.',
        D: '"will develop" là Tương lai đơn, diễn tả hành động chưa xảy ra.'
      },
      fastTip: 'Thấy "currently", "at present", "now" -> Chọn ngay [ is/are + V-ing ]!'
    }
  },

  // 3. Present Perfect - Câu 1 (since)
  {
    id: 'q_tense_pres_perf',
    category: 'tense',
    clueGroup: 'present-perfect' as any,
    clueWord: 'since',
    sentence: 'Mr. Henderson _____ as the chief financial officer of the corporation since January 2021.',
    options: [
      { key: 'A', text: 'served' },
      { key: 'B', text: 'is serving' },
      { key: 'C', text: 'has served' },
      { key: 'D', text: 'will serve' }
    ],
    correctAnswer: 'C',
    explanation: {
      translation: 'Ông Henderson đã phục vụ với tư cách là giám đốc tài chính của tập đoàn kể từ tháng 1 năm 2021.',
      keySignal: 'Dấu hiệu nhận biết kinh điển: "since + mốc thời gian" (since January 2021).',
      whyCorrect: 'Hành động bắt đầu từ quá khứ (tháng 1 năm 2021) và vẫn còn tiếp diễn ở hiện tại có dấu hiệu "since" bắt buộc chia ở thì Hiện tại hoàn thành: [ have/has + V3/ed ] -> "has served".',
      whyIncorrect: {
        A: '"served" là Quá khứ đơn, chỉ đi với "in January 2021" chứ không đi với "since".',
        B: '"is serving" là Hiện tại tiếp diễn, không dùng với liên từ "since".',
        D: '"will serve" là Tương lai, mâu thuẫn với mốc thời gian 2021.'
      },
      fastTip: 'Thấy "since + mốc thời gian" -> 100% chọn [ have/has + V3/ed ]!'
    }
  },
  // 3. Present Perfect - Câu 2 (already / yet)
  {
    id: 'q_tense_pres_perf_2',
    category: 'tense',
    clueGroup: 'present-perfect' as any,
    clueWord: 'already',
    sentence: 'The accounting team has _____ processed the travel reimbursement requests submitted last Friday.',
    options: [
      { key: 'A', text: 'already' },
      { key: 'B', text: 'yet' },
      { key: 'C', text: 'still' },
      { key: 'D', text: 'never' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Phòng kế toán đã xử lý xong các yêu cầu hoàn trả chi phí công tác được nộp vào thứ Sáu tuần trước.',
      keySignal: 'Vị trí kẹp giữa "has" và V3/ed "processed" trong câu khẳng định.',
      whyCorrect: '"already" đứng giữa trợ động từ has/have và V3/ed trong câu khẳng định của thì Hiện tại hoàn thành để nhấn mạnh hành động đã hoàn tất.',
      whyIncorrect: {
        B: '"yet" chỉ đứng cuối câu phủ định hoặc nghi vấn (haven\'t processed yet).',
        C: '"still" thường đứng trước trợ động từ (still haven\'t processed).',
        D: '"never" mang nghĩa phủ định (chưa từng), trái ngược hoàn toàn ngữ cảnh công sở.'
      },
      fastTip: 'Đứng giữa has/have và V3/ed câu khẳng định -> Chọn ngay ALREADY!'
    }
  },

  // 4. Present Perfect Continuous
  {
    id: 'q_tense_pres_perf_cont',
    category: 'tense',
    clueGroup: 'present-perfect-continuous' as any,
    clueWord: 'all morning',
    sentence: 'The legal department _____ the merger agreement all morning without taking any breaks.',
    options: [
      { key: 'A', text: 'has been reviewing' },
      { key: 'B', text: 'reviews' },
      { key: 'C', text: 'reviewed' },
      { key: 'D', text: 'will review' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Phòng pháp chế đã liên tục xem xét thỏa thuận sáp nhập suốt cả buổi sáng mà không hề nghỉ ngơi.',
      keySignal: 'Dấu hiệu: "all morning" (suốt cả buổi sáng) kết hợp cụm "without taking any breaks".',
      whyCorrect: 'Nhấn mạnh sự liên tục, không ngắt quãng của một hành vi kéo dài từ quá khứ tới hiện tại -> chia Hiện tại hoàn thành tiếp diễn: [ has been + V-ing ].',
      whyIncorrect: {
        B: '"reviews" chỉ là thói quen chung chung.',
        C: '"reviewed" không nhấn mạnh tính kéo dài liên tục tới hiện tại.',
        D: '"will review" là tương lai.'
      },
      fastTip: '"all morning / all day" nhấn mạnh tính liên tục -> Chọn [ have/has been V-ing ]!'
    }
  },

  // 5. Past Simple
  {
    id: 'q_tense_past_simple',
    category: 'tense',
    clueGroup: 'past-simple' as any,
    clueWord: 'yesterday',
    sentence: 'The vendor _____ the shipment of office furniture yesterday afternoon as scheduled.',
    options: [
      { key: 'A', text: 'delivers' },
      { key: 'B', text: 'delivered' },
      { key: 'C', text: 'is delivering' },
      { key: 'D', text: 'has delivered' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Nhà cung cấp đã giao chuyến hàng nội thất văn phòng vào chiều hôm qua đúng như kế hoạch.',
      keySignal: 'Dấu hiệu xác định rõ thời điểm quá khứ: "yesterday afternoon".',
      whyCorrect: 'Có trạng từ chỉ thời gian quá khứ rõ ràng ("yesterday") nên động từ chia ở Quá khứ đơn V2/ed: "delivered".',
      whyIncorrect: {
        A: '"delivers" là thì hiện tại.',
        C: '"is delivering" là tiếp diễn hiện tại.',
        D: '"has delivered" là Hiện tại hoàn thành, tối kỵ đi kèm mốc thời gian quá khứ xác định như "yesterday".'
      },
      fastTip: 'Có "yesterday, ago, last..." -> Tuyệt đối không chọn have/has, chọn ngay V2/ed!'
    }
  },

  // 6. Past Continuous
  {
    id: 'q_tense_past_cont',
    category: 'tense',
    clueGroup: 'past-continuous' as any,
    clueWord: 'when',
    sentence: 'The technicians _____ the database servers when the unexpected power outage occurred.',
    options: [
      { key: 'A', text: 'were updating' },
      { key: 'B', text: 'are updating' },
      { key: 'C', text: 'updated' },
      { key: 'D', text: 'update' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Các kỹ thuật viên đang cập nhật máy chủ cơ sở dữ liệu thì sự cố mất điện bất ngờ xảy ra.',
      keySignal: 'Cấu trúc phối hợp thì: [ Quá khứ tiếp diễn (were updating) + WHEN + Quá khứ đơn (occurred) ].',
      whyCorrect: 'Diễn tả một hành động đang diễn ra trong quá khứ thì một hành động ngắn khác xen vào (sự cố mất điện xảy ra). Chủ ngữ số nhiều "The technicians" đi với "were updating".',
      whyIncorrect: {
        B: '"are updating" là hiện tại, lệch thì với "occurred".',
        C: '"updated" không diễn tả được tính chất đang diễn ra khi sự cố ập đến.',
        D: '"update" là hiện tại đơn.'
      },
      fastTip: 'Hành động đang diễn ra trong quá khứ bị ngắt quãng bởi "when" -> Dùng was/were + V-ing!'
    }
  },

  // 7. Past Perfect
  {
    id: 'q_tense_past_perf',
    category: 'tense',
    clueGroup: 'past-perfect' as any,
    clueWord: 'by the time',
    sentence: 'By the time the board members convened, the auditor _____ already uncovered the accounting discrepancy.',
    options: [
      { key: 'A', text: 'had' },
      { key: 'B', text: 'has' },
      { key: 'C', text: 'is' },
      { key: 'D', text: 'will have' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Vào thời điểm các thành viên hội đồng quản trị triệu tập, kiểm toán viên đã phát hiện ra sự sai lệch sổ sách.',
      keySignal: 'Cấu trúc vàng TOEIC: [ By the time + S + V2/ed (convened), S + HAD + V3/ed (already uncovered) ].',
      whyCorrect: 'Hành động kiểm toán viên phát hiện sai lệch xảy ra trước hành động hội đồng quản trị họp (cả hai đều trong quá khứ), do đó hành động xảy ra trước phải dùng Quá khứ hoàn thành: "had already uncovered".',
      whyIncorrect: {
        B: '"has" là hiện tại hoàn thành, lệch thì với quá khứ "convened".',
        C: '"is" không ghép thành cấu trúc hoàn thành.',
        D: '"will have" chỉ dùng khi mệnh đề by the time ở Hiện tại đơn.'
      },
      fastTip: '"By the time + Quá khứ đơn" -> Vế sau 100% chọn HAD + V3/ed!'
    }
  },

  // 8. Past Perfect Continuous
  {
    id: 'q_tense_past_perf_cont',
    category: 'tense',
    clueGroup: 'past-perfect-continuous' as any,
    clueWord: 'before',
    sentence: 'Mr. Zhang _____ the regional branch for seven years before he decided to launch his own enterprise.',
    options: [
      { key: 'A', text: 'had been managing' },
      { key: 'B', text: 'has managed' },
      { key: 'C', text: 'manages' },
      { key: 'D', text: 'is managing' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Ông Zhang đã liên tục điều hành chi nhánh khu vực trong suốt 7 năm trước khi ông quyết định mở doanh nghiệp riêng.',
      keySignal: 'Dấu hiệu: "for seven years" + "before + Quá khứ đơn (decided)".',
      whyCorrect: 'Nhấn mạnh khoảng thời gian kéo dài liên tục trước một hành động khác trong quá khứ -> thì Quá khứ hoàn thành tiếp diễn: [ had been + V-ing ].',
      whyIncorrect: {
        B: '"has managed" là hiện tại hoàn thành, không dùng trước mốc quá khứ "decided".',
        C: '"manages" là hiện tại đơn.',
        D: '"is managing" là hiện tại tiếp diễn.'
      },
      fastTip: 'Khoảng thời gian liên tục xảy ra TRƯỚC một sự kiện quá khứ -> Dùng had been V-ing!'
    }
  },

  // 9. Future Simple
  {
    id: 'q_tense_fut_simple',
    category: 'tense',
    clueGroup: 'future-simple' as any,
    clueWord: 'tomorrow',
    sentence: 'The human resources director _____ the shortlisted applicants tomorrow morning.',
    options: [
      { key: 'A', text: 'contacted' },
      { key: 'B', text: 'will contact' },
      { key: 'C', text: 'has contacted' },
      { key: 'D', text: 'contacts' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Giám đốc nhân sự sẽ liên hệ với các ứng viên trong danh sách rút gọn vào sáng mai.',
      keySignal: 'Dấu hiệu chỉ tương lai rõ rệt: "tomorrow morning".',
      whyCorrect: 'Hành động xảy ra trong tương lai có mốc "tomorrow" nên dùng Tương lai đơn: [ will + V_inf ] -> "will contact".',
      whyIncorrect: {
        A: '"contacted" là quá khứ đơn.',
        C: '"has contacted" là hiện tại hoàn thành.',
        D: '"contacts" là hiện tại đơn.'
      },
      fastTip: 'Thấy "tomorrow / next week / soon" -> Chọn ngay [ will + V nguyên mẫu ]!'
    }
  },

  // 10. Future Continuous
  {
    id: 'q_tense_fut_cont',
    category: 'tense',
    clueGroup: 'future-continuous' as any,
    clueWord: 'at this time tomorrow',
    sentence: 'At this time tomorrow, the keynote speaker _____ the opening presentation to over 500 attendees.',
    options: [
      { key: 'A', text: 'will be delivering' },
      { key: 'B', text: 'delivered' },
      { key: 'C', text: 'has delivered' },
      { key: 'D', text: 'delivers' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Vào đúng thời điểm này ngày mai, diễn giả chính sẽ đang thuyết trình bài phát biểu khai mạc trước hơn 500 người tham dự.',
      keySignal: 'Dấu hiệu thời điểm chính xác trong tương lai: "At this time tomorrow".',
      whyCorrect: 'Hành động đang diễn ra tại một thời điểm xác định cụ thể trong tương lai phải chia ở thì Tương lai tiếp diễn: [ will be + V-ing ] -> "will be delivering".',
      whyIncorrect: {
        B: '"delivered" là quá khứ.',
        C: '"has delivered" là hiện tại hoàn thành.',
        D: '"delivers" là hiện tại đơn.'
      },
      fastTip: '"At this time + mốc tương lai (tomorrow/next week)" -> Chọn [ will be + V-ing ]!'
    }
  },

  // 11. Future Perfect
  {
    id: 'q_tense_fut_perf',
    category: 'tense',
    clueGroup: 'future-perfect' as any,
    clueWord: 'by the end',
    sentence: 'By the end of this fiscal year, our organization _____ its comprehensive carbon reduction plan.',
    options: [
      { key: 'A', text: 'will have implemented' },
      { key: 'B', text: 'implemented' },
      { key: 'C', text: 'implements' },
      { key: 'D', text: 'was implementing' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Trước thời điểm kết thúc năm tài chính này, tổ chức của chúng tôi sẽ hoàn thành việc triển khai kế hoạch giảm thiểu carbon toàn diện.',
      keySignal: 'Dấu hiệu kinh điển bậc nhất đề TOEIC Part 5: "By + mốc tương lai" (By the end of this fiscal year).',
      whyCorrect: 'Hành động sẽ hoàn tất trước một thời điểm trong tương lai bắt buộc chia ở thì Tương lai hoàn thành: [ will have + V3/ed ] -> "will have implemented".',
      whyIncorrect: {
        B: '"implemented" là quá khứ đơn.',
        C: '"implements" là hiện tại đơn.',
        D: '"was implementing" là quá khứ tiếp diễn.'
      },
      fastTip: 'BÍ KÍP VÀNG: Thấy "By / Before + mốc tương lai" -> 100% chọn WILL HAVE + V3/ed!'
    }
  },

  // 12. Future Perfect Continuous
  {
    id: 'q_tense_fut_perf_cont',
    category: 'tense',
    clueGroup: 'future-perfect-continuous' as any,
    clueWord: 'by next month',
    sentence: 'By next month, Ms. Gomez _____ with the biomedical research team for exactly a decade.',
    options: [
      { key: 'A', text: 'will have been collaborating' },
      { key: 'B', text: 'collaborates' },
      { key: 'C', text: 'collaborated' },
      { key: 'D', text: 'is collaborating' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Tính đến tháng tới, cô Gomez sẽ làm việc hợp tác liên tục với nhóm nghiên cứu y sinh học tròn đúng một thập kỷ.',
      keySignal: 'Dấu hiệu kết hợp: "By next month" (trước mốc tương lai) + "for exactly a decade" (khoảng thời gian 10 năm).',
      whyCorrect: 'Nhấn mạnh tính liên tục của hành động kéo dài đến một mốc thời gian trong tương lai -> Tương lai hoàn thành tiếp diễn: [ will have been + V-ing ].',
      whyIncorrect: {
        B: '"collaborates" là hiện tại đơn.',
        C: '"collaborated" là quá khứ đơn.',
        D: '"is collaborating" là hiện tại tiếp diễn.'
      },
      fastTip: '"By + tương lai" + "for + khoảng thời gian" -> Dùng will have been V-ing!'
    }
  }
];

const TENSE_ID_MAP: Record<string, string[]> = {
  'present-simple': ['q_tense_pres_simple', 'q_tense_pres_simple_2'],
  'present-continuous': ['q_tense_pres_cont'],
  'present-perfect': ['q_tense_pres_perf', 'q_tense_pres_perf_2'],
  'present-perfect-continuous': ['q_tense_pres_perf_cont'],
  'past-simple': ['q_tense_past_simple'],
  'past-continuous': ['q_tense_past_cont'],
  'past-perfect': ['q_tense_past_perf'],
  'past-perfect-continuous': ['q_tense_past_perf_cont'],
  'future-simple': ['q_tense_fut_simple'],
  'future-continuous': ['q_tense_fut_cont'],
  'future-perfect': ['q_tense_fut_perf'],
  'future-perfect-continuous': ['q_tense_fut_perf_cont'],
  'group-present': [
    'q_tense_pres_simple', 
    'q_tense_pres_simple_2',
    'q_tense_pres_cont', 
    'q_tense_pres_perf', 
    'q_tense_pres_perf_2',
    'q_tense_pres_perf_cont'
  ],
  'group-past': [
    'q_tense_past_simple', 
    'q_tense_past_cont', 
    'q_tense_past_perf', 
    'q_tense_past_perf_cont'
  ],
  'group-future': [
    'q_tense_fut_simple', 
    'q_tense_fut_cont', 
    'q_tense_fut_perf', 
    'q_tense_fut_perf_cont'
  ],
};

/**
 * Filter questions by specific tense or tense group
 */
export function getQuestionsByTense(filter: string): Question[] {
  if (!filter || filter === 'all') {
    return SEED_12_TENSES_QUESTIONS;
  }

  const targetIds = TENSE_ID_MAP[filter];
  if (targetIds) {
    return SEED_12_TENSES_QUESTIONS.filter(q => targetIds.includes(q.id));
  }

  return SEED_12_TENSES_QUESTIONS.filter(q => q.clueGroup === filter || q.id.includes(filter.replace('-', '_')));
}
