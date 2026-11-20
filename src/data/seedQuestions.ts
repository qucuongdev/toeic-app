import { Question } from '@/types';

export const SEED_QUESTIONS: Question[] = [
  // --- NHÓM 1: DẤU HIỆU ĐI VỚI "WITH" ---
  {
    id: 'q_with_01',
    category: 'collocation',
    clueGroup: 'with',
    clueWord: 'with',
    sentence: 'All subcontractors on the construction site must strictly _____ with the updated safety regulations.',
    options: [
      { key: 'A', text: 'comply' },
      { key: 'B', text: 'follow' },
      { key: 'C', text: 'observe' },
      { key: 'D', text: 'obey' },
    ],
    correctAnswer: 'A',
    cluePosition: [63, 67],
    explanation: {
      translation: 'Tất cả các nhà thầu phụ trên công trường xây dựng phải tuân thủ nghiêm ngặt các quy định an toàn mới được cập nhật.',
      keySignal: 'Chỗ trống đứng ngay trước giới từ "with".',
      whyCorrect: 'Động từ "comply" bắt buộc phải đi với giới từ "with" tạo thành cụm "comply with" có nghĩa là tuân thủ theo (luật lệ, quy định).',
      whyIncorrect: {
        B: '"follow" là ngoại động từ, đi thẳng với tân ngữ mà không dùng giới từ "with" (follow the rules).',
        C: '"observe" mang nghĩa tuân thủ nhưng cũng là ngoại động từ (observe regulations), không đi với "with".',
        D: '"obey" là ngoại động từ, không dùng giới từ "with" (obey the orders).'
      },
      fastTip: 'Thấy "_____ with" liên quan đến luật lệ/an toàn -> Chọn ngay "comply"!'
    }
  },
  {
    id: 'q_with_02',
    category: 'collocation',
    clueGroup: 'with',
    clueWord: 'with',
    sentence: 'The marketing team will _____ with the external design agency to create the new brand identity.',
    options: [
      { key: 'A', text: 'collaborate' },
      { key: 'B', text: 'cooperate' },
      { key: 'C', text: 'combine' },
      { key: 'D', text: 'participate' },
    ],
    correctAnswer: 'A',
    cluePosition: [30, 34],
    explanation: {
      translation: 'Đội ngũ tiếp thị sẽ hợp tác với công ty thiết kế bên ngoài để xây dựng bộ nhận diện thương hiệu mới.',
      keySignal: 'Đứng trước giới từ "with" và có tân ngữ chỉ đối tác/đơn vị (the external design agency).',
      whyCorrect: '"collaborate with" là cụm từ chuẩn mực trong môi trường doanh nghiệp có nghĩa là "hợp tác, phối hợp làm việc cùng ai".',
      whyIncorrect: {
        B: '"cooperate" thường đi với "cooperate with somebody in/on doing something", nhưng ngữ cảnh dự án thiết kế sáng tạo thì "collaborate with" là chuẩn collocation ETS.',
        C: '"combine" đi với "combine A with B" (kết hợp cái gì với cái gì), không dùng "combine with agency".',
        D: '"participate" luôn đi với giới từ "in" (participate in = tham gia vào), tuyệt đối không đi với "with".'
      },
      fastTip: '"collaborate with someone" = hợp tác với ai!'
    }
  },
  {
    id: 'q_with_03',
    category: 'collocation',
    clueGroup: 'with',
    clueWord: 'with',
    sentence: 'Customer service representatives are trained to _____ professionally with dissatisfied clients.',
    options: [
      { key: 'A', text: 'solve' },
      { key: 'B', text: 'deal' },
      { key: 'C', text: 'resolve' },
      { key: 'D', text: 'handle' },
    ],
    correctAnswer: 'B',
    cluePosition: [56, 60],
    explanation: {
      translation: 'Các đại diện chăm sóc khách hàng được đào tạo để xử lý một cách chuyên nghiệp với những khách hàng không hài lòng.',
      keySignal: 'Đứng trước trạng từ "professionally" và giới từ "with".',
      whyCorrect: '"deal with" nghĩa là giải quyết, ứng xử hoặc xử lý (deal with customers / deal with problems).',
      whyIncorrect: {
        A: '"solve" là ngoại động từ, không đi với giới từ "with" (solve a problem).',
        C: '"resolve" là ngoại động từ (resolve a conflict/dispute), không đi với "with".',
        D: '"handle" cũng là ngoại động từ (handle clients), không đi với "with".'
      },
      fastTip: 'Thấy "_____ with someone/problem" -> phản xạ ngay "deal with"!'
    }
  },
  {
    id: 'q_with_04',
    category: 'collocation',
    clueGroup: 'with',
    clueWord: 'with',
    sentence: 'The corporation will _____ all new employees with modern laptops and home office allowances.',
    options: [
      { key: 'A', text: 'offer' },
      { key: 'B', text: 'provide' },
      { key: 'C', text: 'donate' },
      { key: 'D', text: 'grant' },
    ],
    correctAnswer: 'B',
    cluePosition: [44, 48],
    explanation: {
      translation: 'Tập đoàn sẽ cung cấp cho tất cả nhân viên mới máy tính xách tay hiện đại và trợ cấp làm việc tại nhà.',
      keySignal: 'Cấu trúc: [Verb] + Tân ngữ chỉ người (employees) + "with" + Tân ngữ chỉ vật (laptops).',
      whyCorrect: 'Cấu trúc kinh điển: "provide somebody with something" = cung cấp cho ai cái gì.',
      whyIncorrect: {
        A: '"offer" dùng cấu trúc "offer somebody something" hoặc "offer something to somebody" (không dùng with).',
        C: '"donate" dùng "donate something to somebody" (quyên góp cái gì cho ai).',
        D: '"grant" dùng cấu trúc "grant somebody something" (cấp phép cho ai cái gì).'
      },
      fastTip: 'Công thức vàng: "provide [Người] WITH [Vật]"!'
    }
  },

  // --- NHÓM 2: DẤU HIỆU ĐI VỚI "FOR" ---
  {
    id: 'q_for_01',
    category: 'collocation',
    clueGroup: 'for',
    clueWord: 'for',
    sentence: 'Ms. Jenkins is solely _____ for overseeing the European logistics operations.',
    options: [
      { key: 'A', text: 'responsible' },
      { key: 'B', text: 'account' },
      { key: 'C', text: 'charge' },
      { key: 'D', text: 'duty' },
    ],
    correctAnswer: 'A',
    cluePosition: [25, 28],
    explanation: {
      translation: 'Bà Jenkins là người chịu trách nhiệm duy nhất cho việc giám sát các hoạt động hậu cần tại châu Âu.',
      keySignal: 'Sau động từ to be "is", trạng từ "solely", và đứng trước giới từ "for".',
      whyCorrect: '"be responsible for" là tính từ chỉ trách nhiệm (chịu trách nhiệm về việc gì).',
      whyIncorrect: {
        B: '"account" là động từ, nếu muốn dùng phải là "accounts for" (chiếm bao nhiêu %), nhưng ở đây đã có động từ to be "is".',
        C: '"charge" nếu dùng phải là cụm "in charge of" (đi với of, không đi với for).',
        D: '"duty" là danh từ, không đứng sau "is solely" để kết hợp với "for" theo nghĩa này.'
      },
      fastTip: '"be responsible for" = chịu trách nhiệm cho!'
    }
  },
  {
    id: 'q_for_02',
    category: 'collocation',
    clueGroup: 'for',
    clueWord: 'for',
    sentence: 'Only full-time staff members who have completed one year of service are _____ for the annual performance bonus.',
    options: [
      { key: 'A', text: 'eligible' },
      { key: 'B', text: 'capable' },
      { key: 'C', text: 'appropriate' },
      { key: 'D', text: 'permitted' },
    ],
    correctAnswer: 'A',
    cluePosition: [76, 79],
    explanation: {
      translation: 'Chỉ những nhân viên toàn thời gian đã hoàn thành một năm làm việc mới đủ điều kiện nhận tiền thưởng hiệu suất hàng năm.',
      keySignal: 'Sau động từ to be "are" và đứng trước giới từ "for".',
      whyCorrect: '"eligible for something" là tính từ có nghĩa là "đủ tư cách, đủ điều kiện hưởng quyền lợi gì".',
      whyIncorrect: {
        B: '"capable" luôn đi với giới từ "of" (capable of doing something = có khả năng làm gì).',
        C: '"appropriate" đi với "to" hoặc "for", nhưng mang nghĩa là thích hợp, không dùng chỉ tư cách hưởng chế độ/thưởng.',
        D: '"permitted" là phân từ bị động, thường đi với "to V" (permitted to do something).'
      },
      fastTip: 'Quyền lợi/thưởng + "_____ for" -> Chọn ngay "eligible"!'
    }
  },

  // --- NHÓM 3: CẶP LIÊN TỪ SONG HÀNH (CORRELATIVE CONJUNCTIONS) ---
  {
    id: 'q_conj_01',
    category: 'conjunction',
    clueGroup: 'between-and',
    clueWord: 'between',
    sentence: 'The scheduled maintenance on the server will take place between midnight _____ 4:00 AM.',
    options: [
      { key: 'A', text: 'and' },
      { key: 'B', text: 'or' },
      { key: 'C', text: 'to' },
      { key: 'D', text: 'with' },
    ],
    correctAnswer: 'A',
    cluePosition: [58, 65],
    explanation: {
      translation: 'Việc bảo trì theo lịch trình trên máy chủ sẽ diễn ra trong khoảng từ nửa đêm đến 4 giờ sáng.',
      keySignal: 'Đứng trước có từ manh mối then chốt là "between".',
      whyCorrect: 'Cặp liên từ cố định: "between A AND B" = ở giữa / trong khoảng từ A đến B.',
      whyIncorrect: {
        B: '"or" chỉ đi với "either" (either ... or ...).',
        C: '"to" chỉ đi với "from" (from A to B).',
        D: '"with" không ghép với between để nối hai mốc thời gian.'
      },
      fastTip: 'Thấy "between" phía trước -> 100% tìm "and"!'
    }
  },
  {
    id: 'q_conj_02',
    category: 'conjunction',
    clueGroup: 'either-or',
    clueWord: 'either',
    sentence: 'Applicants can submit their resumes either via the online portal _____ directly to the HR manager.',
    options: [
      { key: 'A', text: 'nor' },
      { key: 'B', text: 'or' },
      { key: 'C', text: 'and' },
      { key: 'D', text: 'also' },
    ],
    correctAnswer: 'B',
    cluePosition: [36, 42],
    explanation: {
      translation: 'Các ứng viên có thể nộp hồ sơ xin việc hoặc qua cổng thông tin trực tuyến hoặc trực tiếp cho trưởng phòng nhân sự.',
      keySignal: 'Đứng trước có từ manh mối "either".',
      whyCorrect: 'Cấu trúc song hành: "either A OR B" = hoặc A hoặc B.',
      whyIncorrect: {
        A: '"nor" chỉ đi với "neither" (neither ... nor ...).',
        C: '"and" chỉ đi với "both" hoặc "between".',
        D: '"also" chỉ đi với "not only ... but also ...".'
      },
      fastTip: 'Either đi với OR, Neither đi với NOR!'
    }
  },

  // --- NHÓM 4: DẤU HIỆU TỪ LOẠI (WORD FORM) ---
  {
    id: 'q_wf_01',
    category: 'word-form',
    clueGroup: 'suffix-adj',
    clueWord: 'suffix',
    sentence: 'The board of directors was impressed by the _____ growth of the company over the past fiscal year.',
    options: [
      { key: 'A', text: 'remark' },
      { key: 'B', text: 'remarkable' },
      { key: 'C', text: 'remarkably' },
      { key: 'D', text: 'remarkableness' },
    ],
    correctAnswer: 'B',
    cluePosition: [41, 44],
    explanation: {
      translation: 'Hội đồng quản trị rất ấn tượng trước sự tăng trưởng đáng kể của công ty trong năm tài chính vừa qua.',
      keySignal: 'Vị trí: sau mạo từ "the" và đứng trước danh từ "growth".',
      whyCorrect: 'Công thức vị trí: [ the + TÍNH TỪ + Danh từ ]. Đuôi "-able" là đuôi đặc trưng của Tính từ (remarkable = đáng chú ý, phi thường).',
      whyIncorrect: {
        A: '"remark" là động từ hoặc danh từ ngắn.',
        C: '"remarkably" là trạng từ có đuôi "-ly".',
        D: '"remarkableness" là danh từ có đuôi "-ness".'
      },
      fastTip: 'Mạo từ + [ ? ] + Danh từ -> 100% chọn Tính từ đuôi -able!'
    }
  },
  {
    id: 'q_wf_02',
    category: 'word-form',
    clueGroup: 'suffix-adv',
    clueWord: 'suffix',
    sentence: 'The newly appointed director has _____ approved the revised budget for the overseas branch.',
    options: [
      { key: 'A', text: 'quick' },
      { key: 'B', text: 'quickness' },
      { key: 'C', text: 'quickly' },
      { key: 'D', text: 'quicken' },
    ],
    correctAnswer: 'C',
    cluePosition: [37, 40],
    explanation: {
      translation: 'Giám đốc mới được bổ nhiệm đã nhanh chóng phê duyệt ngân sách sửa đổi cho chi nhánh ở nước ngoài.',
      keySignal: 'Vị trí kẹp giữa trợ động từ "has" và động từ chính dạng V3/ed "approved".',
      whyCorrect: 'Cấu trúc kẹp: [ Trợ động từ + TRẠNG TỪ + Động từ chính ]. Trạng từ đuôi "-ly" bổ nghĩa cho hành động phê duyệt.',
      whyIncorrect: {
        A: '"quick" là tính từ.',
        B: '"quickness" là danh từ đuôi "-ness".',
        D: '"quicken" là động từ có đuôi "-en".'
      },
      fastTip: 'Nằm giữa [ has / have / will / is ] và [ Động từ chính ] -> Chọn ngay Trạng từ -LY!'
    }
  }
];
