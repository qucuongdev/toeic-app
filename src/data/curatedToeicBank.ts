import { Question } from '@/types';

export const CURATED_ETS_PART5_BANK: Question[] = [
  // 1. Conjunction vs Preposition: Although vs Despite
  {
    id: 'ets_p5_01',
    category: 'toeic-part5',
    sentence: '_____ the torrential rain caused severe traffic congestion, the keynote speaker arrived at the conference hall on schedule.',
    options: [
      { key: 'A', text: 'Although' },
      { key: 'B', text: 'Despite' },
      { key: 'C', text: 'Because of' },
      { key: 'D', text: 'In spite' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Mặc dù cơn mưa như trút nước đã gây ùn tắc giao thông nghiêm trọng, diễn giả chính vẫn đến hội trường hội nghị đúng giờ.',
      keySignal: 'Phía sau chỗ trống là một mệnh đề hoàn chỉnh có chủ ngữ ("the torrential rain") và vị ngữ ("caused severe traffic congestion").',
      whyCorrect: '"Although" là liên từ chỉ sự tương phản, theo sau bởi một mệnh đề (S + V) mang nghĩa "Mặc dù".',
      whyIncorrect: {
        B: '"Despite" là giới từ, bắt buộc theo sau bởi danh từ hoặc V-ing, không đi với mệnh đề S + V.',
        C: '"Because of" là giới từ chỉ nguyên nhân đi với cụm danh từ, và ngữ nghĩa đối lập ở vế sau không phù hợp.',
        D: '"In spite" thiếu giới từ "of" (phải là "In spite of").'
      },
      fastTip: 'Sau chỗ trống có (S + V) chỉ sự đối lập -> Chọn ngay liên từ "Although" (không chọn Despite)!'
    }
  },
  // 2. Conjunction vs Preposition: Despite vs Although
  {
    id: 'ets_p5_02',
    category: 'toeic-part5',
    sentence: '_____ several unexpected mechanical malfunctions during testing, the prototype vehicle received exceptional praise from automotive experts.',
    options: [
      { key: 'A', text: 'Even though' },
      { key: 'B', text: 'Despite' },
      { key: 'C', text: 'Whereas' },
      { key: 'D', text: 'Nevertheless' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Bất chấp một số trục trặc cơ học bất ngờ trong quá trình thử nghiệm, chiếc xe nguyên mẫu vẫn nhận được lời khen ngợi đặc biệt từ các chuyên gia ô tô.',
      keySignal: 'Sau chỗ trống chỉ là một cụm danh từ ("several unexpected mechanical malfunctions during testing"), không có động từ chính chia thì.',
      whyCorrect: '"Despite" là giới từ chỉ sự nhượng bộ, theo sau bởi một cụm danh từ (Noun Phrase) mang nghĩa "Bất chấp, mặc dù".',
      whyIncorrect: {
        A: '"Even though" là liên từ bắt buộc đi với mệnh đề (S + V).',
        C: '"Whereas" là liên từ chỉ sự tương phản so sánh, theo sau là mệnh đề.',
        D: '"Nevertheless" là trạng từ liên kết, thường đứng đầu câu trước dấu phẩy hoặc giữa hai dấu chấm phẩy.'
      },
      fastTip: 'Sau chỗ trống chỉ là CỤM DANH TỪ (không có động từ chia thì) -> Chọn ngay "Despite"!'
    }
  },
  // 3. Pronouns: Reflexive pronoun (himself)
  {
    id: 'ets_p5_03',
    category: 'toeic-part5',
    sentence: 'Mr. Henderson assembled the entire departmental presentation slides entirely by _____ over the weekend.',
    options: [
      { key: 'A', text: 'him' },
      { key: 'B', text: 'his' },
      { key: 'C', text: 'himself' },
      { key: 'D', text: 'he' }
    ],
    correctAnswer: 'C',
    explanation: {
      translation: 'Ông Henderson đã tự mình hoàn thành toàn bộ các slide thuyết trình của phòng ban vào cuối tuần.',
      keySignal: 'Đứng ngay sau giới từ "by" nhằm nhấn mạnh chủ ngữ tự thân thực hiện hành động mà không cần sự giúp đỡ.',
      whyCorrect: 'Cụm từ "by oneself" (ở đây là "by himself" tương ứng với Mr. Henderson) có nghĩa là "tự mình làm cái gì mà không có ai trợ giúp".',
      whyIncorrect: {
        A: '"by him" không mang sắc thái tự lập bằng "by himself".',
        B: '"his" là tính từ sở hữu hoặc đại từ sở hữu, không dùng trong cụm "by his".',
        D: '"he" là đại từ nhân xưng chủ ngữ, cấm đứng sau giới từ "by".'
      },
      fastTip: 'Thấy "by _____" ở cuối câu chỉ hành động tự làm -> Chọn ngay đại từ phản thân (-self)!'
    }
  },
  // 4. Pronouns: Possessive adjective (their)
  {
    id: 'ets_p5_04',
    category: 'toeic-part5',
    sentence: 'All laboratory technicians must submit _____ research documentation before leaving the testing facility.',
    options: [
      { key: 'A', text: 'their' },
      { key: 'B', text: 'theirs' },
      { key: 'C', text: 'them' },
      { key: 'D', text: 'themselves' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Tất cả các kỹ thuật viên phòng thí nghiệm phải nộp tài liệu nghiên cứu của họ trước khi rời khỏi cơ sở xét nghiệm.',
      keySignal: 'Đứng ngay trước cụm danh từ "research documentation" (tài liệu nghiên cứu).',
      whyCorrect: 'Trước danh từ cần một TÍNH TỪ SỞ HỮU ("their") để bổ nghĩa và xác định quyền sở hữu đối với tài liệu.',
      whyIncorrect: {
        B: '"theirs" là đại từ sở hữu (bằng their + Noun), không được đứng trước một danh từ khác.',
        C: '"them" là đại từ tân ngữ, không thể bổ nghĩa cho danh từ.',
        D: '"themselves" là đại từ phản thân, không bổ nghĩa trực tiếp cho danh từ đứng sau.'
      },
      fastTip: 'Chỗ trống đứng ngay trước DANH TỪ -> Chọn ngay Tính từ sở hữu (my, your, their, his, her, its)!'
    }
  },
  // 5. Relative Pronoun: Whose (chỉ sở hữu)
  {
    id: 'ets_p5_05',
    category: 'toeic-part5',
    sentence: 'We recently hired a talented graphic designer _____ portfolio demonstrated exceptional brand storytelling creativity.',
    options: [
      { key: 'A', text: 'who' },
      { key: 'B', text: 'whose' },
      { key: 'C', text: 'whom' },
      { key: 'D', text: 'which' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Chúng tôi gần đây đã tuyển dụng một nhà thiết kế đồ họa tài năng có hồ sơ năng lực thể hiện sự sáng tạo truyền thông thương hiệu đặc biệt.',
      keySignal: 'Phía trước là danh từ chỉ người ("graphic designer"), phía sau là danh từ thuộc quyền sở hữu ("portfolio" - hồ sơ của nhà thiết kế).',
      whyCorrect: '"whose" là đại từ quan hệ chỉ sở hữu, liên kết danh từ chỉ người với danh từ thuộc sở hữu của người đó ("designer whose portfolio").',
      whyIncorrect: {
        A: '"who" làm chủ ngữ trực tiếp cho động từ, theo sau không phải là danh từ sở hữu trơ trọi như "portfolio".',
        C: '"whom" làm tân ngữ cho người, theo sau là mệnh đề (S + V) và không chỉ sở hữu.',
        D: '"which" chỉ vật, không dùng thay thế cho danh từ chỉ người ("designer").'
      },
      fastTip: 'Người + _____ + Danh từ sở hữu + Động từ -> 100% chọn "whose"!'
    }
  },
  // 6. Relative Pronoun: Which (chỉ vật)
  {
    id: 'ets_p5_06',
    category: 'toeic-part5',
    sentence: 'The regional logistics warehouse, _____ was constructed five years ago, is undergoing a multi-million-dollar modernization.',
    options: [
      { key: 'A', text: 'which' },
      { key: 'B', text: 'that' },
      { key: 'C', text: 'who' },
      { key: 'D', text: 'where' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Nhà kho hậu cần khu vực, nơi được xây dựng cách đây 5 năm, đang trải qua đợt hiện đại hóa trị giá nhiều triệu đô la.',
      keySignal: 'Đứng sau dấu phẩy trong mệnh đề quan hệ không xác định, thay thế cho danh từ chỉ vật ("warehouse").',
      whyCorrect: '"which" là đại từ quan hệ dùng cho danh từ chỉ vật trong mệnh đề quan hệ có dấu phẩy.',
      whyIncorrect: {
        B: '"that" tuyệt đối KHÔNG được đứng sau dấu phẩy trong mệnh đề quan hệ không xác định.',
        C: '"who" dùng cho danh từ chỉ người.',
        D: '"where" là trạng từ quan hệ chỉ nơi chốn, theo sau phải là mệnh đề hoàn chỉnh (S + V), còn ở đây theo sau là động từ bị động ("was constructed").'
      },
      fastTip: 'Có dấu phẩy (,) + thay cho vật + theo sau là Động từ -> Chọn ngay "which" (CẤM dùng that sau dấu phẩy)!'
    }
  },
  // 7. Degree Adverb: Substantially
  {
    id: 'ets_p5_07',
    category: 'toeic-part5',
    sentence: 'Operating profits for the third fiscal quarter increased _____ due to aggressive cost-containment measures.',
    options: [
      { key: 'A', text: 'substantially' },
      { key: 'B', text: 'substantial' },
      { key: 'C', text: 'substance' },
      { key: 'D', text: 'substantiality' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Lợi nhuận hoạt động trong quý tài chính thứ ba đã tăng lên đáng kể nhờ vào các biện pháp kiểm soát chi phí quyết liệt.',
      keySignal: 'Đứng sau nội động từ "increased" (đã tăng) để chỉ mức độ tăng trưởng.',
      whyCorrect: 'Trạng từ chỉ mức độ "substantially" (đáng kể) bổ nghĩa hoàn hảo cho động từ chỉ sự tăng/giảm ("increased substantially").',
      whyIncorrect: {
        B: '"substantial" là tính từ, không bổ nghĩa cho động từ "increased".',
        C: '"substance" là danh từ (vật chất/bản chất).',
        D: '"substantiality" là danh từ chỉ tính thực chất.'
      },
      fastTip: 'Động từ tăng/giảm (increase/decrease/rise/fall) + _____ -> Chọn ngay trạng từ -LY (substantially, significantly)!'
    }
  },
  // 8. Degree Adverb: Promptly
  {
    id: 'ets_p5_08',
    category: 'toeic-part5',
    sentence: 'The technician responded _____ to the urgent service request, arriving at the client site within twenty minutes.',
    options: [
      { key: 'A', text: 'prompt' },
      { key: 'B', text: 'promptly' },
      { key: 'C', text: 'promptness' },
      { key: 'D', text: 'prompted' }
    ],
    correctAnswer: 'B',
    explanation: {
      translation: 'Kỹ thuật viên đã phản hồi kịp thời đối với yêu cầu dịch vụ khẩn cấp, có mặt tại địa điểm của khách hàng trong vòng 20 phút.',
      keySignal: 'Đứng ngay sau động từ quá khứ "responded" nhằm chỉ cách thức phản hồi.',
      whyCorrect: 'Trạng từ "promptly" mang nghĩa nhanh chóng, kịp thời không chậm trễ, bổ nghĩa cho động từ "responded".',
      whyIncorrect: {
        A: '"prompt" là tính từ (nhanh nhẹn, đúng giờ).',
        C: '"promptness" là danh từ (sự nhanh chóng).',
        D: '"prompted" là động từ phân từ quá khứ.'
      },
      fastTip: '"respond promptly to" = phản hồi nhanh chóng, kịp thời!'
    }
  },
  // 9. Vocabulary: Warranty (bảo hành)
  {
    id: 'ets_p5_09',
    category: 'toeic-part5',
    sentence: 'All electrical appliances manufactured by Apex Corp come with a comprehensive two-year _____ covering mechanical repairs.',
    options: [
      { key: 'A', text: 'warranty' },
      { key: 'B', text: 'permission' },
      { key: 'C', text: 'appointment' },
      { key: 'D', text: 'itinerary' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Tất cả các thiết bị điện do Tập đoàn Apex sản xuất đều đi kèm chế độ bảo hành toàn diện hai năm bao gồm việc sửa chữa cơ khí.',
      keySignal: 'Cụm từ "come with a two-year ____ covering mechanical repairs" (đi kèm với... 2 năm chi trả việc sửa chữa).',
      whyCorrect: '"warranty" (chế độ bảo hành thiết bị) là từ vựng chính xác kết hợp với thời hạn và việc sửa chữa cơ khí.',
      whyIncorrect: {
        B: '"permission" là sự cho phép, không dùng với "two-year permission covering repairs".',
        C: '"appointment" là cuộc hẹn.',
        D: '"itinerary" là lịch trình chuyến đi du lịch/công tác.'
      },
      fastTip: 'Mua thiết bị điện tử/máy móc + "two-year _____" -> 100% chọn "warranty" (bảo hành)!'
    }
  },
  // 10. Vocabulary: Complimentary (miễn phí)
  {
    id: 'ets_p5_10',
    category: 'toeic-part5',
    sentence: 'Guests staying on the executive floor are offered _____ shuttle transportation to and from the international airport.',
    options: [
      { key: 'A', text: 'complimentary' },
      { key: 'B', text: 'voluntary' },
      { key: 'C', text: 'confidential' },
      { key: 'D', text: 'approximate' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Những khách lưu trú tại tầng điều hành được cung cấp dịch vụ xe đưa đón miễn phí đến và đi từ sân bay quốc tế.',
      keySignal: 'Đứng trước cụm danh từ "shuttle transportation" trong ngữ cảnh dịch vụ khách sạn/ưu đãi.',
      whyCorrect: '"complimentary" là tính từ kinh điển trong TOEIC có nghĩa là "miễn phí" (bằng free / at no charge).',
      whyIncorrect: {
        B: '"voluntary" mang nghĩa tự nguyện (làm từ thiện).',
        C: '"confidential" mang nghĩa tuyệt mật.',
        D: '"approximate" mang nghĩa xấp xỉ, ước tính.'
      },
      fastTip: 'Ngữ cảnh khách sạn/sự kiện + "_____ shuttle/breakfast/drink" -> Chọn ngay "complimentary" (= free)!'
    }
  },
  // 11. Vocabulary: Itinerary (lịch trình)
  {
    id: 'ets_p5_11',
    category: 'toeic-part5',
    sentence: 'The travel coordinator will distribute the finalized flight and hotel _____ to all delegates attending the summit tomorrow.',
    options: [
      { key: 'A', text: 'itinerary' },
      { key: 'B', text: 'negotiation' },
      { key: 'C', text: 'subscription' },
      { key: 'D', text: 'specimen' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Điều phối viên du lịch sẽ gửi lịch trình chuyến bay và khách sạn đã được hoàn tất cho tất cả các đại biểu tham dự hội nghị thượng đỉnh vào ngày mai.',
      keySignal: '"flight and hotel _____" (liên quan đến chuyến bay, khách sạn và công tác du lịch).',
      whyCorrect: '"itinerary" là danh từ mang nghĩa là lịch trình chuyến đi chi tiết.',
      whyIncorrect: {
        B: '"negotiation" là cuộc đàm phán.',
        C: '"subscription" là gói đăng ký dài hạn (báo chí, phần mềm).',
        D: '"specimen" là mẫu vật xét nghiệm y khoa.'
      },
      fastTip: 'Chuyến bay, khách sạn, công tác (travel/flight) -> Chọn ngay "itinerary" (lịch trình)!'
    }
  },
  // 12. Vocabulary: Delegate (ủy quyền / giao phó)
  {
    id: 'ets_p5_12',
    category: 'toeic-part5',
    sentence: 'Effective corporate managers must learn how to appropriately _____ routine tasks to capable junior associates.',
    options: [
      { key: 'A', text: 'delegate' },
      { key: 'B', text: 'hesitate' },
      { key: 'C', text: 'eliminate' },
      { key: 'D', text: 'postpone' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Những nhà quản lý doanh nghiệp hiệu quả phải học cách phân chia và ủy thác các nhiệm vụ thường nhật một cách thích hợp cho các cộng sự cấp dưới có năng lực.',
      keySignal: 'Động từ đi với "routine tasks to capable junior associates" (giao nhiệm vụ cho nhân viên cấp dưới).',
      whyCorrect: '"delegate tasks to someone" là collocation chuẩn quản trị nhân sự có nghĩa là giao phó, ủy thác công việc cho cấp dưới.',
      whyIncorrect: {
        B: '"hesitate" là do dự ngập ngừng.',
        C: '"eliminate" là loại trừ, tiêu diệt.',
        D: '"postpone" là trì hoãn công việc.'
      },
      fastTip: '"delegate tasks to staff" = giao phó/ủy thác công việc cho nhân viên!'
    }
  },
  // 13. Conjunction: In order that (để mà)
  {
    id: 'ets_p5_13',
    category: 'toeic-part5',
    sentence: 'The warehouse installed an automated barcode scanner _____ inventory records could be updated in real time.',
    options: [
      { key: 'A', text: 'so that' },
      { key: 'B', text: 'in order to' },
      { key: 'C', text: 'due to' },
      { key: 'D', text: 'as well as' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Nhà kho đã lắp đặt máy quét mã vạch tự động để các hồ sơ tồn kho có thể được cập nhật theo thời gian thực.',
      keySignal: 'Theo sau chỗ trống là mệnh đề có chứa động từ khiếm khuyết ("inventory records could be updated").',
      whyCorrect: '"so that" (hoặc "in order that") là liên từ chỉ mục đích theo sau bởi mệnh đề chứa can/could/may/might.',
      whyIncorrect: {
        B: '"in order to" đi trực tiếp với động từ nguyên mẫu (in order to do sth), không đi với mệnh đề.',
        C: '"due to" là giới từ chỉ nguyên nhân đi với danh từ.',
        D: '"as well as" mang nghĩa "cũng như", không chỉ mục đích.'
      },
      fastTip: 'Chỉ mục đích + sau chỗ trống là MỆNH ĐỀ có modal verb (can/could) -> Chọn ngay "so that"!'
    }
  },
  // 14. Vocabulary: Reimbursement (hoàn tiền)
  {
    id: 'ets_p5_14',
    category: 'toeic-part5',
    sentence: 'Employees seeking travel expense _____ must submit all original itemized hotel and meal receipts within ten days.',
    options: [
      { key: 'A', text: 'reimbursement' },
      { key: 'B', text: 'subscription' },
      { key: 'C', text: 'reputation' },
      { key: 'D', text: 'qualification' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Các nhân viên muốn được hoàn trả chi phí công tác phải nộp toàn bộ hóa đơn khách sạn và ăn uống chi tiết bản gốc trong vòng 10 ngày.',
      keySignal: 'Cụm từ "travel expense _____" đi kèm với việc nộp "original receipts" (biên lai gốc).',
      whyCorrect: '"travel expense reimbursement" là thuật ngữ văn phòng kế toán có nghĩa là việc hoàn trả các chi phí công tác.',
      whyIncorrect: {
        B: '"subscription" là việc đặt mua báo/đăng ký dịch vụ.',
        C: '"reputation" là danh tiếng uy tín.',
        D: '"qualification" là bằng cấp, phẩm chất.'
      },
      fastTip: 'Thấy "expense / receipt" -> Chọn ngay "reimbursement" (hoàn trả chi phí)!'
    }
  },
  // 15. Pronoun: Anyone who (Bất kỳ ai)
  {
    id: 'ets_p5_15',
    category: 'toeic-part5',
    sentence: '_____ who wishes to participate in the optional corporate leadership retreat must register by this Friday afternoon.',
    options: [
      { key: 'A', text: 'Anyone' },
      { key: 'B', text: 'Those' },
      { key: 'C', text: 'Whoever' },
      { key: 'D', text: 'They' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Bất kỳ ai muốn tham gia kỳ nghỉ dưỡng huấn luyện lãnh đạo doanh nghiệp tự chọn phải đăng ký trước chiều thứ Sáu này.',
      keySignal: 'Động từ theo sau là số ít ("wishes" có đuôi -es), đứng trước đại từ quan hệ "who".',
      whyCorrect: '"Anyone who + V(số ít)" là cấu trúc ngữ pháp chuẩn xác để chỉ "bất kỳ người nào mà...".',
      whyIncorrect: {
        B: '"Those who" đi với động từ số nhiều (Those who wish), không dùng với "wishes".',
        C: '"Whoever" đã bao hàm đại từ quan hệ bên trong (whoever = anyone who), cấm dùng "whoever who".',
        D: '"They who" không phải là cấu trúc chuẩn trong tiếng Anh hiện đại.'
      },
      fastTip: 'Thấy "_____ who + V(số ít)" -> Chọn ngay "Anyone" (Nếu V nguyên mẫu số nhiều thì chọn "Those")!'
    }
  },
  // 16. Pronoun: Those who (Những người mà)
  {
    id: 'ets_p5_16',
    category: 'toeic-part5',
    sentence: '_____ who have not yet submitted their quarterly expense reports must do so before the accounting system closes.',
    options: [
      { key: 'A', text: 'Those' },
      { key: 'B', text: 'Anyone' },
      { key: 'C', text: 'Whoever' },
      { key: 'D', text: 'These' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Những người chưa nộp báo cáo chi phí hàng quý phải thực hiện việc này trước khi hệ thống kế toán đóng cửa.',
      keySignal: 'Động từ theo sau là trợ động từ số nhiều ("have not yet submitted"), đứng trước đại từ "who".',
      whyCorrect: '"Those who + V(số nhiều)" chỉ "những người mà...", phù hợp với "have not yet submitted".',
      whyIncorrect: {
        B: '"Anyone who" đi với động từ số ít (has not yet submitted).',
        C: '"Whoever" đi với động từ số ít.',
        D: '"These" không kết hợp thành cụm "These who" trong mệnh đề quan hệ chỉ người.'
      },
      fastTip: 'Thấy "_____ who + V(số nhiều)" -> 100% chọn "Those"!'
    }
  },
  // 17. Conjunction: Unless (Trừ phi)
  {
    id: 'ets_p5_17',
    category: 'toeic-part5',
    sentence: 'The contract signing ceremony will proceed as planned _____ unexpected legal objections are raised by the regulatory board.',
    options: [
      { key: 'A', text: 'unless' },
      { key: 'B', text: 'without' },
      { key: 'C', text: 'except' },
      { key: 'D', text: 'despite' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Lễ ký kết hợp đồng sẽ diễn ra theo đúng kế hoạch trừ phi có những phản đối pháp lý bất ngờ được đưa ra bởi ban quản lý.',
      keySignal: 'Phía sau là một mệnh đề hoàn chỉnh (S + V: "unexpected legal objections are raised").',
      whyCorrect: '"unless" là liên từ mang nghĩa "trừ phi / nếu không" (= if not), theo sau là mệnh đề.',
      whyIncorrect: {
        B: '"without" là giới từ, theo sau là danh từ/V-ing, không đi với mệnh đề S + V.',
        C: '"except" thường đi với "except that" hoặc giới từ "except for".',
        D: '"despite" là giới từ đi với danh từ.'
      },
      fastTip: 'Mang nghĩa "trừ phi" + sau chỗ trống là MỆNH ĐỀ -> Chọn ngay "unless"!'
    }
  },
  // 18. Conjunction: Provided that (Với điều kiện là)
  {
    id: 'ets_p5_18',
    category: 'toeic-part5',
    sentence: 'The warranty remains fully valid _____ that all maintenance services are performed by certified technicians.',
    options: [
      { key: 'A', text: 'provided' },
      { key: 'B', text: 'suppose' },
      { key: 'C', text: 'assuming' },
      { key: 'D', text: 'given' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Chế độ bảo hành vẫn có hiệu lực đầy đủ với điều kiện là tất cả các dịch vụ bảo trì được thực hiện bởi các kỹ thuật viên được chứng nhận.',
      keySignal: 'Đứng ngay trước "that + mệnh đề" biểu thị điều kiện tiên quyết.',
      whyCorrect: '"provided that" (hoặc "providing that") là liên từ điều kiện tương đương với "if / only if" (với điều kiện là).',
      whyIncorrect: {
        B: '"suppose that" thường dùng cho câu giả định trong văn nói.',
        C: '"assuming that" mang nghĩa giả sử rằng.',
        D: '"given that" mang nghĩa là xét thấy rằng, không chỉ điều kiện hợp đồng.'
      },
      fastTip: 'Thấy "_____ that + mệnh đề điều kiện" -> Chọn ngay "provided" (provided that = if)!'
    }
  },
  // 19. Relative Adverb: Where (Nơi mà)
  {
    id: 'ets_p5_19',
    category: 'toeic-part5',
    sentence: 'The corporate headquarters features a state-of-the-art auditorium _____ annual investor conferences are held.',
    options: [
      { key: 'A', text: 'where' },
      { key: 'B', text: 'which' },
      { key: 'C', text: 'that' },
      { key: 'D', text: 'whose' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Trụ sở công ty có một hội trường hiện đại nơi mà các hội nghị nhà đầu tư hàng năm được tổ chức.',
      keySignal: 'Phía trước là danh từ chỉ địa điểm ("auditorium" - hội trường), phía sau là mệnh đề hoàn chỉnh đầy đủ S + V bị động ("annual investor conferences are held").',
      whyCorrect: '"where" là trạng từ quan hệ chỉ nơi chốn (= in which), liên kết danh từ địa điểm với một mệnh đề hoàn chỉnh.',
      whyIncorrect: {
        B: '"which" làm đại từ quan hệ chủ ngữ hoặc tân ngữ, nhưng câu sau đã có chủ ngữ "conferences" và nội động từ bị động "are held" (không thiếu tân ngữ).',
        C: '"that" thay thế cho danh từ, không thay cho trạng từ nơi chốn.',
        D: '"whose" chỉ sở hữu.'
      },
      fastTip: 'Địa điểm + _____ + Mệnh đề hoàn chỉnh (S + V) -> Chọn ngay "where"!'
    }
  },
  // 20. Vocabulary: Designated (Được chỉ định)
  {
    id: 'ets_p5_20',
    category: 'toeic-part5',
    sentence: 'Visitors arriving by car must park exclusively in the _____ visitor parking spaces near Gate 3.',
    options: [
      { key: 'A', text: 'designated' },
      { key: 'B', text: 'resigned' },
      { key: 'C', text: 'assigned' },
      { key: 'D', text: 'designed' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Khách đến bằng ô tô phải đỗ xe riêng tại các vị trí đỗ xe dành cho khách được chỉ định gần Cổng số 3.',
      keySignal: 'Đứng trước cụm từ "visitor parking spaces" (vị trí đỗ xe).',
      whyCorrect: '"designated parking spaces / smoking area" là collocation chuẩn mực có nghĩa là khu vực được chỉ định riêng cho một mục đích.',
      whyIncorrect: {
        B: '"resigned" mang nghĩa đã từ chức.',
        C: '"assigned" thường dùng cho nhiệm vụ/bài tập được giao (assigned tasks).',
        D: '"designed" mang nghĩa được thiết kế.'
      },
      fastTip: 'Khu vực/chỗ đỗ xe/phòng riêng + "_____ area/space" -> Chọn ngay "designated"!'
    }
  },
  // 21. Vocabulary: Pending (Đang chờ xử lý)
  {
    id: 'ets_p5_21',
    category: 'toeic-part5',
    sentence: 'Construction on the beachfront commercial complex has been temporarily halted _____ environmental impact approval.',
    options: [
      { key: 'A', text: 'pending' },
      { key: 'B', text: 'excepting' },
      { key: 'C', text: 'following' },
      { key: 'D', text: 'concerning' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Việc xây dựng khu phức hợp thương mại ven biển đã tạm thời bị đình chỉ trong khi chờ phê duyệt đánh giá tác động môi trường.',
      keySignal: 'Cụm từ "temporarily halted _____ approval" (tạm dừng để chờ phê duyệt).',
      whyCorrect: '"pending + Noun" là giới từ trang trọng trong văn bản pháp lý/hợp đồng mang nghĩa "trong khi chờ đợi, cho đến khi có...".',
      whyIncorrect: {
        B: '"excepting" là ngoại trừ.',
        C: '"following" là sau khi.',
        D: '"concerning" là liên quan đến.'
      },
      fastTip: 'Tạm dừng/chờ đợi + "_____ approval / decision" -> Chọn ngay "pending"!'
    }
  },
  // 22. Vocabulary: Tentative (Dự kiến / tạm thời)
  {
    id: 'ets_p5_22',
    category: 'toeic-part5',
    sentence: 'The human resources director has announced a _____ schedule for the annual employee performance reviews.',
    options: [
      { key: 'A', text: 'tentative' },
      { key: 'B', text: 'hesitant' },
      { key: 'C', text: 'cautious' },
      { key: 'D', text: 'punctual' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Giám đốc nhân sự đã công bố một lịch trình dự kiến cho các đợt đánh giá hiệu suất nhân viên hàng năm.',
      keySignal: 'Đứng trước danh từ "schedule" (lịch trình).',
      whyCorrect: '"tentative schedule / agreement" là collocation kinh điển mang nghĩa lịch trình dự kiến (có thể còn điều chỉnh).',
      whyIncorrect: {
        B: '"hesitant" là do dự (dùng cho tâm lý người), không dùng cho lịch trình.',
        C: '"cautious" là cẩn trọng.',
        D: '"punctual" là đúng giờ (dùng cho người).'
      },
      fastTip: '"tentative schedule / plan" = lịch trình dự kiến!'
    }
  },
  // 23. Vocabulary: Discrepancy (Sự sai lệch)
  {
    id: 'ets_p5_23',
    category: 'toeic-part5',
    sentence: 'The external auditor discovered a significant _____ between the reported warehouse inventory and actual stock count.',
    options: [
      { key: 'A', text: 'discrepancy' },
      { key: 'B', text: 'cooperation' },
      { key: 'C', text: 'appreciation' },
      { key: 'D', text: 'circumstance' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Kiểm toán viên độc lập đã phát hiện ra một sự sai lệch đáng kể giữa số lượng tồn kho được báo cáo và số lượng thực tế.',
      keySignal: 'Cụm từ "_____ between A and B" trong ngữ cảnh kiểm toán số liệu tài chính.',
      whyCorrect: '"discrepancy" là danh từ chỉ sự sai lệch, không khớp giữa hai số liệu hoặc nguồn thông tin.',
      whyIncorrect: {
        B: '"cooperation" là sự hợp tác.',
        C: '"appreciation" là sự cảm kích hoặc gia tăng giá trị.',
        D: '"circumstance" là hoàn cảnh, tình huống.'
      },
      fastTip: 'Kiểm toán/số liệu không khớp + "_____ between reported and actual" -> Chọn ngay "discrepancy"!'
    }
  },
  // 24. Vocabulary: Feasibility (Tính khả thi)
  {
    id: 'ets_p5_24',
    category: 'toeic-part5',
    sentence: 'Before allocating capital, the venture fund commissioned an independent engineering team to assess the _____ of the wind farm.',
    options: [
      { key: 'A', text: 'feasibility' },
      { key: 'B', text: 'complaint' },
      { key: 'C', text: 'hesitation' },
      { key: 'D', text: 'deficiency' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Trước khi phân bổ vốn, quỹ đầu tư mạo hiểm đã ủy thác cho một đội ngũ kỹ sư độc lập đánh giá tính khả thi của trang trại điện gió.',
      keySignal: 'Động từ "assess the ____ of the project/farm" (đánh giá mức độ khả thi của dự án).',
      whyCorrect: '"feasibility study / assess feasibility" là thuật ngữ quản lý dự án có nghĩa là thẩm định tính khả thi.',
      whyIncorrect: {
        B: '"complaint" là lời phàn nàn khiếu nại.',
        C: '"hesitation" là sự do dự.',
        D: '"deficiency" là sự thiếu hụt dinh dưỡng/vật chất.'
      },
      fastTip: '"assess the feasibility of a project" = đánh giá tính khả thi của dự án!'
    }
  },
  // 25. Vocabulary: Priority (Sự ưu tiên)
  {
    id: 'ets_p5_25',
    category: 'toeic-part5',
    sentence: 'Customer safety remains our top _____ during all phases of facility maintenance and modernization.',
    options: [
      { key: 'A', text: 'priority' },
      { key: 'B', text: 'preference' },
      { key: 'C', text: 'privilege' },
      { key: 'D', text: 'presence' }
    ],
    correctAnswer: 'A',
    explanation: {
      translation: 'Sự an toàn của khách hàng vẫn là ưu tiên hàng đầu của chúng tôi trong tất cả các giai đoạn bảo trì và hiện đại hóa cơ sở vật chất.',
      keySignal: 'Cụm từ "top _____" mang nghĩa ưu tiên số một.',
      whyCorrect: '"top priority" là cụm collocation kinh điển trong doanh nghiệp có nghĩa là ưu tiên hàng đầu.',
      whyIncorrect: {
        B: '"preference" là sở thích ưu tiên cá nhân.',
        C: '"privilege" là đặc quyền.',
        D: '"presence" là sự hiện diện.'
      },
      fastTip: 'Thấy "top _____" -> 100% chọn "priority" (ưu tiên hàng đầu)!'
    }
  }
];
