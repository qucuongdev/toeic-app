import { Question, Option } from '@/types';

export interface WordFormDetail {
  word: string;
  suffix: string;
  meaning: string;
}

export interface WordFamily {
  root: string;
  vietnameseMeaning: string;
  verb: WordFormDetail;
  noun: WordFormDetail;
  adjective: WordFormDetail;
  adverb: WordFormDetail;
}

export const SEED_WORD_FAMILIES: WordFamily[] = [
  {
    root: 'create',
    vietnameseMeaning: 'tạo ra, sáng tạo',
    verb: { word: 'create', suffix: '-ate (đuôi động từ gốc)', meaning: 'tạo ra, sáng tạo' },
    noun: { word: 'creation', suffix: '-tion (đuôi danh từ chỉ sự việc/tác phẩm)', meaning: 'sự sáng tạo, tác phẩm' },
    adjective: { word: 'creative', suffix: '-ive (đuôi tính từ chỉ tính chất)', meaning: 'có tính sáng tạo' },
    adverb: { word: 'creatively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách sáng tạo' },
  },
  {
    root: 'simplify',
    vietnameseMeaning: 'đơn giản hóa',
    verb: { word: 'simplify', suffix: '-ify (đuôi động từ mang nghĩa làm cho)', meaning: 'đơn giản hóa' },
    noun: { word: 'simplification', suffix: '-tion (đuôi danh từ chỉ hành động)', meaning: 'sự đơn giản hóa' },
    adjective: { word: 'simple', suffix: 'tính từ gốc', meaning: 'đơn giản, dễ hiểu' },
    adverb: { word: 'simply', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách đơn giản, đơn thuần' },
  },
  {
    root: 'compete',
    vietnameseMeaning: 'cạnh tranh',
    verb: { word: 'compete', suffix: 'động từ gốc', meaning: 'cạnh tranh, thi đua' },
    noun: { word: 'competition', suffix: '-tion (đuôi danh từ chỉ cuộc thi/sự cạnh tranh)', meaning: 'sự cạnh tranh, cuộc thi' },
    adjective: { word: 'competitive', suffix: '-ive (đuôi tính từ có sức cạnh tranh)', meaning: 'có tính cạnh tranh, giá tốt' },
    adverb: { word: 'competitively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách cạnh tranh' },
  },
  {
    root: 'succeed',
    vietnameseMeaning: 'thành công',
    verb: { word: 'succeed', suffix: '-eed (động từ)', meaning: 'thành công, kế vị' },
    noun: { word: 'success', suffix: '-ess (danh từ)', meaning: 'sự thành công' },
    adjective: { word: 'successful', suffix: '-ful (đuôi tính từ chỉ sự đầy đủ/thành công)', meaning: 'thành công' },
    adverb: { word: 'successfully', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách thành công' },
  },
  {
    root: 'decide',
    vietnameseMeaning: 'quyết định',
    verb: { word: 'decide', suffix: 'động từ gốc', meaning: 'quyết định' },
    noun: { word: 'decision', suffix: '-sion (đuôi danh từ)', meaning: 'sự quyết định' },
    adjective: { word: 'decisive', suffix: '-ive (đuôi tính từ mang tính quyết đoán)', meaning: 'quyết đoán, mang tính quyết định' },
    adverb: { word: 'decisively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách dứt khoát' },
  },
  {
    root: 'economize',
    vietnameseMeaning: 'tiết kiệm, kinh tế',
    verb: { word: 'economize', suffix: '-ize (đuôi động từ chỉ hành động làm kinh tế/tiết kiệm)', meaning: 'tiết kiệm chi phí' },
    noun: { word: 'economy', suffix: '-y (danh từ chỉ nền kinh tế)', meaning: 'nền kinh tế, sự tiết kiệm' },
    adjective: { word: 'economic', suffix: '-ic (đuôi tính từ thuộc về kinh tế)', meaning: 'thuộc về kinh tế' },
    adverb: { word: 'economically', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt kinh tế' },
  },
  {
    root: 'broaden',
    vietnameseMeaning: 'mở rộng',
    verb: { word: 'broaden', suffix: '-en (đuôi động từ mang nghĩa làm cho rộng ra)', meaning: 'mở rộng, nới rộng' },
    noun: { word: 'breadth', suffix: '-th (đuôi danh từ chỉ bề rộng)', meaning: 'bề rộng, bề ngang' },
    adjective: { word: 'broad', suffix: 'tính từ gốc', meaning: 'rộng lớn' },
    adverb: { word: 'broadly', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách rộng rãi, nhìn chung' },
  },
  {
    root: 'inform',
    vietnameseMeaning: 'thông báo, cung cấp thông tin',
    verb: { word: 'inform', suffix: 'động từ gốc', meaning: 'thông báo cho ai' },
    noun: { word: 'information', suffix: '-tion (đuôi danh từ không đếm được)', meaning: 'thông tin' },
    adjective: { word: 'informative', suffix: '-ive (đuôi tính từ cung cấp nhiều thông tin bổ ích)', meaning: 'bổ ích, chứa nhiều thông tin' },
    adverb: { word: 'informatively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách giàu thông tin' },
  },
  {
    root: 'rely',
    vietnameseMeaning: 'dựa vào, tin cậy',
    verb: { word: 'rely', suffix: 'động từ gốc (đi với on)', meaning: 'dựa vào, trông cậy vào' },
    noun: { word: 'reliance', suffix: '-ance (đuôi danh từ chỉ sự phụ thuộc)', meaning: 'sự tin cậy, sự phụ thuộc' },
    adjective: { word: 'reliable', suffix: '-able (đuôi tính từ có thể tin tưởng được)', meaning: 'đáng tin cậy' },
    adverb: { word: 'reliably', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách đáng tin cậy' },
  },
  {
    root: 'differ',
    vietnameseMeaning: 'khác biệt',
    verb: { word: 'differ', suffix: 'động từ gốc', meaning: 'khác nhau, bất đồng' },
    noun: { word: 'difference', suffix: '-ence (đuôi danh từ chỉ sự khác biệt)', meaning: 'sự khác nhau, điểm khác biệt' },
    adjective: { word: 'different', suffix: '-ent (đuôi tính từ chỉ tính chất khác biệt)', meaning: 'khác nhau, khác biệt' },
    adverb: { word: 'differently', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách khác biệt' },
  },
  {
    root: 'innovate',
    vietnameseMeaning: 'đổi mới, sáng chế',
    verb: { word: 'innovate', suffix: '-ate (đuôi động từ chỉ hành động đổi mới)', meaning: 'đổi mới, cách tân' },
    noun: { word: 'innovation', suffix: '-tion (đuôi danh từ sự đổi mới)', meaning: 'sự đổi mới, sáng kiến' },
    adjective: { word: 'innovative', suffix: '-ive (đuôi tính từ chỉ tính sáng tạo/đổi mới)', meaning: 'có tính đột phá, sáng tạo' },
    adverb: { word: 'innovatively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách sáng tạo' },
  },
  {
    root: 'motivate',
    vietnameseMeaning: 'thúc đẩy, tạo động lực',
    verb: { word: 'motivate', suffix: '-ate (đuôi động từ thúc đẩy)', meaning: 'truyền cảm hứng, tạo động lực' },
    noun: { word: 'motivation', suffix: '-tion (đuôi danh từ động lực)', meaning: 'nguồn động lực' },
    adjective: { word: 'motivational', suffix: '-al (đuôi tính từ truyền cảm hứng)', meaning: 'mang tính khích lệ' },
    adverb: { word: 'motivationally', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt động lực' },
  },
  {
    root: 'produce',
    vietnameseMeaning: 'sản xuất, tạo ra',
    verb: { word: 'produce', suffix: 'động từ gốc', meaning: 'sản xuất, chế tạo' },
    noun: { word: 'production', suffix: '-tion (đuôi danh từ chỉ quá trình sản xuất)', meaning: 'quá trình sản xuất, sản lượng' },
    adjective: { word: 'productive', suffix: '-ive (đuôi tính từ năng suất cao)', meaning: 'năng suất, hiệu quả' },
    adverb: { word: 'productively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách hiệu quả, có năng suất' },
  },
  {
    root: 'manage',
    vietnameseMeaning: 'quản lý, điều hành',
    verb: { word: 'manage', suffix: 'động từ gốc', meaning: 'quản lý, xoay xở' },
    noun: { word: 'management', suffix: '-ment (đuôi danh từ chỉ sự quản lý / ban giám đốc)', meaning: 'ban quản lý, sự quản lý' },
    adjective: { word: 'managerial', suffix: '-al (đuôi tính từ thuộc về quản lý)', meaning: 'thuộc về cấp quản lý' },
    adverb: { word: 'managerially', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt quản lý' },
  },
  {
    root: 'operate',
    vietnameseMeaning: 'vận hành, hoạt động',
    verb: { word: 'operate', suffix: '-ate (đuôi động từ vận hành)', meaning: 'vận hành máy móc, hoạt động kinh doanh' },
    noun: { word: 'operation', suffix: '-tion (đuôi danh từ chỉ sự vận hành)', meaning: 'hoạt động vận hành' },
    adjective: { word: 'operational', suffix: '-al (đuôi tính từ sẵn sàng hoạt động)', meaning: 'thuộc về vận hành, đang hoạt động' },
    adverb: { word: 'operationally', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt tác nghiệp / vận hành' },
  },
  {
    root: 'apply',
    vietnameseMeaning: 'ứng tuyển, áp dụng',
    verb: { word: 'apply', suffix: 'động từ gốc (apply for/to)', meaning: 'nộp hồ sơ, áp dụng' },
    noun: { word: 'application', suffix: '-tion (đuôi danh từ đơn xin việc / ứng dụng)', meaning: 'đơn xin việc, sự ứng dụng' },
    adjective: { word: 'applicable', suffix: '-able (đuôi tính từ có thể áp dụng được)', meaning: 'thích hợp, có thể áp dụng' },
    adverb: { word: 'applicably', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách thích hợp' },
  },
  {
    root: 'perform',
    vietnameseMeaning: 'biểu diễn, thực hiện công việc',
    verb: { word: 'perform', suffix: 'động từ gốc', meaning: 'thực hiện nhiệm vụ, thi hành' },
    noun: { word: 'performance', suffix: '-ance (đuôi danh từ chỉ hiệu suất công việc)', meaning: 'hiệu suất công việc, buổi biểu diễn' },
    adjective: { word: 'performative', suffix: '-ive (đuôi tính từ mang tính thể hiện)', meaning: 'mang tính biểu diễn / thể hiện' },
    adverb: { word: 'performatively', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt thể hiện' },
  },
  {
    root: 'consider',
    vietnameseMeaning: 'cân nhắc, xem xét',
    verb: { word: 'consider', suffix: 'động từ gốc', meaning: 'cân nhắc kỹ lưỡng' },
    noun: { word: 'consideration', suffix: '-tion (đuôi danh từ sự cân nhắc)', meaning: 'sự xem xét, cân nhắc' },
    adjective: { word: 'considerable', suffix: '-able (đuôi tính từ đáng kể, to lớn)', meaning: 'đáng kể, to lớn' },
    adverb: { word: 'considerably', suffix: '-ly (đuôi trạng từ chỉ mức độ rất nhiều)', meaning: 'một cách đáng kể, rất nhiều' },
  },
  {
    root: 'expand',
    vietnameseMeaning: 'mở rộng quy mô',
    verb: { word: 'expand', suffix: 'động từ gốc', meaning: 'mở rộng chi nhánh/quy mô' },
    noun: { word: 'expansion', suffix: '-sion (đuôi danh từ sự bành trướng/mở rộng)', meaning: 'sự mở rộng' },
    adjective: { word: 'expansive', suffix: '-ive (đuôi tính từ rộng rãi, mở rộng)', meaning: 'rộng lớn, bao quát' },
    adverb: { word: 'expansively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách rộng khắp' },
  },
  {
    root: 'secure',
    vietnameseMeaning: 'bảo vệ an toàn, siết chặt',
    verb: { word: 'secure', suffix: 'động từ gốc', meaning: 'bảo vệ, đạt được cam kết' },
    noun: { word: 'security', suffix: '-ity (đuôi danh từ an ninh, sự an toàn)', meaning: 'an ninh, sự an toàn' },
    adjective: { word: 'secured', suffix: '-ed (đuôi tính từ phân từ bị động mang nghĩa được bảo đảm)', meaning: 'được bảo mật, an toàn' },
    adverb: { word: 'securely', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách an toàn, chặt chẽ' },
  },
  {
    root: 'attend',
    vietnameseMeaning: 'tham dự, chú ý',
    verb: { word: 'attend', suffix: 'động từ gốc', meaning: 'tham dự hội nghị/cuộc họp' },
    noun: { word: 'attention', suffix: '-tion (đuôi danh từ sự chú ý)', meaning: 'sự chú ý, tập trung' },
    adjective: { word: 'attentive', suffix: '-ive (đuôi tính từ chăm chú lắng nghe)', meaning: 'chu đáo, chăm chú' },
    adverb: { word: 'attentively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách chăm chú' },
  },
  {
    root: 'negotiate',
    vietnameseMeaning: 'thương lượng, đàm phán',
    verb: { word: 'negotiate', suffix: '-ate (đuôi động từ đàm phán)', meaning: 'đàm phán hợp đồng' },
    noun: { word: 'negotiation', suffix: '-tion (đuôi danh từ cuộc thương lượng)', meaning: 'cuộc đàm phán, thương lượng' },
    adjective: { word: 'negotiable', suffix: '-able (đuôi tính từ có thể thương lượng được)', meaning: 'có thể thương lượng' },
    adverb: { word: 'negotiably', suffix: '-ly (đuôi trạng từ)', meaning: 'theo cách thương lượng được' },
  },
  {
    root: 'require',
    vietnameseMeaning: 'yêu cầu, đòi hỏi',
    verb: { word: 'require', suffix: 'động từ gốc', meaning: 'đòi hỏi, bắt buộc' },
    noun: { word: 'requirement', suffix: '-ment (đuôi danh từ yêu cầu bắt buộc)', meaning: 'yêu cầu, điều kiện tiên quyết' },
    adjective: { word: 'requisite', suffix: '-ite (đuôi tính từ cần thiết)', meaning: 'cần thiết, đòi hỏi phải có' },
    adverb: { word: 'requisitely', suffix: '-ly (đuôi trạng từ)', meaning: 'theo yêu cầu cần thiết' },
  },
  {
    root: 'accept',
    vietnameseMeaning: 'chấp thuận, tiếp nhận',
    verb: { word: 'accept', suffix: 'động từ gốc', meaning: 'chấp nhận lời đề nghị' },
    noun: { word: 'acceptance', suffix: '-ance (đuôi danh từ sự đồng thuận)', meaning: 'sự chấp nhận, tiếp nhận' },
    adjective: { word: 'acceptable', suffix: '-able (đuôi tính từ có thể chấp nhận được)', meaning: 'chấp nhận được, thỏa đáng' },
    adverb: { word: 'acceptably', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách chấp nhận được' },
  },
  {
    root: 'employ',
    vietnameseMeaning: 'tuyển dụng, thuê mướn',
    verb: { word: 'employ', suffix: 'động từ gốc', meaning: 'thuê nhân sự, sử dụng lao động' },
    noun: { word: 'employment', suffix: '-ment (đuôi danh từ việc làm)', meaning: 'việc làm, sự tuyển dụng' },
    adjective: { word: 'employable', suffix: '-able (đuôi tính từ có đủ kỹ năng tuyển dụng)', meaning: 'có khả năng làm việc' },
    adverb: { word: 'employably', suffix: '-ly (đuôi trạng từ)', meaning: 'theo hướng có thể tuyển dụng' },
  },
  {
    root: 'assess',
    vietnameseMeaning: 'định giá, đánh giá',
    verb: { word: 'assess', suffix: 'động từ gốc', meaning: 'đánh giá tình hình/năng lực' },
    noun: { word: 'assessment', suffix: '-ment (đuôi danh từ sự đánh giá)', meaning: 'sự thẩm định, đánh giá' },
    adjective: { word: 'assessable', suffix: '-able (đuôi tính từ có thể đánh giá được)', meaning: 'có thể định giá được' },
    adverb: { word: 'assessably', suffix: '-ly (đuôi trạng từ)', meaning: 'theo cách thẩm định được' },
  },
  {
    root: 'conclude',
    vietnameseMeaning: 'kết luận, chấm dứt',
    verb: { word: 'conclude', suffix: 'động từ gốc', meaning: 'kết luận cuộc họp/hợp đồng' },
    noun: { word: 'conclusion', suffix: '-sion (đuôi danh từ lời kết luận)', meaning: 'phần kết luận, sự kết thúc' },
    adjective: { word: 'conclusive', suffix: '-ive (đuôi tính từ có tính thuyết phục cao/rõ ràng)', meaning: 'có tính quyết định, thuyết phục' },
    adverb: { word: 'conclusively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách thuyết phục, chắc chắn' },
  },
  {
    root: 'authorize',
    vietnameseMeaning: 'ủy quyền, cho phép',
    verb: { word: 'authorize', suffix: '-ize (đuôi động từ cho phép chính thức)', meaning: 'cấp phép, ủy quyền' },
    noun: { word: 'authorization', suffix: '-tion (đuôi danh từ giấy phép/sự ủy quyền)', meaning: 'sự ủy quyền, phê duyệt' },
    adjective: { word: 'authoritative', suffix: '-ive (đuôi tính từ có thẩm quyền/uy tín)', meaning: 'có thẩm quyền, đáng tin cậy' },
    adverb: { word: 'authoritatively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách có thẩm quyền' },
  },
  {
    root: 'commit',
    vietnameseMeaning: 'cam kết, tận tụy',
    verb: { word: 'commit', suffix: 'động từ gốc', meaning: 'cam kết, gắn bó' },
    noun: { word: 'commitment', suffix: '-ment (đuôi danh từ sự cam kết)', meaning: 'lời cam kết, sự tận tâm' },
    adjective: { word: 'committed', suffix: '-ed (đuôi tính từ tận tụy/cam kết)', meaning: 'tận tâm, hết lòng' },
    adverb: { word: 'committedly', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách tận tụy' },
  },
  {
    root: 'qualify',
    vietnameseMeaning: 'đạt tiêu chuẩn, đủ điều kiện',
    verb: { word: 'qualify', suffix: '-ify (đuôi động từ đủ tư cách)', meaning: 'đủ điều kiện, đáp ứng tiêu chuẩn' },
    noun: { word: 'qualification', suffix: '-tion (đuôi danh từ bằng cấp, trình độ)', meaning: 'văn bằng, phẩm chất chuyên môn' },
    adjective: { word: 'qualified', suffix: '-ed (đuôi tính từ có đủ năng lực)', meaning: 'đủ điều kiện, có năng lực' },
    adverb: { word: 'qualifiedly', suffix: '-ly (đuôi trạng từ)', meaning: 'với điều kiện nhất định' },
  },
  {
    root: 'recommend',
    vietnameseMeaning: 'tiến cử, khuyên bảo',
    verb: { word: 'recommend', suffix: 'động từ gốc', meaning: 'gợi ý, đề xuất giải pháp' },
    noun: { word: 'recommendation', suffix: '-tion (đuôi danh từ thư giới thiệu/lời khuyên)', meaning: 'thư giới thiệu, lời khuyên' },
    adjective: { word: 'recommendable', suffix: '-able (đuôi tính từ đáng khen ngợi)', meaning: 'rất đáng khuyên dùng' },
    adverb: { word: 'recommendably', suffix: '-ly (đuôi trạng từ)', meaning: 'theo cách đáng đề xuất' },
  },
  {
    root: 'represent',
    vietnameseMeaning: 'đại diện, tượng trưng',
    verb: { word: 'represent', suffix: 'động từ gốc', meaning: 'đại diện cho công ty' },
    noun: { word: 'representation', suffix: '-tion (đuôi danh từ sự đại diện)', meaning: 'sự đại diện, quyền đại diện' },
    adjective: { word: 'representative', suffix: '-ive (đuôi tính từ tiêu biểu, đại diện)', meaning: 'tiêu biểu, đại diện' },
    adverb: { word: 'representatively', suffix: '-ly (đuôi trạng từ)', meaning: 'mang tính đại diện' },
  },
  {
    root: 'analyze',
    vietnameseMeaning: 'phân tích dữ liệu',
    verb: { word: 'analyze', suffix: '-ze (đuôi động từ phân tích)', meaning: 'phân tích số liệu thị trường' },
    noun: { word: 'analysis', suffix: '-sis (đuôi danh từ bản phân tích)', meaning: 'bản báo cáo phân tích' },
    adjective: { word: 'analytical', suffix: '-al (đuôi tính từ có đầu óc phân tích)', meaning: 'thuộc về phân tích, sắc sảo' },
    adverb: { word: 'analytically', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách có phân tích' },
  },
  {
    root: 'evaluate',
    vietnameseMeaning: 'định giá, đánh giá năng lực',
    verb: { word: 'evaluate', suffix: '-ate (đuôi động từ đánh giá)', meaning: 'đánh giá kết quả kinh doanh' },
    noun: { word: 'evaluation', suffix: '-tion (đuôi danh từ kỳ đánh giá)', meaning: 'bản đánh giá, sự thẩm định' },
    adjective: { word: 'evaluative', suffix: '-ive (đuôi tính từ mang tính định giá)', meaning: 'mang tính đánh giá' },
    adverb: { word: 'evaluatively', suffix: '-ly (đuôi trạng từ)', meaning: 'theo lối đánh giá' },
  },
  {
    root: 'direct',
    vietnameseMeaning: 'chỉ đạo, hướng dẫn',
    verb: { word: 'direct', suffix: 'động từ gốc', meaning: 'chỉ đạo chiến dịch, hướng dẫn' },
    noun: { word: 'direction', suffix: '-tion (đuôi danh từ phương hướng/sự chỉ dẫn)', meaning: 'phương hướng, sự chỉ đạo' },
    adjective: { word: 'directional', suffix: '-al (đuôi tính từ chỉ hướng, định hướng)', meaning: 'mang tính định hướng, chỉ đạo' },
    adverb: { word: 'directly', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách trực tiếp, ngay lập tức' },
  },
  {
    root: 'inspect',
    vietnameseMeaning: 'thanh tra, kiểm tra kỹ thuật',
    verb: { word: 'inspect', suffix: 'động từ gốc', meaning: 'kiểm tra máy móc, thanh tra quy trình' },
    noun: { word: 'inspection', suffix: '-tion (đuôi danh từ cuộc thanh tra)', meaning: 'đợt kiểm tra, thanh tra chất lượng' },
    adjective: { word: 'inspectoral', suffix: '-al (đuôi tính từ thuộc về thanh tra)', meaning: 'thuộc về công tác thanh tra' },
    adverb: { word: 'inspectorally', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt thanh tra' },
  },
  {
    root: 'distribute',
    vietnameseMeaning: 'phân phối, giao phát hàng hóa',
    verb: { word: 'distribute', suffix: 'động từ gốc', meaning: 'phân phối sản phẩm tới đại lý' },
    noun: { word: 'distribution', suffix: '-tion (đuôi danh từ mạng lưới phân phối)', meaning: 'sự phân phối, kênh phân phối' },
    adjective: { word: 'distributive', suffix: '-ive (đuôi tính từ mang tính phân bổ)', meaning: 'thuộc về phân phối' },
    adverb: { word: 'distributively', suffix: '-ly (đuôi trạng từ)', meaning: 'theo từng phần phân phối' },
  },
  {
    root: 'promote',
    vietnameseMeaning: 'quảng bá, thăng chức',
    verb: { word: 'promote', suffix: 'động từ gốc', meaning: 'thăng chức cho nhân viên, quảng bá' },
    noun: { word: 'promotion', suffix: '-tion (đuôi danh từ sự thăng chức / khuyến mại)', meaning: 'sự thăng tiến, chương trình khuyến mãi' },
    adjective: { word: 'promotional', suffix: '-al (đuôi tính từ quảng cáo)', meaning: 'mang tính quảng bá, ưu đãi' },
    adverb: { word: 'promotionally', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt khuyến mại' },
  },
  {
    root: 'finance',
    vietnameseMeaning: 'tài trợ, tài chính',
    verb: { word: 'finance', suffix: 'động từ gốc', meaning: 'cung cấp vốn, tài trợ dự án' },
    noun: { word: 'financing', suffix: '-ing (đuôi danh từ sự cấp vốn, gói tài trợ)', meaning: 'sự cấp vốn, tài trợ tài chính' },
    adjective: { word: 'financial', suffix: '-al (đuôi tính từ thuộc về tiền tệ/tài chính)', meaning: 'thuộc về tài chính' },
    adverb: { word: 'financially', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt tài chính' },
  },
  {
    root: 'construct',
    vietnameseMeaning: 'xây dựng công trình',
    verb: { word: 'construct', suffix: 'động từ gốc', meaning: 'thi công xây dựng dự án' },
    noun: { word: 'construction', suffix: '-tion (đuôi danh từ công trình xây dựng)', meaning: 'công trường xây dựng, sự thi công' },
    adjective: { word: 'constructive', suffix: '-ive (đuôi tính từ mang tính xây dựng, tích cực)', meaning: 'mang tính xây dựng, hữu ích' },
    adverb: { word: 'constructively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách mang tính xây dựng' },
  },
  {
    root: 'coordinate',
    vietnameseMeaning: 'điều phối công việc',
    verb: { word: 'coordinate', suffix: '-ate (đuôi động từ phối hợp)', meaning: 'điều phối lịch trình các nhóm' },
    noun: { word: 'coordination', suffix: '-tion (đuôi danh từ sự điều phối)', meaning: 'sự phối hợp, điều phối' },
    adjective: { word: 'coordinative', suffix: '-ive (đuôi tính từ có tính phối hợp)', meaning: 'có tính liên kết điều phối' },
    adverb: { word: 'coordinatively', suffix: '-ly (đuôi trạng từ)', meaning: 'theo cách thức phối hợp' },
  },
  {
    root: 'invest',
    vietnameseMeaning: 'đầu tư tài chính',
    verb: { word: 'invest', suffix: 'động từ gốc (invest in)', meaning: 'rót vốn đầu tư' },
    noun: { word: 'investment', suffix: '-ment (đuôi danh từ khoản đầu tư)', meaning: 'khoản vốn đầu tư' },
    adjective: { word: 'investable', suffix: '-able (đuôi tính từ có tiềm năng đầu tư)', meaning: 'đáng để rót vốn' },
    adverb: { word: 'investably', suffix: '-ly (đuôi trạng từ)', meaning: 'theo hướng có thể đầu tư' },
  },
  {
    root: 'satisfy',
    vietnameseMeaning: 'thỏa mãn, làm hài lòng khách hàng',
    verb: { word: 'satisfy', suffix: '-fy (đuôi động từ làm hài lòng)', meaning: 'đáp ứng nhu cầu khách hàng' },
    noun: { word: 'satisfaction', suffix: '-tion (đuôi danh từ sự hài lòng)', meaning: 'mức độ hài lòng của khách' },
    adjective: { word: 'satisfactory', suffix: '-ory (đuôi tính từ thỏa đáng)', meaning: 'đạt yêu cầu, thỏa đáng' },
    adverb: { word: 'satisfactorily', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách thỏa đáng' },
  },
  {
    root: 'predict',
    vietnameseMeaning: 'dự báo xu hướng',
    verb: { word: 'predict', suffix: 'động từ gốc', meaning: 'tiên đoán xu hướng thị trường' },
    noun: { word: 'prediction', suffix: '-tion (đuôi danh từ dự báo)', meaning: 'lời dự báo, số liệu tiên đoán' },
    adjective: { word: 'predictable', suffix: '-able (đuôi tính từ có thể đoán trước)', meaning: 'có thể dự đoán được' },
    adverb: { word: 'predictably', suffix: '-ly (đuôi trạng từ)', meaning: 'đúng như dự đoán' },
  },
  {
    root: 'specialize',
    vietnameseMeaning: 'chuyên môn hóa',
    verb: { word: 'specialize', suffix: '-ize (đuôi động từ chuyên môn hóa, đi với in)', meaning: 'chuyên sâu về một lĩnh vực' },
    noun: { word: 'specialization', suffix: '-tion (đuôi danh từ chuyên ngành)', meaning: 'chuyên ngành, sự chuyên môn' },
    adjective: { word: 'specialized', suffix: '-ed (đuôi tính từ chuyên biệt)', meaning: 'mang tính chuyên dụng, đặc thù' },
    adverb: { word: 'specializedly', suffix: '-ly (đuôi trạng từ)', meaning: 'về mặt chuyên môn đặc thù' },
  },
  {
    root: 'maintain',
    vietnameseMeaning: 'bảo trì, duy trì phong độ',
    verb: { word: 'maintain', suffix: 'động từ gốc', meaning: 'bảo dưỡng định kỳ, duy trì chất lượng' },
    noun: { word: 'maintenance', suffix: '-ance (đuôi danh từ sự bảo trì thiết bị)', meaning: 'công tác bảo trì, tu bổ' },
    adjective: { word: 'maintainable', suffix: '-able (đuôi tính từ dễ bảo dưỡng)', meaning: 'có thể duy trì, dễ sửa chữa' },
    adverb: { word: 'maintainably', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách bền vững, dễ bảo trì' },
  },
  {
    root: 'cooperate',
    vietnameseMeaning: 'hợp tác, chung sức',
    verb: { word: 'cooperate', suffix: '-ate (đuôi động từ hợp tác)', meaning: 'hợp tác cùng đối tác' },
    noun: { word: 'cooperation', suffix: '-tion (đuôi danh từ sự cộng tác)', meaning: 'mối quan hệ hợp tác' },
    adjective: { word: 'cooperative', suffix: '-ive (đuôi tính từ có tinh thần hợp tác)', meaning: 'sẵn lòng hợp tác, tương trợ' },
    adverb: { word: 'cooperatively', suffix: '-ly (đuôi trạng từ)', meaning: 'một cách phối hợp chặt chẽ' },
  }
];

export function getWordFamilyByRoot(root: string): WordFamily | undefined {
  return SEED_WORD_FAMILIES.find(f => f.root.toLowerCase() === root.toLowerCase());
}

export type TargetPos = 'verb' | 'noun' | 'adjective' | 'adverb';

const POS_LABELS: Record<TargetPos, { vi: string; en: string; tip: string }> = {
  verb: {
    vi: 'Động từ (Verb)',
    en: 'Verb',
    tip: 'Động từ thường có đuôi nhận biết: -ize, -ise, -ify, -ate, -en hoặc là dạng từ gốc ngắn nhất!'
  },
  noun: {
    vi: 'Danh từ (Noun)',
    en: 'Noun',
    tip: 'Danh từ thường có các đuôi phổ biến: -tion, -sion, -ment, -ness, -ity, -ance, -ence, -er, -or!'
  },
  adjective: {
    vi: 'Tính từ (Adjective)',
    en: 'Adjective',
    tip: 'Tính từ thường có các đuôi: -ive, -able, -ible, -ful, -less, -ous, -ic, -al!'
  },
  adverb: {
    vi: 'Trạng từ (Adverb)',
    en: 'Adverb',
    tip: 'Trạng từ cực kỳ dễ nhận biết vì 95% có đuôi -LY (Tính từ + ly = Trạng từ)!'
  }
};

/**
 * Generates direct part of speech identification questions:
 * "Từ nào dưới đây là ĐỘNG TỪ (Verb)?"
 * Choices A, B, C, D contain the 4 forms of a single word family!
 */
export function generateWordFamilyQuestions(targetPos: TargetPos): Question[] {
  const targetMeta = POS_LABELS[targetPos];

  return SEED_WORD_FAMILIES.map((family, idx) => {
    // 4 forms
    const forms: { pos: TargetPos; detail: WordFormDetail }[] = [
      { pos: 'verb', detail: family.verb },
      { pos: 'noun', detail: family.noun },
      { pos: 'adjective', detail: family.adjective },
      { pos: 'adverb', detail: family.adverb },
    ];

    // Fixed or pseudo-random option assignment
    // Map to A, B, C, D
    const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    
    // Shift order based on index so the correct answer isn't always at the same letter
    const shiftedForms = [...forms];
    const shiftCount = idx % 4;
    for (let s = 0; s < shiftCount; s++) {
      const first = shiftedForms.shift();
      if (first) shiftedForms.push(first);
    }

    let correctKey: 'A' | 'B' | 'C' | 'D' = 'A';
    const options: Option[] = [];
    const whyIncorrect: Record<string, string> = {};

    shiftedForms.forEach((f, formIdx) => {
      const key = keys[formIdx];
      options.push({
        key,
        text: f.detail.word,
      });

      if (f.pos === targetPos) {
        correctKey = key;
      } else {
        const otherPosName = POS_LABELS[f.pos].vi;
        whyIncorrect[key] = `'${f.detail.word}' là ${otherPosName} (dấu hiệu: ${f.detail.suffix}), mang nghĩa: "${f.detail.meaning}".`;
      }
    });

    const targetDetail = family[targetPos];

    return {
      id: `q_wf_identify_${targetPos}_${family.root}`,
      category: 'word-form',
      clueGroup: `suffix-${targetPos}` as any,
      sentence: `Từ nào dưới đây là ${targetMeta.vi}? (Gốc từ: '${family.root}' - ${family.vietnameseMeaning})`,
      options,
      correctAnswer: correctKey,
      explanation: {
        translation: `Từ gốc '${family.root}' mang nghĩa là '${family.vietnameseMeaning}'. Trong 4 đáp án trên, '${targetDetail.word}' là ${targetMeta.vi}.`,
        keySignal: `Dấu hiệu nhận biết: ${targetDetail.suffix}`,
        whyCorrect: `'${targetDetail.word}' là ${targetMeta.vi} chính xác vì có dấu hiệu nhận biết '${targetDetail.suffix}', mang nghĩa là '${targetDetail.meaning}'.`,
        whyIncorrect,
        fastTip: targetMeta.tip,
      }
    };
  });
}

export interface WordFormCompletionOptions {
  count?: number;
  targetPos?: TargetPos | 'all';
  excludeIds?: string[];
}

interface PosSentenceTemplate {
  pos: TargetPos;
  sentence: string;
  translation: (family: WordFamily) => string;
  clueSignal: string;
  whyCorrectReason: (detail: WordFormDetail) => string;
  fastTip: string;
}

const POS_SENTENCE_TEMPLATES: PosSentenceTemplate[] = [
  // NOUN TEMPLATES
  {
    pos: 'noun',
    sentence: 'The executive committee announced the official _____ of the new corporate branch in Singapore.',
    translation: (f) => `Ủy ban điều hành đã công bố chính thức việc ${f.noun.meaning} chi nhánh doanh nghiệp mới tại Singapore.`,
    clueSignal: 'Vị trí chỗ trống đứng sau tính từ "official" và trước giới từ "of" -> Cần một DANH TỪ (Noun).',
    whyCorrectReason: (d) => `"${d.word}" là Danh từ chính xác (dấu hiệu: ${d.suffix}), đóng vai trò làm tân ngữ sau tính từ "official".`,
    fastTip: 'Đứng sau Tính từ hoặc mạo từ "the/a/an" + trước "of" -> 100% chọn DANH TỪ!'
  },
  {
    pos: 'noun',
    sentence: 'Staff members are required to submit their written _____ to the human resources department by noon.',
    translation: (f) => `Các nhân viên được yêu cầu nộp văn bản ${f.noun.meaning} cho phòng nhân sự trước buổi trưa.`,
    clueSignal: 'Đứng sau tính từ sở hữu "their" và tính từ "written" -> Bắt buộc là một DANH TỪ.',
    whyCorrectReason: (d) => `"${d.word}" là Danh từ (dấu hiệu: ${d.suffix}), hoàn thành cụm danh từ "their written _____".`,
    fastTip: 'Tính từ sở hữu (my/your/their/our/his/her) + (Tính từ) + _____ -> Chọn DANH TỪ!'
  },

  // VERB TEMPLATES
  {
    pos: 'verb',
    sentence: 'To improve operational efficiency, the project team must _____ the existing logistics procedures.',
    translation: (f) => `Để nâng cao hiệu quả vận hành, nhóm dự án phải ${f.verb.meaning} các quy trình hậu cần hiện có.`,
    clueSignal: 'Đứng ngay sau động từ khiếm khuyết (Modal Verb) "must" -> Bắt buộc là ĐỘNG TỪ NGUYÊN MẪU (V_inf).',
    whyCorrectReason: (d) => `"${d.word}" là Động từ nguyên mẫu (dấu hiệu: ${d.suffix}), phù hợp hoàn hảo với modal verb "must".`,
    fastTip: 'Sau modal verbs (can, could, should, must, will, may) -> 100% chọn ĐỘNG TỪ NGUYÊN MẪU!'
  },
  {
    pos: 'verb',
    sentence: 'The general director decided to _____ key operational responsibilities across regional managers.',
    translation: (f) => `Tổng giám đốc đã quyết định ${f.verb.meaning} các trách nhiệm vận hành trọng yếu cho các quản lý khu vực.`,
    clueSignal: 'Đứng sau cấu trúc "decided to" (to-infinitive) -> Bắt buộc là ĐỘNG TỪ NGUYÊN MẪU.',
    whyCorrectReason: (d) => `"${d.word}" là Động từ nguyên thể (dấu hiệu: ${d.suffix}), tạo thành cụm "to ${d.word}".`,
    fastTip: 'Cấu trúc "decide to / plan to / hope to" + _____ -> Chọn ngay ĐỘNG TỪ NGUYÊN THỂ!'
  },

  // ADJECTIVE TEMPLATES
  {
    pos: 'adjective',
    sentence: 'The enterprise offers a highly _____ compensation package to attract top engineering talent.',
    translation: (f) => `Doanh nghiệp đưa ra một gói thù lao có tính ${f.adjective.meaning} cao để thu hút nhân tài kỹ thuật hàng đầu.`,
    clueSignal: 'Đứng sau phó từ chỉ mức độ "highly" và đứng trước danh từ "compensation package" -> Cần một TÍNH TỪ.',
    whyCorrectReason: (d) => `"${d.word}" là Tính từ (dấu hiệu: ${d.suffix}), bổ nghĩa cho cụm danh từ phía sau.`,
    fastTip: 'Đứng trước DANH TỪ hoặc sau TRẠNG TỪ (highly/very/extremely) -> Chọn TÍNH TỪ!'
  },
  {
    pos: 'adjective',
    sentence: 'The newly implemented customer feedback system has proven to be extremely _____ for the support team.',
    translation: (f) => `Hệ thống phản hồi khách hàng mới được triển khai đã chứng minh là cực kỳ ${f.adjective.meaning} đối với đội ngũ hỗ trợ.`,
    clueSignal: 'Đứng sau động từ liên kết "proven to be" + phó từ "extremely" -> Cần một TÍNH TỪ.',
    whyCorrectReason: (d) => `"${d.word}" là Tính từ chính xác (dấu hiệu: ${d.suffix}), đóng vai trò làm vị ngữ sau "to be".`,
    fastTip: 'Sau linking verbs (be, become, remain, seem, prove) + phó từ -> Chọn TÍNH TỪ!'
  },

  // ADVERB TEMPLATES
  {
    pos: 'adverb',
    sentence: 'The central database server runs _____ even during peak commercial transaction hours.',
    translation: (f) => `Máy chủ cơ sở dữ liệu trung tâm vận hành ${f.adverb.meaning} ngay cả trong giờ cao điểm giao dịch thương mại.`,
    clueSignal: 'Đứng sau nội động từ "runs" (vận hành) -> Bắt buộc cần một TRẠNG TỪ để bổ nghĩa cho động từ.',
    whyCorrectReason: (d) => `"${d.word}" là Trạng từ chính xác (dấu hiệu: ${d.suffix}), bổ nghĩa cho động từ "runs".`,
    fastTip: 'Đứng sau ĐỘNG TỪ hoặc ở cuối câu bổ nghĩa cho cả hành động -> Chọn ngay TRẠNG TỪ (-LY)!'
  },
  {
    pos: 'adverb',
    sentence: 'The senior compliance officer reviewed the prospective contract terms _____ before granting authorization.',
    translation: (f) => `Cán bộ tuân thủ cấp cao đã xem xét các điều khoản hợp đồng tiềm năng ${f.adverb.meaning} trước khi cấp phép.`,
    clueSignal: 'Bổ nghĩa cho động từ quá khứ "reviewed" -> Cần một TRẠNG TỪ chỉ cách thức.',
    whyCorrectReason: (d) => `"${d.word}" là Trạng từ (dấu hiệu: ${d.suffix}), bổ nghĩa chuẩn mực cho hành động "reviewed".`,
    fastTip: 'Động từ + Tân ngữ + _____ -> 100% chọn TRẠNG TỪ (-ly) để bổ nghĩa cho động từ!'
  }
];

/**
 * Generates realistic TOEIC Part 5 fill-in-the-blank questions
 * targeting specific parts of speech with full sentence contexts.
 */
export function generateWordFormSentenceCompletionQuestions(
  options: WordFormCompletionOptions = {}
): Question[] {
  const { count = 10, targetPos = 'all', excludeIds = [] } = options;
  const excludeSet = new Set(excludeIds);

  const eligibleTemplates = targetPos === 'all' 
    ? POS_SENTENCE_TEMPLATES 
    : POS_SENTENCE_TEMPLATES.filter(t => t.pos === targetPos);

  const result: Question[] = [];
  let familyIdx = 0;
  let attempts = 0;
  const maxAttempts = count * 20;

  while (result.length < count && attempts < maxAttempts) {
    const family = SEED_WORD_FAMILIES[familyIdx % SEED_WORD_FAMILIES.length];
    const template = eligibleTemplates[(familyIdx * 3 + 1) % eligibleTemplates.length];
    const questionId = `q_wf_sent_${template.pos}_${family.root}_${familyIdx}`;

    if (!excludeSet.has(questionId)) {
      const targetDetail = family[template.pos];

      // 4 choices from family
      const forms: { pos: TargetPos; detail: WordFormDetail }[] = [
        { pos: 'verb', detail: family.verb },
        { pos: 'noun', detail: family.noun },
        { pos: 'adjective', detail: family.adjective },
        { pos: 'adverb', detail: family.adverb },
      ];

      const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      const correctSlot = familyIdx % 4;
      const correctKey = keys[correctSlot];

      const optionsArray: Option[] = [];
      const whyInc: Record<string, string> = {};

      // Place target at correctSlot, others around
      const otherForms = forms.filter(f => f.pos !== template.pos);
      let otherIdx = 0;

      keys.forEach((key, kIdx) => {
        if (kIdx === correctSlot) {
          optionsArray.push({ key, text: targetDetail.word });
        } else {
          const other = otherForms[otherIdx++];
          optionsArray.push({ key, text: other.detail.word });
          const otherPosName = POS_LABELS[other.pos].vi;
          whyInc[key] = `"${other.detail.word}" là ${otherPosName} (${other.detail.suffix}), không đúng từ loại mà chỗ trống yêu cầu.`;
        }
      });

      result.push({
        id: questionId,
        category: 'word-form',
        clueGroup: `suffix-${template.pos}` as any,
        sentence: template.sentence,
        options: optionsArray,
        correctAnswer: correctKey,
        explanation: {
          translation: template.translation(family),
          keySignal: template.clueSignal,
          whyCorrect: template.whyCorrectReason(targetDetail),
          whyIncorrect: whyInc,
          fastTip: template.fastTip
        }
      });

      excludeSet.add(questionId);
    }

    familyIdx++;
    attempts++;
  }

  return result;
}
