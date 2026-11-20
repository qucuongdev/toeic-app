import { Question, Option } from '@/types';

export interface CollocationPattern {
  id: string;
  group: 'with' | 'for' | 'to' | 'in' | 'on' | 'between-and' | 'either-or' | 'neither-nor' | 'both-and' | 'not-only-but-also' | 'whether-or';
  particle: string;
  leadWord: string;
  sentenceTemplate: string; // contains _____
  correctWord: string;
  distractors: string[];
  translation: string;
  whyCorrect: string;
  whyIncorrect: Record<string, string>;
  fastTip: string;
}

export const COLLOCATION_PATTERNS: CollocationPattern[] = [
  // ===================== WITH (14 Patterns) =====================
  {
    id: 'colloc_with_comply',
    group: 'with',
    particle: 'with',
    leadWord: 'comply',
    sentenceTemplate: 'All site contractors must strictly _____ with the newly implemented workplace safety directives.',
    correctWord: 'comply',
    distractors: ['follow', 'observe', 'obey'],
    translation: 'Tất cả các nhà thầu tại công trường phải tuân thủ nghiêm ngặt các chỉ thị an toàn lao động mới được triển khai.',
    whyCorrect: '"comply" bắt buộc đi với giới từ "with" để tạo thành cụm "comply with" (tuân thủ theo quy định/luật lệ).',
    whyIncorrect: {
      follow: '"follow" là ngoại động từ, đi trực tiếp với tân ngữ (follow the rules), không đi với "with".',
      observe: '"observe" không dùng giới từ "with" khi mang nghĩa tuân thủ.',
      obey: '"obey" là ngoại động từ (obey the orders), không dùng "with".'
    },
    fastTip: 'Thấy "_____ with" trong ngữ cảnh luật/quy định -> Phản xạ ngay "comply"!'
  },
  {
    id: 'colloc_with_collab',
    group: 'with',
    particle: 'with',
    leadWord: 'collaborate',
    sentenceTemplate: 'Our engineering staff will _____ closely with international consultants on the bridge project.',
    correctWord: 'collaborate',
    distractors: ['combine', 'participate', 'integrate'],
    translation: 'Đội ngũ kỹ sư của chúng tôi sẽ hợp tác chặt chẽ với các chuyên gia tư vấn quốc tế trong dự án cầu đường.',
    whyCorrect: '"collaborate with" là cụm collocation chuẩn mực diễn tả việc hợp tác làm việc cùng ai/đơn vị nào.',
    whyIncorrect: {
      combine: '"combine" đi với "combine A with B", không dùng trực tiếp làm nội động từ chỉ hợp tác.',
      participate: '"participate" luôn đi với giới từ "in" (participate in), không đi với "with".',
      integrate: '"integrate" đi với "integrate A into B", không dùng với "with" ở cấu trúc này.'
    },
    fastTip: '"collaborate with someone" = hợp tác với ai!'
  },
  {
    id: 'colloc_with_deal',
    group: 'with',
    particle: 'with',
    leadWord: 'deal',
    sentenceTemplate: 'The regional manager was commended for her ability to effectively _____ with unexpected logistical crises.',
    correctWord: 'deal',
    distractors: ['solve', 'handle', 'resolve'],
    translation: 'Trưởng chi nhánh khu vực được khen ngợi vì khả năng xử lý hiệu quả các cuộc khủng hoảng hậu cần bất ngờ.',
    whyCorrect: '"deal with" mang nghĩa là giải quyết, ứng phó hoặc xử lý vấn đề/khủng hoảng.',
    whyIncorrect: {
      solve: '"solve" là ngoại động từ trực tiếp (solve a problem), không đi với "with".',
      handle: '"handle" đi trực tiếp với danh từ tân ngữ (handle crises), không đi với "with".',
      resolve: '"resolve" đi trực tiếp với danh từ (resolve disputes), không đi với "with".'
    },
    fastTip: 'Thấy "_____ with a crisis/problem" -> Chọn ngay "deal"!'
  },
  {
    id: 'colloc_with_prep_blank',
    group: 'with',
    particle: 'with',
    leadWord: 'familiar',
    sentenceTemplate: 'Senior software developers must be thoroughly familiar _____ continuous integration toolchains.',
    correctWord: 'with',
    distractors: ['to', 'for', 'about'],
    translation: 'Các lập trình viên cấp cao phải hoàn toàn quen thuộc với các chuỗi công cụ tích hợp liên tục.',
    whyCorrect: 'Tính từ "familiar" đi với giới từ "with" (familiar with something = quen thuộc, am hiểu cái gì).',
    whyIncorrect: {
      to: '"familiar to somebody" dùng khi cái gì đó quen thuộc đối với ai, không dùng cho người am hiểu công cụ.',
      for: '"familiar" không kết hợp với giới từ "for".',
      about: '"familiar" không kết hợp với giới từ "about".'
    },
    fastTip: '"familiar with something" = quen thuộc, thành thạo cái gì!'
  },
  {
    id: 'colloc_with_equip',
    group: 'with',
    particle: 'with',
    leadWord: 'equipped',
    sentenceTemplate: 'All newly opened testing laboratories are fully _____ with state-of-the-art diagnostic instruments.',
    correctWord: 'equipped',
    distractors: ['provided', 'supplied', 'installed'],
    translation: 'Tất cả các phòng thí nghiệm mới mở đều được trang bị đầy đủ các thiết bị chẩn đoán tối tân.',
    whyCorrect: '"equipped with" là cụm từ chuẩn chỉ việc được trang bị dụng cụ, công nghệ tân tiến.',
    whyIncorrect: {
      provided: '"provided with" có thể dùng nhưng "equipped with" là collocation chuyên dụng cho máy móc phòng lab.',
      supplied: '"supplied with" thường dùng cho vật tư tiêu hao (office supplies), không tự nhiên cho thiết bị chẩn đoán.',
      installed: '"installed" là ngoại động từ trực tiếp cho phần mềm/máy móc, không đi với "equipped with" theo mẫu này.'
    },
    fastTip: 'Thấy thiết bị công nghệ hiện đại + with -> Chọn ngay "equipped"!'
  },
  {
    id: 'colloc_with_agree',
    group: 'with',
    particle: 'with',
    leadWord: 'agree',
    sentenceTemplate: 'The finance committee unanimously _____ with the proposal to refinance existing long-term debt.',
    correctWord: 'agreed',
    distractors: ['approved', 'accepted', 'concurred'],
    translation: 'Ủy ban tài chính đã nhất trí đồng ý với đề xuất tái cấp vốn cho các khoản nợ dài hạn hiện có.',
    whyCorrect: '"agree with" mang nghĩa tán thành, đồng thuận với một đề xuất hoặc ý kiến của ai.',
    whyIncorrect: {
      approved: '"approve" đi với giới từ "of" (approve of) hoặc trực tiếp làm ngoại động từ.',
      accepted: '"accept" là ngoại động từ trực tiếp (accept the proposal), không đi với "with".',
      concurred: '"concur" thường dùng "concur with" trong văn cảnh học thuật cổ điển, "agreed" phổ biến chuẩn ETS.'
    },
    fastTip: '"agree with something/somebody" = đồng tình với cái gì/ai!'
  },
  {
    id: 'colloc_with_compatible',
    group: 'with',
    particle: 'with',
    leadWord: 'compatible',
    sentenceTemplate: 'The newly upgraded accounting software is fully _____ with all legacy workstation operating systems.',
    correctWord: 'compatible',
    distractors: ['comparable', 'suitable', 'dependable'],
    translation: 'Phần mềm kế toán mới nâng cấp hoàn toàn tương thích với tất cả các hệ điều hành máy trạm cũ.',
    whyCorrect: '"compatible with" là thuật ngữ kỹ thuật mang nghĩa tương thích với thiết bị hoặc phần mềm khác.',
    whyIncorrect: {
      comparable: '"comparable to/with" mang nghĩa có thể so sánh được, không mang nghĩa tương thích hệ thống.',
      suitable: '"suitable for" (phù hợp cho mục đích gì), không đi với "with".',
      dependable: '"dependable" mang nghĩa đáng tin cậy, không dùng "dependable with".'
    },
    fastTip: 'Phần mềm/thiết bị + _____ with -> Phản xạ ngay "compatible"!'
  },
  {
    id: 'colloc_with_interact',
    group: 'with',
    particle: 'with',
    leadWord: 'interact',
    sentenceTemplate: 'Customer support agents are trained to courteously _____ with clients from diverse cultural backgrounds.',
    correctWord: 'interact',
    distractors: ['communicate', 'connect', 'contact'],
    translation: 'Các đại diện hỗ trợ khách hàng được đào tạo để tương tác lịch sự với khách hàng đến từ các nền văn hóa khác nhau.',
    whyCorrect: '"interact with" diễn tả hành động tương tác, tiếp xúc qua lại giữa người với người.',
    whyIncorrect: {
      communicate: '"communicate with" đúng nhưng câu này nhấn mạnh kỹ năng tương tác ứng xử trực tiếp.',
      connect: '"connect with" thường dùng cho kết nối công nghệ hoặc mạng lưới quan hệ.',
      contact: '"contact" là ngoại động từ trực tiếp (contact someone), cấm dùng "contact with".'
    },
    fastTip: '"interact with clients" = tương tác với khách hàng!'
  },
  {
    id: 'colloc_with_associated',
    group: 'with',
    particle: 'with',
    leadWord: 'associated',
    sentenceTemplate: 'The prospective financial gains far outweigh the minor operational risks _____ with offshore expansion.',
    correctWord: 'associated',
    distractors: ['related', 'connected', 'linked'],
    translation: 'Lợi nhuận tài chính kỳ vọng vượt xa các rủi ro vận hành nhỏ liên đới với việc mở rộng ra nước ngoài.',
    whyCorrect: '"risks associated with" là collocation kinh điển trong TOEIC Part 5 mang nghĩa những rủi ro liên đới/gắn liền với dự án.',
    whyIncorrect: {
      related: '"related to" đi với giới từ "to", không đi với "with".',
      connected: '"connected to/with" ít trang trọng hơn và không phổ biến bằng "associated with" khi nói về risk.',
      linked: '"linked to" thường đi với giới từ "to".'
    },
    fastTip: 'Thấy "risks / costs _____ with" -> Chọn ngay "associated"!'
  },
  {
    id: 'colloc_with_consistent',
    group: 'with',
    particle: 'with',
    leadWord: 'consistent',
    sentenceTemplate: 'The company environmental strategy is fully _____ with international sustainability benchmarks.',
    correctWord: 'consistent',
    distractors: ['constant', 'coherent', 'continual'],
    translation: 'Chiến lược môi trường của công ty hoàn toàn nhất quán với các tiêu chuẩn bền vững quốc tế.',
    whyCorrect: '"consistent with" có nghĩa là nhất quán, phù hợp và ăn khớp với nguyên tắc/tiêu chuẩn đã định.',
    whyIncorrect: {
      constant: '"constant" mang nghĩa liên tục/không đổi, không đi với "with".',
      coherent: '"coherent with" hiếm khi dùng cho tiêu chuẩn doanh nghiệp.',
      continual: '"continual" mang nghĩa lặp đi lặp lại liên tiếp.'
    },
    fastTip: '"consistent with standards" = nhất quán với tiêu chuẩn!'
  },
  {
    id: 'colloc_with_consult',
    group: 'with',
    particle: 'with',
    leadWord: 'consult',
    sentenceTemplate: 'Department heads should _____ with human resources before making final promotional decisions.',
    correctWord: 'consult',
    distractors: ['advise', 'counsel', 'inquire'],
    translation: 'Trưởng các bộ phận nên tham vấn ý kiến phòng nhân sự trước khi đưa ra quyết định thăng chức cuối cùng.',
    whyCorrect: '"consult with somebody" mang nghĩa tham khảo ý kiến, hội ý cùng ai đó.',
    whyIncorrect: {
      advise: '"advise" là ngoại động từ trực tiếp (advise someone), không dùng "advise with".',
      counsel: '"counsel" đi trực tiếp với tân ngữ (counsel someone).',
      inquire: '"inquire about" (hỏi về điều gì), không dùng "inquire with".'
    },
    fastTip: '"consult with human resources" = tham vấn phòng nhân sự!'
  },
  {
    id: 'colloc_with_coincide',
    group: 'with',
    particle: 'with',
    leadWord: 'coincide',
    sentenceTemplate: 'The product launch ceremony was rescheduled so that it would not _____ with the national holiday.',
    correctWord: 'coincide',
    distractors: ['overlap', 'conflict', 'collide'],
    translation: 'Lễ ra mắt sản phẩm đã được đổi lịch để không trùng khớp với kỳ nghỉ lễ quốc gia.',
    whyCorrect: '"coincide with" mang nghĩa diễn ra trùng thời điểm với một sự kiện khác.',
    whyIncorrect: {
      overlap: '"overlap with" có thể dùng nhưng "coincide with" chỉ sự trùng khớp thời gian hoàn toàn.',
      conflict: '"conflict with" chỉ sự xung đột lợi ích hoặc lịch trình đối đầu.',
      collide: '"collide with" thường dùng cho va chạm vật lý trực tiếp.'
    },
    fastTip: 'Thời gian trùng nhau + with -> Chọn ngay "coincide"!'
  },
  {
    id: 'colloc_with_interfere',
    group: 'with',
    particle: 'with',
    leadWord: 'interfere',
    sentenceTemplate: 'Building renovations must not _____ with normal day-to-day office administrative routines.',
    correctWord: 'interfere',
    distractors: ['interrupt', 'disrupt', 'disturb'],
    translation: 'Việc sửa chữa tòa nhà không được gây trở ngại hoặc can thiệp vào các hoạt động hành chính văn phòng hàng ngày.',
    whyCorrect: '"interfere with" mang nghĩa gây cản trở, can thiệp làm gián đoạn tiến trình bình thường.',
    whyIncorrect: {
      interrupt: '"interrupt" là ngoại động từ trực tiếp (interrupt work), không đi với "with".',
      disrupt: '"disrupt" là ngoại động từ trực tiếp (disrupt operations).',
      disturb: '"disturb" là ngoại động từ trực tiếp (disturb employees).'
    },
    fastTip: 'Thấy "_____ with routines/work" -> Chọn ngay "interfere"!'
  },
  {
    id: 'colloc_with_provide',
    group: 'with',
    particle: 'with',
    leadWord: 'provided',
    sentenceTemplate: 'All workshop participants were _____ with comprehensive instructional binders upon registration.',
    correctWord: 'provided',
    distractors: ['offered', 'given', 'granted'],
    translation: 'Tất cả các học viên tham gia hội thảo đều được cung cấp tập tài liệu hướng dẫn toàn diện khi đăng ký.',
    whyCorrect: 'Cấu trúc "provide somebody with something" (bị động: somebody is provided with sth) = cung cấp cho ai cái gì.',
    whyIncorrect: {
      offered: '"offer somebody something" không đi với giới từ "with".',
      given: '"give somebody something" không dùng "with".',
      granted: '"grant somebody something" không dùng "with".'
    },
    fastTip: '"provide someone WITH something" = cung cấp cho ai cái gì!'
  },

  // ===================== FOR (14 Patterns) =====================
  {
    id: 'colloc_for_responsible',
    group: 'for',
    particle: 'for',
    leadWord: 'responsible',
    sentenceTemplate: 'The newly appointed director will be exclusively responsible _____ managing corporate expansion in Asia.',
    correctWord: 'for',
    distractors: ['to', 'with', 'about'],
    translation: 'Giám đốc mới được bổ nhiệm sẽ chịu trách nhiệm độc quyền về việc quản lý mở rộng doanh nghiệp tại châu Á.',
    whyCorrect: 'Cấu trúc "responsible for + V-ing / Noun" có nghĩa là chịu trách nhiệm về việc gì.',
    whyIncorrect: {
      to: '"responsible to somebody" là chịu trách nhiệm trước cấp trên, không phù hợp với tân ngữ hành động.',
      with: '"responsible" không đi với giới từ "with".',
      about: '"responsible" không đi với "about".'
    },
    fastTip: 'Gặp "responsible" + công việc/hành động -> Chọn ngay "for"!'
  },
  {
    id: 'colloc_for_eligible',
    group: 'for',
    particle: 'for',
    leadWord: 'eligible',
    sentenceTemplate: 'Employees who have completed their probationary period are fully eligible _____ comprehensive dental coverage.',
    correctWord: 'for',
    distractors: ['with', 'to', 'in'],
    translation: 'Những nhân viên đã hoàn thành thời gian thử việc hoàn toàn đủ điều kiện nhận gói bảo hiểm nha khoa toàn diện.',
    whyCorrect: '"eligible for + Noun" = đủ điều kiện, đủ tiêu chuẩn hưởng quyền lợi gì.',
    whyIncorrect: {
      with: '"eligible" không đi với "with".',
      to: '"eligible" chỉ đi với "to" khi theo sau là động từ nguyên mẫu (eligible to receive), ở đây là danh từ "coverage".',
      in: '"eligible" không kết hợp với "in".'
    },
    fastTip: '"eligible for + Noun" = đủ điều kiện hưởng cái gì!'
  },
  {
    id: 'colloc_for_account',
    group: 'for',
    particle: 'for',
    leadWord: 'account',
    sentenceTemplate: 'Online subscriptions currently _____ for nearly sixty percent of the publishing house revenue.',
    correctWord: 'account',
    distractors: ['occupy', 'take', 'represent'],
    translation: 'Các gói đăng ký trực tuyến hiện chiếm gần 60% tổng doanh thu của nhà xuất bản.',
    whyCorrect: '"account for + con số/phần trăm" là cụm từ kinh điển trong TOEIC có nghĩa là chiếm bao nhiêu % hoặc giải thích cho điều gì.',
    whyIncorrect: {
      occupy: '"occupy" là ngoại động từ trực tiếp (occupy 60%), không dùng với giới từ "for".',
      take: '"take" không kết hợp thành cụm chiếm tỷ lệ phần trăm với "for".',
      represent: '"represent" đi trực tiếp với danh từ tân ngữ, không đi với "for".'
    },
    fastTip: 'Thấy "_____ for + số %" -> 100% chọn "account"!'
  },
  {
    id: 'colloc_for_qualify',
    group: 'for',
    particle: 'for',
    leadWord: 'qualify',
    sentenceTemplate: 'Applicants must possess a graduate engineering degree to _____ for the senior researcher vacancy.',
    correctWord: 'qualify',
    distractors: ['satisfy', 'fulfill', 'suit'],
    translation: 'Các ứng viên phải có bằng thạc sĩ kỹ thuật để đủ điều kiện ứng tuyển vị trí nghiên cứu viên cao cấp.',
    whyCorrect: '"qualify for a position" mang nghĩa là đáp ứng đủ các tiêu chuẩn năng lực cho một vị trí.',
    whyIncorrect: {
      satisfy: '"satisfy requirements" là ngoại động từ trực tiếp, không đi với "for".',
      fulfill: '"fulfill obligations" đi trực tiếp không dùng giới từ "for".',
      suit: '"suit" đi trực tiếp (suit your needs).'
    },
    fastTip: '"qualify for a job/position" = đủ tiêu chuẩn cho vị trí!'
  },
  {
    id: 'colloc_for_compensate',
    group: 'for',
    particle: 'for',
    leadWord: 'compensate',
    sentenceTemplate: 'The airline offered travel vouchers to generously _____ passengers for the unexpected flight delay.',
    correctWord: 'compensate',
    distractors: ['reimburse', 'reward', 'remunerate'],
    translation: 'Hãng hàng không đã tặng phiếu du lịch để đền bù hào phóng cho hành khách vì sự cố hoãn chuyến bay bất ngờ.',
    whyCorrect: '"compensate somebody for something" có nghĩa là bồi thường, đền bù cho ai về sự bất tiện hoặc thiệt hại.',
    whyIncorrect: {
      reimburse: '"reimburse someone for expenses" dùng cho thanh toán lại chi phí đã chi ra, không dùng cho sự cố chuyến bay.',
      reward: '"reward somebody for hard work" dùng cho khen thưởng thành tích.',
      remunerate: '"remunerate" là trả thù lao lao động, không phải đền bù tổn thất.'
    },
    fastTip: '"compensate someone for delay/loss" = bồi thường cho ai!'
  },
  {
    id: 'colloc_for_apply',
    group: 'for',
    particle: 'for',
    leadWord: 'apply',
    sentenceTemplate: 'Interested candidates must formally submit their resumes to _____ for the open marketing position.',
    correctWord: 'apply',
    distractors: ['enroll', 'enter', 'join'],
    translation: 'Các ứng viên quan tâm phải chính thức nộp hồ sơ để ứng tuyển cho vị trí tiếp thị đang tuyển dụng.',
    whyCorrect: '"apply for a job/position" là collocation cơ bản nhất chỉ việc nộp đơn ứng tuyển công việc.',
    whyIncorrect: {
      enroll: '"enroll in a course" đi với giới từ "in", không đi với "for".',
      enter: '"enter" là ngoại động từ trực tiếp (enter a market), không đi với "for".',
      join: '"join a company" là ngoại động từ trực tiếp, không dùng "join for".'
    },
    fastTip: '"apply for a job" = ứng tuyển công việc!'
  },
  {
    id: 'colloc_for_substitute',
    group: 'for',
    particle: 'for',
    leadWord: 'substitute',
    sentenceTemplate: 'In modern industrial manufacturing, composite alloys often serve as an effective _____ for traditional steel.',
    correctWord: 'substitute',
    distractors: ['replacement', 'alternative', 'exchange'],
    translation: 'Trong sản xuất công nghiệp hiện đại, các hợp kim composite thường đóng vai trò là vật liệu thay thế hiệu quả cho thép truyền thống.',
    whyCorrect: '"substitute for something" có nghĩa là vật hoặc người thay thế cho cái gì.',
    whyIncorrect: {
      replacement: '"replacement for" cũng dùng được nhưng "serve as a substitute for" là cấu trúc thành ngữ cố định.',
      alternative: '"alternative to" đi với giới từ "to", không đi với "for".',
      exchange: '"exchange" mang nghĩa trao đổi, không phải vật thay thế.'
    },
    fastTip: '"substitute for something" = vật thay thế cho cái gì!'
  },
  {
    id: 'colloc_for_reputation',
    group: 'for',
    particle: 'for',
    leadWord: 'reputation',
    sentenceTemplate: 'The architectural design agency enjoys an outstanding reputation _____ innovative urban structures.',
    correctWord: 'for',
    distractors: ['of', 'about', 'with'],
    translation: 'Công ty thiết kế kiến trúc có danh tiếng xuất chúng về các công trình đô thị mang tính đột phá.',
    whyCorrect: '"reputation for something" có nghĩa là danh tiếng hoặc tiếng tăm về một lĩnh vực hoặc thế mạnh nào đó.',
    whyIncorrect: {
      of: '"reputation of" thường chỉ tiếng tăm của một tổ chức (reputation of the firm), không chỉ thế mạnh nổi tiếng.',
      about: '"reputation" không kết hợp với giới từ "about".',
      with: '"reputation with clients" là tiếng tăm với khách hàng, không dùng cho đặc tính sản phẩm.'
    },
    fastTip: '"reputation for innovation" = danh tiếng về sự đổi mới!'
  },
  {
    id: 'colloc_for_apologize',
    group: 'for',
    particle: 'for',
    leadWord: 'apologize',
    sentenceTemplate: 'The customer service representative sincerely _____ for the shipping delay caused by severe weather.',
    correctWord: 'apologized',
    distractors: ['regretted', 'excused', 'forgave'],
    translation: 'Đại diện dịch vụ khách hàng đã chân thành xin lỗi vì sự chậm trễ vận chuyển do thời tiết xấu.',
    whyCorrect: '"apologize for something" là cụm từ chuẩn diễn tả việc xin lỗi vì điều gì.',
    whyIncorrect: {
      regretted: '"regret" là ngoại động từ trực tiếp (regret the delay), không đi với "for".',
      excused: '"excuse" đi trực tiếp với tân ngữ.',
      forgave: '"forgive someone for something", không dùng tự chủ động xin lỗi.'
    },
    fastTip: '"apologize for an error/delay" = xin lỗi vì cái gì!'
  },
  {
    id: 'colloc_for_noted',
    group: 'for',
    particle: 'for',
    leadWord: 'noted',
    sentenceTemplate: 'The boutique luxury hotel is widely _____ for its impeccable guest hospitality and fine dining.',
    correctWord: 'noted',
    distractors: ['famous', 'popular', 'recognized'],
    translation: 'Khách sạn phong cách sang trọng này nổi tiếng rộng rãi vì sự hiếu khách hoàn hảo và ẩm thực tinh tế.',
    whyCorrect: '"noted for" (hoặc "renowned for") có nghĩa là nổi tiếng, được ghi nhận vì phẩm chất xuất sắc.',
    whyIncorrect: {
      famous: '"famous for" cũng có thể đúng nhưng "widely noted for" là collocation chuẩn chỉ độ uy tín thương hiệu trong ETS.',
      popular: '"popular with/among" (được mến mộ bởi đám đông), không dùng "popular for" trong ngữ cảnh này.',
      recognized: '"recognized as / for" thường đi với chức danh hoặc giải thưởng chính thức.'
    },
    fastTip: '"noted for hospitality" = nổi danh vì sự hiếu khách!'
  },
  {
    id: 'colloc_for_prepare',
    group: 'for',
    particle: 'for',
    leadWord: 'prepare',
    sentenceTemplate: 'Staff members have undergone intensive training sessions to thoroughly _____ for the audit inspection.',
    correctWord: 'prepare',
    distractors: ['ready', 'arrange', 'anticipate'],
    translation: 'Các nhân viên đã trải qua các đợt tập huấn chuyên sâu để chuẩn bị kỹ lưỡng cho đợt thanh tra kiểm toán.',
    whyCorrect: '"prepare for an inspection" = chuẩn bị cho một sự kiện hoặc kỳ kiểm tra.',
    whyIncorrect: {
      ready: '"ready" là tính từ (get ready for), không làm động từ nguyên mẫu trong cụm "to ready for" ở văn phong thương mại.',
      arrange: '"arrange for somebody to do sth", không dùng "arrange for inspection" với nghĩa chuẩn bị.',
      anticipate: '"anticipate" là ngoại động từ trực tiếp (anticipate problems), không đi với "for".'
    },
    fastTip: '"prepare for an exam/audit" = chuẩn bị cho đợt kiểm tra!'
  },
  {
    id: 'colloc_for_charge',
    group: 'for',
    particle: 'for',
    leadWord: 'charge',
    sentenceTemplate: 'The express delivery courier does not _____ additional fees for weekend residential shipments.',
    correctWord: 'charge',
    distractors: ['cost', 'bill', 'price'],
    translation: 'Công ty chuyển phát nhanh không tính thêm phụ phí cho các đơn giao hàng tận nhà vào cuối tuần.',
    whyCorrect: '"charge fees for something" = tính tiền hoặc phụ phí cho dịch vụ gì.',
    whyIncorrect: {
      cost: '"cost" có chủ ngữ là đồ vật (the service costs $10), chủ ngữ người/công ty dùng "charge".',
      bill: '"bill somebody for sth" (gửi hóa đơn cho ai), ở đây tân ngữ là "additional fees".',
      price: '"price" thường dùng ở dạng bị động "priced at $50".'
    },
    fastTip: '"charge a fee for something" = tính phí cho cái gì!'
  },
  {
    id: 'colloc_for_allow',
    group: 'for',
    particle: 'for',
    leadWord: 'allow',
    sentenceTemplate: 'Project managers should always _____ for unforeseen delays when drafting production milestones.',
    correctWord: 'allow',
    distractors: ['permit', 'admit', 'grant'],
    translation: 'Các quản lý dự án nên luôn tính đến những sự chậm trễ ngoài dự kiến khi phác thảo các mốc tiến độ sản xuất.',
    whyCorrect: '"allow for something" là phrasal verb kinh điển nghĩa là tính đến, dự trù đến một yếu tố phát sinh.',
    whyIncorrect: {
      permit: '"permit" là ngoại động từ trực tiếp (permit access), không đi với "permit for".',
      admit: '"admit to" đi với "to", không đi với "for".',
      grant: '"grant" là ngoại động từ trực tiếp (grant permission).'
    },
    fastTip: '"allow for delays" = tính đến/dự trù sự chậm trễ!'
  },
  {
    id: 'colloc_for_opt',
    group: 'for',
    particle: 'for',
    leadWord: 'opt',
    sentenceTemplate: 'Many cost-conscious corporations now _____ for cloud hosting rather than maintaining physical servers.',
    correctWord: 'opt',
    distractors: ['choose', 'select', 'prefer'],
    translation: 'Nhiều tập đoàn chú trọng tối ưu chi phí hiện nay lựa chọn dịch vụ lưu trữ đám mây thay vì duy trì các máy chủ vật lý.',
    whyCorrect: '"opt for something" mang nghĩa là đưa ra lựa chọn cho một phương án nào đó.',
    whyIncorrect: {
      choose: '"choose" là ngoại động từ trực tiếp (choose cloud hosting), không đi với "for".',
      select: '"select" đi trực tiếp không dùng giới từ "for".',
      prefer: '"prefer A to B", không dùng "prefer for".'
    },
    fastTip: '"opt for an option" = quyết định chọn phương án nào!'
  },

  // ===================== TO (14 Patterns) =====================
  {
    id: 'colloc_to_adhere',
    group: 'to',
    particle: 'to',
    leadWord: 'adhere',
    sentenceTemplate: 'All lab technicians must meticulously _____ to the chemical storage regulations.',
    correctWord: 'adhere',
    distractors: ['comply', 'follow', 'conform'],
    translation: 'Tất cả các kỹ thuật viên phòng thí nghiệm phải tuân thủ tỉ mỉ các quy định lưu trữ hóa chất.',
    whyCorrect: '"adhere to" có nghĩa là tuân thủ nghiêm ngặt theo quy định, nguyên tắc.',
    whyIncorrect: {
      comply: '"comply" phải đi với "with" (comply with), không đi với "to".',
      follow: '"follow" đi trực tiếp không dùng giới từ "to".',
      conform: '"conform" thường dùng "conform with" hoặc "conform to", nhưng "adhere to" là chuẩn mực cho quy chế an toàn.'
    },
    fastTip: '"adhere to" = tuân thủ triệt để (đi với to)!'
  },
  {
    id: 'colloc_to_prior',
    group: 'to',
    particle: 'to',
    leadWord: 'prior',
    sentenceTemplate: 'All expense reimbursement forms must be formally submitted prior _____ the conclusion of each fiscal month.',
    correctWord: 'to',
    distractors: ['for', 'from', 'than'],
    translation: 'Tất cả các biểu mẫu hoàn trả chi phí phải được nộp chính thức trước khi kết thúc mỗi tháng tài chính.',
    whyCorrect: '"prior to + Noun / V-ing" là cụm giới từ cố định mang nghĩa là "trước khi".',
    whyIncorrect: {
      for: '"prior" không đi với giới từ "for".',
      from: '"prior" không đi với "from".',
      than: '"prior" là tính từ có gốc Latin, so sánh dùng "to" chứ không dùng "than".'
    },
    fastTip: '"prior to" = before (trước khi)!'
  },
  {
    id: 'colloc_to_commit',
    group: 'to',
    particle: 'to',
    leadWord: 'commit',
    sentenceTemplate: 'The multinational corporation is deeply committed _____ reducing its carbon footprint across all operations.',
    correctWord: 'to',
    distractors: ['for', 'with', 'in'],
    translation: 'Tập đoàn đa quốc gia cam kết sâu sắc đối với việc giảm lượng khí thải carbon trên mọi hoạt động.',
    whyCorrect: '"committed to + V-ing / Noun" = cam kết cống hiến cho việc gì ("to" ở đây là giới từ, theo sau là V-ing "reducing").',
    whyIncorrect: {
      for: '"committed" không đi với "for".',
      with: '"committed" không đi với "with".',
      in: '"committed" không đi với "in".'
    },
    fastTip: '"committed to (+ V-ing)" = cam kết làm việc gì!'
  },
  {
    id: 'colloc_to_contribute',
    group: 'to',
    particle: 'to',
    leadWord: 'contribute',
    sentenceTemplate: 'Generous donor pledges have significantly _____ to the construction of the new pediatric hospital.',
    correctWord: 'contributed',
    distractors: ['attributed', 'distributed', 'subscribed'],
    translation: 'Các cam kết tài trợ hào phóng đã đóng góp đáng kể vào việc xây dựng bệnh viện nhi đồng mới.',
    whyCorrect: '"contribute to + Noun / V-ing" = đóng góp vào việc gì.',
    whyIncorrect: {
      attributed: '"attribute A to B" (quy cái gì là do cái gì), không dùng chủ ngữ trực tiếp quyên góp.',
      distributed: '"distribute A to B" (phân phối cái gì cho ai).',
      subscribed: '"subscribe to" (đặt mua báo, đăng ký kênh), không mang nghĩa đóng góp công trình.'
    },
    fastTip: '"contribute to something" = đóng góp vào cái gì!'
  },
  {
    id: 'colloc_to_dedicate',
    group: 'to',
    particle: 'to',
    leadWord: 'dedicated',
    sentenceTemplate: 'Our specialized support team is entirely dedicated _____ resolving complex technical grievances.',
    correctWord: 'to',
    distractors: ['for', 'with', 'towards'],
    translation: 'Đội ngũ hỗ trợ chuyên trách của chúng tôi hoàn toàn tận tụy cống hiến cho việc giải quyết các khiếu nại kỹ thuật phức tạp.',
    whyCorrect: '"dedicated to + V-ing / Noun" = tận tâm, cống hiến hết mình cho điều gì.',
    whyIncorrect: {
      for: '"dedicated" không đi với "for".',
      with: '"dedicated" không đi với "with".',
      towards: '"dedicated" chuẩn ngữ pháp đi với "to".'
    },
    fastTip: '"dedicated to (+ V-ing)" = tận tụy với công việc!'
  },
  {
    id: 'colloc_to_subject',
    group: 'to',
    particle: 'to',
    leadWord: 'subject',
    sentenceTemplate: 'Promotional discount pricing is strictly _____ to change without prior written notification.',
    correctWord: 'subject',
    distractors: ['liable', 'inclined', 'probable'],
    translation: 'Mức giá chiết khấu khuyến mãi có thể thay đổi mà không cần thông báo trước bằng văn bản.',
    whyCorrect: '"subject to change" là cụm từ thương mại thông dụng có nghĩa là có thể chịu sự thay đổi.',
    whyIncorrect: {
      liable: '"liable to do sth" hoặc "liable for damages" (chịu trách nhiệm pháp lý).',
      inclined: '"inclined to do sth" (có khuynh hướng làm gì).',
      probable: '"probable" không đi với "to change" theo cấu trúc này.'
    },
    fastTip: 'Thấy "_____ to change without notice" -> 100% chọn "subject"!'
  },
  {
    id: 'colloc_to_entitled',
    group: 'to',
    particle: 'to',
    leadWord: 'entitled',
    sentenceTemplate: 'Full-time salaried staff members are rightfully _____ to three weeks of paid annual vacation.',
    correctWord: 'entitled',
    distractors: ['authorized', 'permitted', 'allowed'],
    translation: 'Các nhân viên chính thức hưởng lương toàn thời gian có quyền được hưởng 3 tuần nghỉ phép có lương hàng năm.',
    whyCorrect: '"entitled to + Noun" = có quyền được hưởng điều gì (quyền lợi, phúc lợi).',
    whyIncorrect: {
      authorized: '"authorized to do sth" (được ủy quyền làm gì), không đi với danh từ "vacation".',
      permitted: '"permitted to do sth" (được cho phép làm gì).',
      allowed: '"allowed to do sth" (được phép làm gì).'
    },
    fastTip: '"entitled to benefits/leave" = được quyền hưởng phúc lợi!'
  },
  {
    id: 'colloc_to_addition',
    group: 'to',
    particle: 'to',
    leadWord: 'in addition to',
    sentenceTemplate: 'In addition _____ offering competitive salaries, the startup provides generous stock equity options.',
    correctWord: 'to',
    distractors: ['for', 'with', 'from'],
    translation: 'Ngoài việc đưa ra mức lương cạnh tranh, công ty khởi nghiệp còn cung cấp các gói quyền chọn cổ phiếu hào phóng.',
    whyCorrect: '"in addition to + V-ing / Noun" = bên cạnh, ngoài cái gì ra.',
    whyIncorrect: {
      for: '"in addition" không kết hợp với "for".',
      with: '"in addition" không đi với "with".',
      from: '"in addition" không đi với "from".'
    },
    fastTip: '"in addition to" = besides (bên cạnh việc gì)!'
  },
  {
    id: 'colloc_to_respond',
    group: 'to',
    particle: 'to',
    leadWord: 'respond',
    sentenceTemplate: 'Our help desk engineers make every effort to promptly _____ to customer inquiries within one business hour.',
    correctWord: 'respond',
    distractors: ['answer', 'resolve', 'attend'],
    translation: 'Các kỹ sư bàn trợ giúp của chúng tôi nỗ lực hết mình để phản hồi kịp thời các thắc mắc của khách hàng trong vòng một giờ làm việc.',
    whyCorrect: '"respond to inquiries" mang nghĩa là phản hồi, trả lời các thắc mắc.',
    whyIncorrect: {
      answer: '"answer" là ngoại động từ trực tiếp (answer inquiries), cấm dùng "answer to inquiries".',
      resolve: '"resolve inquiries" là ngoại động từ trực tiếp.',
      attend: '"attend to" có nghĩa là chăm sóc/giải quyết, nhưng "respond to" là collocation chuẩn cho thắc mắc.'
    },
    fastTip: 'Thấy "_____ to inquiries" -> Chọn ngay "respond" (answer không có to)!'
  },
  {
    id: 'colloc_to_refer',
    group: 'to',
    particle: 'to',
    leadWord: 'refer',
    sentenceTemplate: 'For detailed instructions regarding equipment assembly, please _____ to page 12 of the manual.',
    correctWord: 'refer',
    distractors: ['consult', 'review', 'look'],
    translation: 'Để biết hướng dẫn chi tiết về lắp ráp thiết bị, vui lòng tham khảo trang 12 của sách hướng dẫn.',
    whyCorrect: '"refer to page/manual" mang nghĩa tham chiếu, xem sách hướng dẫn.',
    whyIncorrect: {
      consult: '"consult the manual" là ngoại động từ trực tiếp, không đi với "to".',
      review: '"review the manual" là ngoại động từ trực tiếp.',
      look: '"look at", không dùng "look to" khi tra cứu tài liệu.'
    },
    fastTip: '"refer to the manual" = tham khảo sách hướng dẫn!'
  },
  {
    id: 'colloc_to_lead',
    group: 'to',
    particle: 'to',
    leadWord: 'lead',
    sentenceTemplate: 'Unanticipated delays in raw material procurement could ultimately _____ to project deadline overruns.',
    correctWord: 'lead',
    distractors: ['cause', 'result', 'bring'],
    translation: 'Những chậm trễ bất ngờ trong thu mua nguyên vật liệu thô có thể rốt cuộc dẫn đến việc trễ hạn chót dự án.',
    whyCorrect: '"lead to something" = dẫn đến hậu quả hoặc kết quả gì.',
    whyIncorrect: {
      cause: '"cause delays" là ngoại động từ trực tiếp, không dùng "cause to".',
      result: '"result in delays" (đi với in), không đi với "result to".',
      bring: '"bring about" = gây ra, không dùng "bring to" theo cấu trúc này.'
    },
    fastTip: '"lead to + Noun" = dẫn đến kết quả gì!'
  },
  {
    id: 'colloc_to_due',
    group: 'to',
    particle: 'to',
    leadWord: 'due',
    sentenceTemplate: 'The outdoor banquet had to be abruptly cancelled due _____ unforeseen inclement weather conditions.',
    correctWord: 'to',
    distractors: ['for', 'from', 'of'],
    translation: 'Bữa tiệc ngoài trời đã phải hủy bỏ đột ngột do điều kiện thời tiết khắc nghiệt không lường trước.',
    whyCorrect: '"due to + Noun" là cụm liên từ chỉ nguyên nhân mang nghĩa "bởi vì, do".',
    whyIncorrect: {
      for: '"due" không đi với "for" khi chỉ lý do.',
      from: '"due" không đi với "from".',
      of: '"because of" thì đi với "of", còn "due" bắt buộc đi với "to".'
    },
    fastTip: '"due to + Noun" = bởi vì (tương đương because of)!'
  },
  {
    id: 'colloc_to_relate',
    group: 'to',
    particle: 'to',
    leadWord: 'related',
    sentenceTemplate: 'Any inquiries directly _____ to employee health insurance benefits should be forwarded to human resources.',
    correctWord: 'related',
    distractors: ['regarding', 'concerning', 'associated'],
    translation: 'Bất kỳ thắc mắc nào liên quan trực tiếp đến quyền lợi bảo hiểm y tế nhân viên nên được chuyển tiếp đến phòng nhân sự.',
    whyCorrect: '"related to + Noun" = liên quan đến cái gì.',
    whyIncorrect: {
      regarding: '"regarding" là giới từ độc lập (regarding benefits), không đi kèm với "to".',
      concerning: '"concerning" đi trực tiếp không đi với "to".',
      associated: '"associated" thường đi với "associated with", không đi với "to".'
    },
    fastTip: '"related to something" = liên quan đến cái gì!'
  },
  {
    id: 'colloc_to_conform',
    group: 'to',
    particle: 'to',
    leadWord: 'conform',
    sentenceTemplate: 'Manufactured automotive components must rigorously _____ to global environmental emission standards.',
    correctWord: 'conform',
    distractors: ['comply', 'match', 'agree'],
    translation: 'Các linh kiện ô tô được sản xuất phải tuân thủ nghiêm ngặt các tiêu chuẩn khí thải môi trường toàn cầu.',
    whyCorrect: '"conform to standards" = tuân thủ theo các quy chuẩn hoặc khuôn mẫu.',
    whyIncorrect: {
      comply: '"comply" đi với "with" (comply with), không đi với "to".',
      match: '"match" là ngoại động từ trực tiếp (match standards).',
      agree: '"agree with / on", không dùng "agree to standards" theo nghĩa tuân thủ.'
    },
    fastTip: '"conform to standards" = tuân theo quy chuẩn!'
  },

  // ===================== IN (12 Patterns) =====================
  {
    id: 'colloc_in_invest',
    group: 'in',
    particle: 'in',
    leadWord: 'invest',
    sentenceTemplate: 'Venture capital firms are planning to _____ heavily in domestic green technology startups.',
    correctWord: 'invest',
    distractors: ['spend', 'fund', 'finance'],
    translation: 'Các quỹ đầu tư mạo hiểm đang lên kế hoạch đầu tư mạnh mẽ vào các công ty khởi nghiệp công nghệ xanh trong nước.',
    whyCorrect: '"invest in" mang nghĩa đầu tư tiền của hoặc nguồn lực vào lĩnh vực/công ty nào.',
    whyIncorrect: {
      spend: '"spend" đi với cấu trúc "spend money on something", không đi với "in".',
      fund: '"fund" là ngoại động từ trực tiếp (fund startups), không đi với "in".',
      finance: '"finance" là ngoại động từ (finance projects), không dùng giới từ "in".'
    },
    fastTip: '"invest in" = đầu tư vào cái gì!'
  },
  {
    id: 'colloc_in_specialize',
    group: 'in',
    particle: 'in',
    leadWord: 'specialize',
    sentenceTemplate: 'The legal boutique law firm _____ exclusively in corporate intellectual property disputes.',
    correctWord: 'specializes',
    distractors: ['focuses', 'concentrates', 'majors'],
    translation: 'Công ty luật chuyên biệt này chuyên sâu độc quyền về các tranh chấp sở hữu trí tuệ doanh nghiệp.',
    whyCorrect: '"specialize in something" = chuyên môn hóa, chuyên sâu về một mảng dịch vụ/ngành nghề.',
    whyIncorrect: {
      focuses: '"focus" đi với giới từ "on" (focuses on), không đi với "in".',
      concentrates: '"concentrate" đi với giới từ "on" (concentrates on).',
      majors: '"major in" dùng cho sinh viên đại học học chuyên ngành gì, không dùng cho công ty luật.'
    },
    fastTip: 'Thấy công ty/chuyên gia + "_____ in" -> Chọn ngay "specialize"!'
  },
  {
    id: 'colloc_in_participate',
    group: 'in',
    particle: 'in',
    leadWord: 'participate',
    sentenceTemplate: 'All newly recruited associates are warmly invited to _____ in the annual charity marathon.',
    correctWord: 'participate',
    distractors: ['attend', 'join', 'enter'],
    translation: 'Tất cả các cộng sự mới được tuyển dụng đều được nồng nhiệt mời tham gia cuộc chạy marathon từ thiện thường niên.',
    whyCorrect: '"participate in an event" = tham gia vào sự kiện.',
    whyIncorrect: {
      attend: '"attend a marathon/event" là ngoại động từ trực tiếp, cấm dùng "attend in".',
      join: '"join an event" là ngoại động từ trực tiếp, không dùng "join in" trong ngữ cảnh này.',
      enter: '"enter a race" đi trực tiếp không dùng giới từ "in".'
    },
    fastTip: 'Thấy có giới từ "in" -> Chọn "participate in" (attend/join không đi với in)!'
  },
  {
    id: 'colloc_in_succeed',
    group: 'in',
    particle: 'in',
    leadWord: 'succeed',
    sentenceTemplate: 'After rigorous commercial negotiations, the consortium finally _____ in securing the telecom contract.',
    correctWord: 'succeeded',
    distractors: ['managed', 'achieved', 'accomplished'],
    translation: 'Sau các cuộc đàm phán thương mại cam go, tập đoàn liên danh rốt cuộc đã thành công trong việc giành được hợp đồng viễn thông.',
    whyCorrect: '"succeed in + V-ing" = thành công trong việc làm gì.',
    whyIncorrect: {
      managed: '"manage to do something" đi với động từ nguyên mẫu có "to", không đi với "in".',
      achieved: '"achieve" là ngoại động từ trực tiếp (achieve success).',
      accomplished: '"accomplish" là ngoại động từ trực tiếp (accomplish goals).'
    },
    fastTip: '"succeed IN doing something" = thành công trong việc gì!'
  },
  {
    id: 'colloc_in_engage',
    group: 'in',
    particle: 'in',
    leadWord: 'engage',
    sentenceTemplate: 'Financial analysts are legally forbidden to _____ in personal securities trading during audit periods.',
    correctWord: 'engage',
    distractors: ['participate', 'involve', 'commit'],
    translation: 'Các chuyên viên phân tích tài chính bị nghiêm cấm về mặt pháp lý tham gia vào giao dịch chứng khoán cá nhân trong các đợt kiểm toán.',
    whyCorrect: '"engage in transactions/activities" mang nghĩa tham gia hoặc dính líu vào một hoạt động kinh doanh.',
    whyIncorrect: {
      participate: '"participate in" thường dùng cho sự kiện công cộng (events/competitions).',
      involve: '"involve in" thường dùng dạng bị động (be involved in).',
      commit: '"commit to" đi với giới từ "to".'
    },
    fastTip: '"engage in trading/activities" = tham gia giao dịch/hoạt động!'
  },
  {
    id: 'colloc_in_result',
    group: 'in',
    particle: 'in',
    leadWord: 'result',
    sentenceTemplate: 'The sudden surge in seasonal consumer demand will inevitably _____ in extended assembly line shifts.',
    correctWord: 'result',
    distractors: ['lead', 'cause', 'create'],
    translation: 'Sự gia tăng đột biến trong nhu cầu người tiêu dùng theo mùa sẽ tất yếu dẫn đến các ca làm việc kéo dài trên dây chuyền lắp ráp.',
    whyCorrect: '"result in something" = mang lại kết quả, dẫn đến kết cục gì.',
    whyIncorrect: {
      lead: '"lead to" đi với giới từ "to", không đi với "in".',
      cause: '"cause shifts" là ngoại động từ trực tiếp, không đi với "in".',
      create: '"create" đi trực tiếp không dùng giới từ "in".'
    },
    fastTip: '"result in" = lead to (dẫn đến kết quả gì)!'
  },
  {
    id: 'colloc_in_interested',
    group: 'in',
    particle: 'in',
    leadWord: 'interested',
    sentenceTemplate: 'Candidates who are genuinely interested _____ this leadership opening should submit their credentials by Friday.',
    correctWord: 'in',
    distractors: ['for', 'with', 'about'],
    translation: 'Những ứng viên thực sự quan tâm đến vị trí lãnh đạo này nên nộp hồ sơ trước thứ Sáu.',
    whyCorrect: '"interested in something / V-ing" = có hứng thú, quan tâm đến cái gì.',
    whyIncorrect: {
      for: '"interested" không đi với giới từ "for".',
      with: '"interested" không kết hợp với "with".',
      about: '"interested" không đi với "about".'
    },
    fastTip: '"interested in" = quan tâm, hứng thú với cái gì!'
  },
  {
    id: 'colloc_in_skilled',
    group: 'in',
    particle: 'in',
    leadWord: 'skilled',
    sentenceTemplate: 'Our newly recruited network administrator is exceptionally skilled _____ managing decentralized cloud architectures.',
    correctWord: 'in',
    distractors: ['at', 'for', 'with'],
    translation: 'Quản trị viên mạng mới được tuyển dụng của chúng tôi đặc biệt lành nghề trong việc quản trị các kiến trúc đám mây phi tập trung.',
    whyCorrect: '"skilled in / at + V-ing" = thành thạo, lành nghề trong lĩnh vực gì.',
    whyIncorrect: {
      at: '"skilled at" cũng đúng nhưng "skilled in" là cụm chuẩn hay xuất hiện trong văn bản TOEIC doanh nghiệp.',
      for: '"skilled" không đi với "for".',
      with: '"skilled with" thường chỉ sự khéo léo với đôi tay/công cụ cầm tay.'
    },
    fastTip: '"skilled in managing" = lành nghề trong việc quản lý!'
  },
  {
    id: 'colloc_in_involved',
    group: 'in',
    particle: 'in',
    leadWord: 'involved',
    sentenceTemplate: 'All executives who were directly involved _____ the corporate restructuring were asked to prepare a transition plan.',
    correctWord: 'in',
    distractors: ['with', 'to', 'for'],
    translation: 'Tất cả các giám đốc điều hành tham gia trực tiếp vào việc tái cấu trúc doanh nghiệp đều được yêu cầu chuẩn bị một kế hoạch chuyển đổi.',
    whyCorrect: '"involved in something" = tham gia, có liên quan trực tiếp đến tiến trình/dự án.',
    whyIncorrect: {
      with: '"involved with someone" thường chỉ mối quan hệ cá nhân, với dự án công việc luôn dùng "involved in".',
      to: '"involved" không đi với "to".',
      for: '"involved" không đi với "for".'
    },
    fastTip: '"involved in a project" = tham gia vào dự án!'
  },
  {
    id: 'colloc_in_assist',
    group: 'in',
    particle: 'in',
    leadWord: 'assist',
    sentenceTemplate: 'The temporary consultant was hired specifically to _____ in drafting the international distribution agreement.',
    correctWord: 'assist',
    distractors: ['help', 'support', 'aid'],
    translation: 'Chuyên gia tư vấn thời vụ được thuê riêng để hỗ trợ soạn thảo thỏa thuận phân phối quốc tế.',
    whyCorrect: '"assist in + V-ing / Noun" = hỗ trợ, phụ giúp trong việc gì.',
    whyIncorrect: {
      help: '"help (to) draft" đi trực tiếp với V_inf, không đi với "help in drafting" theo phong cách trang trọng.',
      support: '"support drafting" là ngoại động từ trực tiếp.',
      aid: '"aid in" cũng có nhưng "assist in" là từ vựng TOEIC phổ biến hơn.'
    },
    fastTip: '"assist in doing something" = hỗ trợ làm việc gì!'
  },
  {
    id: 'colloc_in_confide',
    group: 'in',
    particle: 'in',
    leadWord: 'confide',
    sentenceTemplate: 'Subordinates often feel completely comfortable to _____ in their regional human resources mentor.',
    correctWord: 'confide',
    distractors: ['trust', 'believe', 'rely'],
    translation: 'Các cấp dưới thường cảm thấy hoàn toàn thoải mái khi tâm sự và giãi bày với người cố vấn nhân sự khu vực của họ.',
    whyCorrect: '"confide in somebody" = giãi bày tâm sự, tin tưởng chia sẻ nỗi niềm cùng ai.',
    whyIncorrect: {
      trust: '"trust someone" là ngoại động từ trực tiếp, không đi với "in".',
      believe: '"believe in someone" mang nghĩa tin vào tiềm năng của ai, không mang nghĩa tâm sự.',
      rely: '"rely on someone" đi với giới từ "on".'
    },
    fastTip: '"confide in someone" = tâm sự, giãi bày cùng ai!'
  },
  {
    id: 'colloc_in_persist',
    group: 'in',
    particle: 'in',
    leadWord: 'persist',
    sentenceTemplate: 'The marketing lead chose to _____ in promoting the product line despite unpromising preliminary metrics.',
    correctWord: 'persist',
    distractors: ['insist', 'continue', 'maintain'],
    translation: 'Trưởng nhóm tiếp thị đã lựa chọn kiên trì quảng bá dòng sản phẩm bất chấp những chỉ số sơ bộ không mấy khả quan.',
    whyCorrect: '"persist in doing something" = kiên trì, cố chấp theo đuổi hành động gì.',
    whyIncorrect: {
      insist: '"insist on doing sth" đi với giới từ "on", không đi với "in".',
      continue: '"continue to do / doing sth", không dùng "continue in".',
      maintain: '"maintain" là ngoại động từ trực tiếp.'
    },
    fastTip: '"persist in doing sth" = kiên trì làm việc gì!'
  },

  // ===================== ON (11 Patterns) =====================
  {
    id: 'colloc_on_depend',
    group: 'on',
    particle: 'on',
    leadWord: 'depend',
    sentenceTemplate: 'The eventual success of the marketing rollout will _____ largely on consumer reception during the initial trial.',
    correctWord: 'depend',
    distractors: ['result', 'succeed', 'trust'],
    translation: 'Sự thành công sau cùng của đợt ra mắt tiếp thị sẽ phụ thuộc phần lớn vào sự đón nhận của người tiêu dùng trong đợt thử nghiệm đầu tiên.',
    whyCorrect: '"depend on" = phụ thuộc hoặc dựa vào điều gì.',
    whyIncorrect: {
      result: '"result" đi với "in" (result in = dẫn đến) hoặc "from" (result from = bắt nguồn từ), không đi với "on".',
      succeed: '"succeed" đi với "in" (succeed in doing sth), không đi với "on".',
      trust: '"trust" là ngoại động từ trực tiếp (trust someone), không dùng "trust on".'
    },
    fastTip: '"depend on" / "rely on" = phụ thuộc vào!'
  },
  {
    id: 'colloc_on_rely',
    group: 'on',
    particle: 'on',
    leadWord: 'rely',
    sentenceTemplate: 'International commercial airlines heavily _____ on sophisticated automated radar tracking technologies.',
    correctWord: 'rely',
    distractors: ['lean', 'count', 'base'],
    translation: 'Các hãng hàng không thương mại quốc tế phụ thuộc rất nhiều vào công nghệ theo dõi radar tự động tinh vi.',
    whyCorrect: '"rely on" = trông cậy, tin cậy hoặc phụ thuộc vào công nghệ/nguồn lực.',
    whyIncorrect: {
      lean: '"lean towards/on" mang tính dựa dẫm vật lý hơn.',
      count: '"count on" thường mang nghĩa trông mong vào ai đó, "rely on" chuẩn hơn cho công nghệ doanh nghiệp.',
      base: '"base on" dùng ở dạng bị động "be based on".'
    },
    fastTip: '"rely on technology" = dựa vào công nghệ!'
  },
  {
    id: 'colloc_on_focus',
    group: 'on',
    particle: 'on',
    leadWord: 'focus',
    sentenceTemplate: 'The upcoming keynote seminar will primarily _____ on renewable energy financing in Southeast Asia.',
    correctWord: 'focus',
    distractors: ['specialize', 'concentrate', 'target'],
    translation: 'Hội thảo diễn thuyết sắp tới sẽ chủ yếu tập trung vào việc tài trợ năng lượng tái tạo tại Đông Nam Á.',
    whyCorrect: '"focus on something" = tập trung vào chủ đề/lĩnh vực gì.',
    whyIncorrect: {
      specialize: '"specialize in" đi với giới từ "in", không đi với "on".',
      concentrate: '"concentrate on" có thể đúng nhưng "primarily focus on" là cụm collocation tự nhiên nhất trong TOEIC.',
      target: '"target" là ngoại động từ trực tiếp (target Southeast Asia).'
    },
    fastTip: '"focus on something" = tập trung vào cái gì!'
  },
  {
    id: 'colloc_on_insist',
    group: 'on',
    particle: 'on',
    leadWord: 'insist',
    sentenceTemplate: 'The senior software architect will strictly _____ on conducting rigorous automated code testing.',
    correctWord: 'insist',
    distractors: ['persist', 'demand', 'require'],
    translation: 'Kiến trúc sư phần mềm cấp cao sẽ kiên quyết yêu cầu thực hiện kiểm thử mã tự động nghiêm ngặt.',
    whyCorrect: '"insist on + V-ing / Noun" = khăng khăng, kiên quyết đòi làm gì.',
    whyIncorrect: {
      persist: '"persist in" đi với giới từ "in", không đi với "on".',
      demand: '"demand that" hoặc đi trực tiếp, không đi với "on".',
      require: '"require" là ngoại động từ trực tiếp.'
    },
    fastTip: '"insist on doing sth" = khăng khăng làm việc gì!'
  },
  {
    id: 'colloc_on_based',
    group: 'on',
    particle: 'on',
    leadWord: 'based',
    sentenceTemplate: 'Annual employee bonus allocations are fairly _____ on quarterly individual performance metrics.',
    correctWord: 'based',
    distractors: ['grounded', 'founded', 'relied'],
    translation: 'Các phân bổ tiền thưởng hàng năm của nhân viên được tính toán công bằng dựa trên các chỉ số hiệu suất cá nhân hàng quý.',
    whyCorrect: '"be based on something" = dựa trên, căn cứ vào cái gì.',
    whyIncorrect: {
      grounded: '"grounded in" đi với giới từ "in".',
      founded: '"founded on" thường dùng cho nền tảng triết lý/đạo đức xã hội, không dùng cho số liệu thưởng.',
      relied: '"relied on" là được tin cậy, không mang nghĩa căn cứ trên chỉ số.'
    },
    fastTip: '"based on performance" = căn cứ vào hiệu suất!'
  },
  {
    id: 'colloc_on_concentrate',
    group: 'on',
    particle: 'on',
    leadWord: 'concentrate',
    sentenceTemplate: 'During the high-stakes negotiations, delegates must exclusively _____ on reaching a consensus on pricing.',
    correctWord: 'concentrate',
    distractors: ['pay attention', 'aim', 'devote'],
    translation: 'Trong suốt các cuộc đàm phán hệ trọng, các đại biểu phải dồn toàn bộ sự chú ý vào việc đạt được sự đồng thuận về giá.',
    whyCorrect: '"concentrate on + V-ing / Noun" = dồn tâm trí, tập trung cao độ vào việc gì.',
    whyIncorrect: {
      'pay attention': '"pay attention to" đi với giới từ "to", không đi với "on".',
      aim: '"aim at" đi với giới từ "at".',
      devote: '"devote oneself to" đi với "to".'
    },
    fastTip: '"concentrate on" = dồn tâm sức vào việc gì!'
  },
  {
    id: 'colloc_on_reflect',
    group: 'on',
    particle: 'on',
    leadWord: 'reflect',
    sentenceTemplate: 'Annual team retrospectives give engineers a valuable opportunity to critically _____ on their achievements and hurdles.',
    correctWord: 'reflect',
    distractors: ['review', 'reconsider', 'recall'],
    translation: 'Các buổi họp nhìn lại hàng năm của đội nhóm mang lại cho các kỹ sư cơ hội quý giá để suy ngẫm sâu sắc về những thành tựu và rào cản của mình.',
    whyCorrect: '"reflect on something" = suy ngẫm, chiêm nghiệm lại điều gì.',
    whyIncorrect: {
      review: '"review achievements" là ngoại động từ trực tiếp, không đi với "on".',
      reconsider: '"reconsider" là ngoại động từ trực tiếp.',
      recall: '"recall" đi trực tiếp không dùng giới từ "on".'
    },
    fastTip: '"reflect on achievements" = suy ngẫm về thành tựu!'
  },
  {
    id: 'colloc_on_congratulate',
    group: 'on',
    particle: 'on',
    leadWord: 'congratulate',
    sentenceTemplate: 'The chief executive took the stage to warmly _____ the sales division on exceeding their annual revenue quota.',
    correctWord: 'congratulate',
    distractors: ['commend', 'praise', 'applaud'],
    translation: 'Tổng giám đốc đã lên sân khấu để nồng nhiệt chúc mừng bộ phận kinh doanh vì đã vượt chỉ tiêu doanh thu hàng năm.',
    whyCorrect: '"congratulate somebody on something" = chúc mừng ai vì điều gì.',
    whyIncorrect: {
      commend: '"commend somebody for something" đi với giới từ "for", không đi với "on".',
      praise: '"praise somebody for something" đi với "for".',
      applaud: '"applaud somebody for" đi với "for".'
    },
    fastTip: '"congratulate someone ON something" = chúc mừng ai về điều gì!'
  },
  {
    id: 'colloc_on_collaborate_on',
    group: 'on',
    particle: 'on',
    leadWord: 'collaborate',
    sentenceTemplate: 'The two overseas research institutes agreed to _____ on a joint initiative combating infectious diseases.',
    correctWord: 'collaborate',
    distractors: ['participate', 'engage', 'involve'],
    translation: 'Hai viện nghiên cứu quốc tế đã đồng ý hợp tác trong một sáng kiến chung chống lại các bệnh truyền nhiễm.',
    whyCorrect: '"collaborate on a project / initiative" = hợp tác cùng thực hiện một dự án/sáng kiến.',
    whyIncorrect: {
      participate: '"participate in" đi với giới từ "in", không đi với "on".',
      engage: '"engage in" đi với giới từ "in".',
      involve: '"involve in" dạng bị động.'
    },
    fastTip: '"collaborate WITH someone ON a project"!'
  },
  {
    id: 'colloc_on_agree',
    group: 'on',
    particle: 'on',
    leadWord: 'agree',
    sentenceTemplate: 'Both negotiating parties have finally managed to _____ on the intellectual property ownership terms.',
    correctWord: 'agree',
    distractors: ['concur', 'accept', 'approve'],
    translation: 'Cả hai bên đàm phán rốt cuộc đã có thể thống nhất về các điều khoản quyền sở hữu trí tuệ.',
    whyCorrect: '"agree on terms / a plan" = đạt được sự thống nhất, đồng thuận về các điều khoản hoặc kế hoạch.',
    whyIncorrect: {
      concur: '"concur with somebody", ít khi dùng "concur on" trong hợp đồng.',
      accept: '"accept terms" là ngoại động từ trực tiếp, không đi với "on".',
      approve: '"approve of" hoặc đi trực tiếp.'
    },
    fastTip: '"agree on terms" = thống nhất về các điều khoản!'
  },
  {
    id: 'colloc_on_comment',
    group: 'on',
    particle: 'on',
    leadWord: 'comment',
    sentenceTemplate: 'The company spokesperson declined to _____ on the ongoing confidential litigation proceedings.',
    correctWord: 'comment',
    distractors: ['discuss', 'mention', 'explain'],
    translation: 'Người phát ngôn công ty đã từ chối bình luận về các thủ tục kiện tụng mật đang diễn ra.',
    whyCorrect: '"comment on something" = đưa ra lời bình luận, phát biểu ý kiến về vấn đề gì.',
    whyIncorrect: {
      discuss: '"discuss a topic" là ngoại động từ trực tiếp, cấm tuyệt đối dùng "discuss on".',
      mention: '"mention something" là ngoại động từ trực tiếp.',
      explain: '"explain something to someone" không dùng "explain on".'
    },
    fastTip: 'Thấy có giới từ "on" -> Chọn "comment on" (discuss không có on)!'
  },

  // ===================== PAIRED CONJUNCTIONS (10 Patterns) =====================
  {
    id: 'colloc_conj_between_and',
    group: 'between-and',
    particle: 'and',
    leadWord: 'between',
    sentenceTemplate: 'The quarterly executive meeting will take place _____ 2:00 PM and 4:30 PM in Conference Room C.',
    correctWord: 'between',
    distractors: ['either', 'both', 'neither'],
    translation: 'Cuộc họp ban điều hành hàng quý sẽ diễn ra trong khoảng từ 2:00 chiều đến 4:30 chiều tại Phòng họp C.',
    whyCorrect: 'Cặp liên từ tương hỗ đi với "and" chỉ khoảng thời gian là "between ... and ...".',
    whyIncorrect: {
      either: '"either" phải đi với "or" (either ... or ...), không đi với "and".',
      both: '"both A and B" thường chỉ cả hai đối tượng đồng thời, không dùng chỉ khoảng thời gian nối tiếp (between 2 PM and 4:30 PM).',
      neither: '"neither" phải đi với "nor" (neither ... nor ...).'
    },
    fastTip: 'Thấy "_____ A and B" chỉ thời gian hoặc khoảng cách -> Chọn ngay "between"!'
  },
  {
    id: 'colloc_conj_between_and_dist',
    group: 'between-and',
    particle: 'and',
    leadWord: 'between',
    sentenceTemplate: 'High-speed express rail connections operate continuously _____ Chicago and Minneapolis.',
    correctWord: 'between',
    distractors: ['either', 'from', 'both'],
    translation: 'Tuyến đường sắt cao tốc vận hành liên tục giữa thành phố Chicago và Minneapolis.',
    whyCorrect: '"between A and B" chỉ khoảng cách địa lý kết nối giữa hai địa điểm.',
    whyIncorrect: {
      either: '"either" đi với "or".',
      from: '"from" đi với "to" (from Chicago to Minneapolis), không đi với "and".',
      both: '"both" không dùng để chỉ tuyến đường giao thông nối 2 điểm.'
    },
    fastTip: 'Địa điểm A and địa điểm B -> Chọn "between"!'
  },
  {
    id: 'colloc_conj_either_or',
    group: 'either-or',
    particle: 'or',
    leadWord: 'either',
    sentenceTemplate: 'Job applicants may _____ submit their resume online or present it in person to the human resources department.',
    correctWord: 'either',
    distractors: ['neither', 'both', 'between'],
    translation: 'Các ứng viên xin việc có thể nộp hồ sơ trực tuyến hoặc nộp trực tiếp tại phòng nhân sự.',
    whyCorrect: 'Cặp liên từ song hành "either ... or ..." biểu thị sự lựa chọn một trong hai phương án.',
    whyIncorrect: {
      neither: '"neither" bắt buộc đi với "nor" (neither ... nor ...), không đi với "or".',
      both: '"both" bắt buộc đi với "and" (both ... and ...).',
      between: '"between" bắt buộc đi với "and" (between ... and ...).'
    },
    fastTip: 'Thấy vế sau có "or" -> Phản xạ ngay "either"!'
  },
  {
    id: 'colloc_conj_either_or_product',
    group: 'either-or',
    particle: 'or',
    leadWord: 'either',
    sentenceTemplate: 'Dissatisfied retail customers may request _____ a full monetary refund or an immediate store merchandise exchange.',
    correctWord: 'either',
    distractors: ['neither', 'both', 'whether'],
    translation: 'Những khách hàng không hài lòng có thể yêu cầu hoặc hoàn lại toàn bộ tiền hoặc đổi lấy hàng hóa khác ngay lập tức.',
    whyCorrect: '"either A or B" diễn tả việc chọn 1 trong 2 quyền lợi.',
    whyIncorrect: {
      neither: '"neither" đi với "nor".',
      both: '"both" đi với "and".',
      whether: '"whether" dùng trong mệnh đề điều kiện hoặc danh từ, không đứng sau động từ request theo cấu trúc này.'
    },
    fastTip: '"either ... or ..." = hoặc cái này hoặc cái kia!'
  },
  {
    id: 'colloc_conj_neither_nor',
    group: 'neither-nor',
    particle: 'nor',
    leadWord: 'neither',
    sentenceTemplate: 'Unfortunately, _____ the marketing director nor the regional sales manager was present at the contract signing ceremony.',
    correctWord: 'neither',
    distractors: ['either', 'both', 'not only'],
    translation: 'Thật không may, cả giám đốc tiếp thị lẫn trưởng phòng kinh doanh khu vực đều không có mặt tại lễ ký kết hợp đồng.',
    whyCorrect: 'Cặp liên từ phủ định kép "neither ... nor ..." mang nghĩa "cả A lẫn B đều không".',
    whyIncorrect: {
      either: '"either" đi với "or", không đi với "nor".',
      both: '"both" đi với "and", không đi với "nor".',
      'not only': '"not only" đi với "but also", không đi với "nor".'
    },
    fastTip: 'Thấy vế sau có "nor" -> 100% chọn "neither"!'
  },
  {
    id: 'colloc_conj_neither_nor_agree',
    group: 'neither-nor',
    particle: 'nor',
    leadWord: 'neither',
    sentenceTemplate: 'The union representatives would _____ accept the proposed wage freeze nor countenance mandatory overtime cuts.',
    correctWord: 'neither',
    distractors: ['either', 'never', 'not'],
    translation: 'Các đại diện công đoàn không chấp nhận việc đóng băng tiền lương đề xuất mà cũng không chấp nhận việc cắt giảm giờ làm thêm bắt buộc.',
    whyCorrect: '"neither ... nor ..." liên kết hai động từ phủ định song song.',
    whyIncorrect: {
      either: '"either" đi với "or".',
      never: '"never" không đi cặp với "nor" theo cấu trúc song hành này.',
      not: '"not" thường đi với "not ... but" hoặc "not only".'
    },
    fastTip: 'Có "nor" ở vế sau -> Luôn luôn đi với "neither"!'
  },
  {
    id: 'colloc_conj_both_and',
    group: 'both-and',
    particle: 'and',
    leadWord: 'both',
    sentenceTemplate: 'The company sponsored _____ the international technological symposium and the local developer hackathon.',
    correctWord: 'both',
    distractors: ['either', 'neither', 'whether'],
    translation: 'Công ty đã tài trợ cho cả hội nghị chuyên đề công nghệ quốc tế lẫn cuộc thi hackathon dành cho các lập trình viên địa phương.',
    whyCorrect: 'Cặp liên từ "both ... and ..." diễn tả cả hai đối tượng được tài trợ.',
    whyIncorrect: {
      either: '"either" đi với "or".',
      neither: '"neither" đi với "nor".',
      whether: '"whether" đi với "or", không đi với "and".'
    },
    fastTip: 'Cặp liên từ "both ... and ..." = cả hai!'
  },
  {
    id: 'colloc_conj_both_and_skills',
    group: 'both-and',
    particle: 'and',
    leadWord: 'both',
    sentenceTemplate: 'The executive committee evaluates candidates on _____ technical engineering proficiency and demonstrated leadership competence.',
    correctWord: 'both',
    distractors: ['either', 'as well', 'between'],
    translation: 'Ủy ban điều hành đánh giá các ứng viên trên cả năng lực kỹ thuật công nghệ lẫn năng lực lãnh đạo đã được chứng minh.',
    whyCorrect: '"both A and B" liên kết hai phẩm chất song hành cần thiết.',
    whyIncorrect: {
      either: '"either" đi với "or".',
      'as well': '"as well as" đi sau vế thứ nhất, không đứng trước cụm "A and B".',
      between: '"between" thường chỉ quan hệ giữa 2 cá nhân hoặc vị trí địa lý.'
    },
    fastTip: '"both A and B" = cả A và B!'
  },
  {
    id: 'colloc_conj_not_only_but_also',
    group: 'not-only-but-also',
    particle: 'but also',
    leadWord: 'not only',
    sentenceTemplate: 'The automated production line _____ reduced operational costs but also improved product precision.',
    correctWord: 'not only',
    distractors: ['as well as', 'either', 'both'],
    translation: 'Dây chuyền sản xuất tự động không những làm giảm chi phí vận hành mà còn nâng cao độ chính xác của sản phẩm.',
    whyCorrect: 'Cặp liên từ đẳng lập "not only ... but also ..." mang nghĩa "không những... mà còn...".',
    whyIncorrect: {
      'as well as': '"as well as" không đi cặp với "but also".',
      either: '"either" đi với "or".',
      both: '"both" đi với "and".'
    },
    fastTip: 'Thấy vế sau có "but also" -> Chọn ngay "not only"!'
  },
  {
    id: 'colloc_conj_whether_or',
    group: 'whether-or',
    particle: 'or',
    leadWord: 'whether',
    sentenceTemplate: 'Management must decide _____ to accept the overseas buyout offer or proceed with an initial public offering.',
    correctWord: 'whether',
    distractors: ['either', 'neither', 'if'],
    translation: 'Ban quản lý phải quyết định liệu nên chấp nhận lời đề nghị mua lại từ nước ngoài hay tiến hành phát hành cổ phiếu lần đầu ra công chúng.',
    whyCorrect: '"whether to do A or do B" diễn tả sự phân vân, cân nhắc giữa 2 phương án hành động sau các động từ như decide/wonder.',
    whyIncorrect: {
      either: '"either" thường không đi trực tiếp với "to do A or do B" sau động từ "decide".',
      neither: '"neither" đi với "nor".',
      if: '"if" không đi kèm với "to-infinitive" (cấm dùng "if to accept").'
    },
    fastTip: '"decide whether to do A or B" = quyết định liệu làm A hay B!'
  }
];

export interface CollocationOptions {
  count: number;
  group?: string; // 'with' | 'for' | 'to' | 'in' | 'on' | 'all'
  excludeIds?: string[];
}

export function generateCombinatorialCollocationQuestions(options: CollocationOptions): Question[] {
  const { count, group = 'all', excludeIds = [] } = options;
  const excludeSet = new Set(excludeIds);

  let eligiblePatterns = COLLOCATION_PATTERNS;
  if (group && group !== 'all') {
    eligiblePatterns = COLLOCATION_PATTERNS.filter(p => p.group === group);
    if (eligiblePatterns.length === 0) {
      eligiblePatterns = COLLOCATION_PATTERNS;
    }
  }

  const result: Question[] = [];
  let index = 0;
  let attempts = 0;
  const maxAttempts = Math.max(500, count * 50);

  while (result.length < count && attempts < maxAttempts) {
    const pattern = eligiblePatterns[index % eligiblePatterns.length];
    const questionId = `q_comb_colloc_${pattern.id}_${index}`;

    if (!excludeSet.has(questionId)) {
      // Create 4 choices with rotated correct slot
      const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      const correctSlot = index % 4;
      const correctKey = keys[correctSlot];

      // Shuffle choices so correct answer lands at correctSlot
      const optionsArray: Option[] = [];
      const whyInc: Record<string, string> = {};

      let dIdx = 0;
      keys.forEach((key, kIdx) => {
        if (kIdx === correctSlot) {
          optionsArray.push({ key, text: pattern.correctWord });
        } else {
          const distractorWord = pattern.distractors[dIdx++];
          optionsArray.push({ key, text: distractorWord });
          const reason = pattern.whyIncorrect[distractorWord] || `"${distractorWord}" không kết hợp thành cụm collocation chuẩn xác với "${pattern.particle || pattern.leadWord}".`;
          whyInc[key] = reason;
        }
      });

      result.push({
        id: questionId,
        category: 'collocation',
        clueGroup: pattern.group as any,
        clueWord: pattern.particle || pattern.leadWord,
        sentence: pattern.sentenceTemplate,
        options: optionsArray,
        correctAnswer: correctKey,
        explanation: {
          translation: pattern.translation,
          keySignal: `Dấu hiệu nhận biết: cụm từ "${pattern.leadWord} ... ${pattern.particle}".`,
          whyCorrect: pattern.whyCorrect,
          whyIncorrect: whyInc,
          fastTip: pattern.fastTip
        }
      });

      excludeSet.add(questionId);
    }

    index++;
    attempts++;
  }

  return result;
}
