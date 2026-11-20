import { Question, Option } from '@/types';
import { TenseId, ALL_12_TENSES_METADATA } from './tensesEngine';

interface SubjectTemplate {
  text: string;
  isPlural: boolean;
  meaning: string;
}

interface VerbTemplate {
  base: string;
  s: string;
  past: string;
  pp: string;
  ing: string;
  meaning: string;
  objects: Array<{ en: string; vi: string }>;
}

interface TenseSignalTemplate {
  tenseId: TenseId;
  signalEn: string;
  signalVi: string;
  position: 'end' | 'start' | 'mid';
}

const BUSINESS_SUBJECTS: SubjectTemplate[] = [
  { text: 'The executive director', isPlural: false, meaning: 'Giám đốc điều hành' },
  { text: 'The compliance officer', isPlural: false, meaning: 'Cán bộ tuân thủ' },
  { text: 'The regional branch manager', isPlural: false, meaning: 'Trưởng chi nhánh khu vực' },
  { text: 'The chief information officer', isPlural: false, meaning: 'Giám đốc công nghệ thông tin' },
  { text: 'The lead financial analyst', isPlural: false, meaning: 'Chuyên viên phân tích tài chính trưởng' },
  { text: 'The quality assurance director', isPlural: false, meaning: 'Giám đốc đảm bảo chất lượng' },
  { text: 'The corporate legal counsel', isPlural: false, meaning: 'Cố vấn pháp lý doanh nghiệp' },
  { text: 'The board of directors', isPlural: false, meaning: 'Hội đồng quản trị' },
  { text: 'The head of logistics', isPlural: false, meaning: 'Trưởng bộ phận hậu cần' },
  { text: 'The vice president of operations', isPlural: false, meaning: 'Phó chủ tịch vận hành' },
  { text: 'The human resources committee', isPlural: false, meaning: 'Ủy ban nhân sự' },
  { text: 'The lead systems architect', isPlural: false, meaning: 'Kiến trúc sư hệ thống trưởng' },
  { text: 'The chief risk analyst', isPlural: false, meaning: 'Chuyên viên phân tích rủi ro trưởng' },
  { text: 'The executive steering committee', isPlural: false, meaning: 'Ban chỉ đạo điều hành' },
  { text: 'The senior procurement coordinator', isPlural: false, meaning: 'Điều phối viên thu mua cấp cao' },
  { text: 'The brand communications director', isPlural: false, meaning: 'Giám đốc truyền thông thương hiệu' },
  { text: 'The marketing specialists', isPlural: true, meaning: 'Các chuyên viên tiếp thị' },
  { text: 'The senior engineers', isPlural: true, meaning: 'Các kỹ sư cấp cao' },
  { text: 'The external auditors', isPlural: true, meaning: 'Các kiểm toán viên độc lập' },
  { text: 'Department representatives', isPlural: true, meaning: 'Đại diện các phòng ban' },
  { text: 'International suppliers', isPlural: true, meaning: 'Các nhà cung cấp quốc tế' },
  { text: 'The project coordinators', isPlural: true, meaning: 'Các điều phối viên dự án' },
  { text: 'Software maintenance teams', isPlural: true, meaning: 'Các đội bảo trì phần mềm' },
  { text: 'Regional sales representatives', isPlural: true, meaning: 'Các đại diện kinh doanh khu vực' },
  { text: 'Supply chain supervisors', isPlural: true, meaning: 'Các giám sát viên chuỗi cung ứng' },
  { text: 'Overseas trade delegations', isPlural: true, meaning: 'Các phái đoàn thương mại quốc tế' },
  { text: 'Independent financial consultants', isPlural: true, meaning: 'Các cố vấn tài chính độc lập' },
  { text: 'Facility maintenance technicians', isPlural: true, meaning: 'Các kỹ thuật viên bảo trì cơ sở' },
  { text: 'Branch office supervisors', isPlural: true, meaning: 'Các giám sát viên văn phòng chi nhánh' },
  { text: 'Product development specialists', isPlural: true, meaning: 'Các chuyên viên phát triển sản phẩm' }
];

const BUSINESS_VERBS: VerbTemplate[] = [
  {
    base: 'review',
    s: 'reviews',
    past: 'reviewed',
    pp: 'reviewed',
    ing: 'reviewing',
    meaning: 'đánh giá / xem xét',
    objects: [
      { en: 'the quarterly financial statements', vi: 'các báo cáo tài chính quý' },
      { en: 'the proposed merger terms', vi: 'các điều khoản sáp nhập đề xuất' },
      { en: 'the annual operating budget', vi: 'ngân sách vận hành hàng năm' }
    ]
  },
  {
    base: 'implement',
    s: 'implements',
    past: 'implemented',
    pp: 'implemented',
    ing: 'implementing',
    meaning: 'triển khai / áp dụng',
    objects: [
      { en: 'the upgraded cybersecurity protocols', vi: 'các giao thức an ninh mạng nâng cấp' },
      { en: 'the streamlined procurement workflow', vi: 'quy trình mua sắm tinh gọn' },
      { en: 'the energy-saving measures', vi: 'các giải pháp tiết kiệm năng lượng' }
    ]
  },
  {
    base: 'finalize',
    s: 'finalizes',
    past: 'finalized',
    pp: 'finalized',
    ing: 'finalizing',
    meaning: 'hoàn tất / chốt lại',
    objects: [
      { en: 'the commercial lease contract', vi: 'hợp đồng thuê mặt bằng thương mại' },
      { en: 'the partnership agreement with overseas distributors', vi: 'thỏa thuận đối tác với nhà phân phối quốc tế' },
      { en: 'the marketing campaign strategy', vi: 'chiến lược chiến dịch tiếp thị' }
    ]
  },
  {
    base: 'conduct',
    s: 'conducts',
    past: 'conducted',
    pp: 'conducted',
    ing: 'conducting',
    meaning: 'tiến hành / thực hiện',
    objects: [
      { en: 'a thorough audit of company expenditures', vi: 'cuộc kiểm toán kỹ lưỡng về các chi phí của công ty' },
      { en: 'an extensive survey on client satisfaction', vi: 'cuộc khảo sát diện rộng về sự hài lòng của khách hàng' },
      { en: 'a performance evaluation for all staff', vi: 'đợt đánh giá hiệu suất cho toàn bộ nhân viên' }
    ]
  },
  {
    base: 'expand',
    s: 'expands',
    past: 'expanded',
    pp: 'expanded',
    ing: 'expanding',
    meaning: 'mở rộng',
    objects: [
      { en: 'overseas business operations into emerging markets', vi: 'hoạt động kinh doanh ra các thị trường mới nổi' },
      { en: 'the production capacity of the main factory', vi: 'năng lực sản xuất của nhà máy chính' },
      { en: 'the nationwide retail distribution network', vi: 'mạng lưới phân phối bán lẻ trên toàn quốc' }
    ]
  },
  {
    base: 'negotiate',
    s: 'negotiates',
    past: 'negotiated',
    pp: 'negotiated',
    ing: 'negotiating',
    meaning: 'đàm phán',
    objects: [
      { en: 'more favorable pricing terms with logistics vendors', vi: 'các điều khoản giá thuận lợi hơn với các đối tác vận tải' },
      { en: 'the exclusive licensing contract', vi: 'hợp đồng cấp phép độc quyền' },
      { en: 'the collective labor contract', vi: 'thỏa ước lao động tập thể' }
    ]
  },
  {
    base: 'upgrade',
    s: 'upgrades',
    past: 'upgraded',
    pp: 'upgraded',
    ing: 'upgrading',
    meaning: 'nâng cấp',
    objects: [
      { en: 'the central database servers', vi: 'các máy chủ cơ sở dữ liệu trung tâm' },
      { en: 'the telecommunication hardware in all offices', vi: 'thiết bị viễn thông tại tất cả văn phòng' },
      { en: 'the internal payroll and HR software', vi: 'phần mềm tính lương và nhân sự nội bộ' }
    ]
  },
  {
    base: 'reorganize',
    s: 'reorganizes',
    past: 'reorganized',
    pp: 'reorganized',
    ing: 'reorganizing',
    meaning: 'tái cơ cấu',
    objects: [
      { en: 'the corporate reporting structure', vi: 'cơ cấu báo cáo trong doanh nghiệp' },
      { en: 'the regional branch hierarchy', vi: 'hệ thống thứ bậc chi nhánh khu vực' },
      { en: 'the client support channels', vi: 'các kênh hỗ trợ khách hàng' }
    ]
  },
  {
    base: 'streamline',
    s: 'streamlines',
    past: 'streamlined',
    pp: 'streamlined',
    ing: 'streamlining',
    meaning: 'tinh gọn hóa',
    objects: [
      { en: 'the inventory management system', vi: 'hệ thống quản lý kho hàng' },
      { en: 'the internal customer billing cycle', vi: 'chu kỳ lập hóa đơn khách hàng nội bộ' },
      { en: 'the product delivery schedule', vi: 'lịch trình giao nhận sản phẩm' }
    ]
  },
  {
    base: 'coordinate',
    s: 'coordinates',
    past: 'coordinated',
    pp: 'coordinated',
    ing: 'coordinating',
    meaning: 'điều phối',
    objects: [
      { en: 'the annual international press briefing', vi: 'buổi họp báo quốc tế thường niên' },
      { en: 'the cross-departmental marketing initiatives', vi: 'các sáng kiến tiếp thị liên phòng ban' },
      { en: 'the employee onboarding workshops', vi: 'các buổi hội thảo chào đón nhân viên mới' }
    ]
  },
  {
    base: 'evaluate',
    s: 'evaluates',
    past: 'evaluated',
    pp: 'evaluated',
    ing: 'evaluating',
    meaning: 'thẩm định / đánh giá',
    objects: [
      { en: 'the commercial viability of the proposed project', vi: 'tính khả thi thương mại của dự án đề xuất' },
      { en: 'the quarterly vendor performance metrics', vi: 'các chỉ số hiệu suất nhà cung cấp hàng quý' },
      { en: 'the updated occupational safety standards', vi: 'các tiêu chuẩn an toàn lao động cập nhật' }
    ]
  },
  {
    base: 'distribute',
    s: 'distributes',
    past: 'distributed',
    pp: 'distributed',
    ing: 'distributing',
    meaning: 'phân phối / gửi phát',
    objects: [
      { en: 'the finalized corporate policy handbooks', vi: 'sổ tay chính sách doanh nghiệp đã hoàn tất' },
      { en: 'the promotional product samples to retail partners', vi: 'các mẫu sản phẩm khuyến mãi cho đối tác bán lẻ' },
      { en: 'the revised employee benefits brochures', vi: 'các tờ rơi phúc lợi nhân viên sửa đổi' }
    ]
  },
  {
    base: 'modernize',
    s: 'modernizes',
    past: 'modernized',
    pp: 'modernized',
    ing: 'modernizing',
    meaning: 'hiện đại hóa',
    objects: [
      { en: 'the assembly line manufacturing robotics', vi: 'robot chế tạo trên dây chuyền lắp ráp' },
      { en: 'the legacy transaction processing servers', vi: 'các máy chủ xử lý giao dịch cũ' },
      { en: 'the warehouse inventory scanner infrastructure', vi: 'hạ tầng máy quét tồn kho nhà kho' }
    ]
  },
  {
    base: 'monitor',
    s: 'monitors',
    past: 'monitored',
    pp: 'monitored',
    ing: 'monitoring',
    meaning: 'theo dõi / giám sát',
    objects: [
      { en: 'the international currency exchange rate fluctuations', vi: 'các biến động tỷ giá hối đoái quốc tế' },
      { en: 'daily factory production efficiency metrics', vi: 'các chỉ số hiệu suất sản xuất nhà máy hàng ngày' },
      { en: 'client feedback and satisfaction ratings', vi: 'phản hồi và đánh giá mức độ hài lòng của khách' }
    ]
  },
  {
    base: 'supervise',
    s: 'supervises',
    past: 'supervised',
    pp: 'supervised',
    ing: 'supervising',
    meaning: 'giám sát / quản lý',
    objects: [
      { en: 'the construction of the new research facility', vi: 'việc xây dựng cơ sở nghiên cứu mới' },
      { en: 'the installation of high-speed fiber cables', vi: 'việc lắp đặt cáp quang tốc độ cao' },
      { en: 'the seasonal intern orientation program', vi: 'chương trình định hướng thực tập sinh theo mùa' }
    ]
  },
  {
    base: 'present',
    s: 'presents',
    past: 'presented',
    pp: 'presented',
    ing: 'presenting',
    meaning: 'trình bày / thuyết trình',
    objects: [
      { en: 'the prospective annual financial forecast', vi: 'dự báo tài chính hàng năm triển vọng' },
      { en: 'the architectural blueprints to prospective investors', vi: 'bản vẽ thiết kế kiến trúc cho nhà đầu tư tiềm năng' },
      { en: 'the quarterly market research conclusions', vi: 'các kết luận nghiên cứu thị trường quý' }
    ]
  },
  {
    base: 'investigate',
    s: 'investigates',
    past: 'investigated',
    pp: 'investigated',
    ing: 'investigating',
    meaning: 'điều tra / làm rõ',
    objects: [
      { en: 'the root causes of the supply chain disruption', vi: 'nguyên nhân gốc rễ của sự gián đoạn chuỗi cung ứng' },
      { en: 'the recent database security anomaly', vi: 'sự cố bất thường về an ninh cơ sở dữ liệu gần đây' },
      { en: 'discrepancies in the annual inventory audit', vi: 'những điểm sai lệch trong cuộc kiểm kê hàng năm' }
    ]
  },
  {
    base: 'standardize',
    s: 'standardizes',
    past: 'standardized',
    pp: 'standardized',
    ing: 'standardizing',
    meaning: 'tiêu chuẩn hóa',
    objects: [
      { en: 'the customer service response protocols', vi: 'các quy trình phản hồi dịch vụ khách hàng' },
      { en: 'the global accounting reporting templates', vi: 'các mẫu báo cáo kế toán toàn cầu' },
      { en: 'the employee evaluation criteria across all branches', vi: 'tiêu chí đánh giá nhân viên trên tất cả chi nhánh' }
    ]
  },
  {
    base: 'accelerate',
    s: 'accelerates',
    past: 'accelerated',
    pp: 'accelerated',
    ing: 'accelerating',
    meaning: 'đẩy nhanh tiến độ',
    objects: [
      { en: 'the rollout of the renewable energy initiative', vi: 'việc triển khai sáng kiến năng lượng tái tạo' },
      { en: 'the pace of technological innovation', vi: 'tốc độ đổi mới công nghệ' },
      { en: 'the shipment of critical industrial supplies', vi: 'việc vận chuyển các vật tư công nghiệp thiết yếu' }
    ]
  },
  {
    base: 'reinforce',
    s: 'reinforces',
    past: 'reinforced',
    pp: 'reinforced',
    ing: 'reinforcing',
    meaning: 'củng cố / siết chặt',
    objects: [
      { en: 'the company commitment to environmental sustainability', vi: 'cam kết của công ty đối với sự bền vững môi trường' },
      { en: 'compliance with federal trade regulations', vi: 'sự tuân thủ các quy định thương mại liên bang' },
      { en: 'client data protection safeguards', vi: 'các biện pháp bảo vệ dữ liệu khách hàng' }
    ]
  }
];

const TENSE_SIGNALS: Record<TenseId, TenseSignalTemplate[]> = {
  'present-simple': [
    { tenseId: 'present-simple', signalEn: 'every quarter', signalVi: 'vào mỗi quý', position: 'end' },
    { tenseId: 'present-simple', signalEn: 'regularly every Monday', signalVi: 'đều đặn vào mỗi thứ Hai', position: 'end' },
    { tenseId: 'present-simple', signalEn: 'routinely', signalVi: 'theo thường lệ', position: 'mid' },
    { tenseId: 'present-simple', signalEn: 'on a monthly basis', signalVi: 'trên cơ sở hàng tháng', position: 'end' },
    { tenseId: 'present-simple', signalEn: 'consistently per company policy', signalVi: 'nhất quán theo chính sách công ty', position: 'end' },
    { tenseId: 'present-simple', signalEn: 'as a standard procedure', signalVi: 'như một quy trình chuẩn', position: 'start' }
  ],
  'present-continuous': [
    { tenseId: 'present-continuous', signalEn: 'currently', signalVi: 'hiện tại đang', position: 'mid' },
    { tenseId: 'present-continuous', signalEn: 'at the moment', signalVi: 'ngay tại thời điểm này', position: 'end' },
    { tenseId: 'present-continuous', signalEn: 'at present', signalVi: 'hiện nay', position: 'start' },
    { tenseId: 'present-continuous', signalEn: 'right now', signalVi: 'ngay bây giờ', position: 'end' },
    { tenseId: 'present-continuous', signalEn: 'for the time being', signalVi: 'trong thời điểm hiện tại', position: 'start' },
    { tenseId: 'present-continuous', signalEn: 'presently', signalVi: 'hiện thời đang', position: 'mid' }
  ],
  'present-perfect': [
    { tenseId: 'present-perfect', signalEn: 'since the beginning of this year', signalVi: 'kể từ đầu năm nay', position: 'end' },
    { tenseId: 'present-perfect', signalEn: 'recently', signalVi: 'gần đây', position: 'mid' },
    { tenseId: 'present-perfect', signalEn: 'already', signalVi: 'đã... rồi', position: 'mid' },
    { tenseId: 'present-perfect', signalEn: 'over the past three months', signalVi: 'trong suốt 3 tháng qua', position: 'end' },
    { tenseId: 'present-perfect', signalEn: 'so far this fiscal year', signalVi: 'cho đến nay trong năm tài chính này', position: 'start' },
    { tenseId: 'present-perfect', signalEn: 'lately', signalVi: 'dạo gần đây', position: 'end' }
  ],
  'present-perfect-continuous': [
    { tenseId: 'present-perfect-continuous', signalEn: 'all morning without any interruption', signalVi: 'suốt cả buổi sáng không hề gián đoạn', position: 'end' },
    { tenseId: 'present-perfect-continuous', signalEn: 'continuously for the past six hours', signalVi: 'liên tục trong suốt 6 giờ qua', position: 'end' },
    { tenseId: 'present-perfect-continuous', signalEn: 'non-stop since early morning', signalVi: 'không ngừng nghỉ kể từ sáng sớm', position: 'end' },
    { tenseId: 'present-perfect-continuous', signalEn: 'for three consecutive weeks now', signalVi: 'suốt 3 tuần liên tiếp cho đến nay', position: 'end' },
    { tenseId: 'present-perfect-continuous', signalEn: 'steadily over the last four hours', signalVi: 'đều đặn trong suốt 4 giờ qua', position: 'end' }
  ],
  'past-simple': [
    { tenseId: 'past-simple', signalEn: 'yesterday afternoon', signalVi: 'vào chiều hôm qua', position: 'end' },
    { tenseId: 'past-simple', signalEn: 'last month', signalVi: 'vào tháng trước', position: 'end' },
    { tenseId: 'past-simple', signalEn: 'two days ago', signalVi: 'hai ngày trước', position: 'end' },
    { tenseId: 'past-simple', signalEn: 'during the previous fiscal year', signalVi: 'trong năm tài chính trước', position: 'end' },
    { tenseId: 'past-simple', signalEn: 'in 2023', signalVi: 'vào năm 2023', position: 'end' },
    { tenseId: 'past-simple', signalEn: 'earlier this morning', signalVi: 'sớm sáng nay', position: 'end' }
  ],
  'past-continuous': [
    { tenseId: 'past-continuous', signalEn: 'when the sudden power outage occurred', signalVi: 'khi sự cố mất điện đột ngột xảy ra', position: 'end' },
    { tenseId: 'past-continuous', signalEn: 'at 10:00 AM yesterday', signalVi: 'vào lúc 10 giờ sáng hôm qua', position: 'start' },
    { tenseId: 'past-continuous', signalEn: 'while the board was reviewing the merger', signalVi: 'trong khi hội đồng quản trị đang xem xét việc sáp nhập', position: 'end' },
    { tenseId: 'past-continuous', signalEn: 'throughout the entire morning yesterday', signalVi: 'trong suốt cả buổi sáng hôm qua', position: 'end' },
    { tenseId: 'past-continuous', signalEn: 'when the building fire alarm sounded', signalVi: 'khi chuông báo cháy tòa nhà vang lên', position: 'end' }
  ],
  'past-perfect': [
    { tenseId: 'past-perfect', signalEn: 'before the formal press conference convened', signalVi: 'trước khi buổi họp báo chính thức diễn ra', position: 'end' },
    { tenseId: 'past-perfect', signalEn: 'by the time the auditors arrived', signalVi: 'vào lúc các kiểm toán viên đến', position: 'start' },
    { tenseId: 'past-perfect', signalEn: 'prior to the board meeting last Tuesday', signalVi: 'trước cuộc họp hội đồng quản trị thứ Ba tuần trước', position: 'start' },
    { tenseId: 'past-perfect', signalEn: 'before the management announced the policy', signalVi: 'trước khi ban quản lý công bố chính sách', position: 'end' },
    { tenseId: 'past-perfect', signalEn: 'until the newly appointed director took office', signalVi: 'cho đến khi giám đốc mới nhậm chức', position: 'end' }
  ],
  'past-perfect-continuous': [
    { tenseId: 'past-perfect-continuous', signalEn: 'for over three hours before the system rebooted', signalVi: 'trong hơn 3 giờ trước khi hệ thống khởi động lại', position: 'end' },
    { tenseId: 'past-perfect-continuous', signalEn: 'continuously for five months prior to the merger', signalVi: 'liên tục trong suốt 5 tháng trước khi sáp nhập', position: 'end' },
    { tenseId: 'past-perfect-continuous', signalEn: 'for nearly two hours when the client arrived', signalVi: 'trong gần 2 giờ đồng hồ khi khách hàng đến', position: 'end' },
    { tenseId: 'past-perfect-continuous', signalEn: 'non-stop for days before the inspection team arrived', signalVi: 'không ngừng nghỉ nhiều ngày trước khi đoàn thanh tra đến', position: 'end' }
  ],
  'future-simple': [
    { tenseId: 'future-simple', signalEn: 'next week', signalVi: 'vào tuần tới', position: 'end' },
    { tenseId: 'future-simple', signalEn: 'tomorrow morning', signalVi: 'vào sáng mai', position: 'end' },
    { tenseId: 'future-simple', signalEn: 'in the upcoming fiscal year', signalVi: 'trong năm tài chính sắp tới', position: 'end' },
    { tenseId: 'future-simple', signalEn: 'shortly after the press conference', signalVi: 'ngay sau buổi họp báo', position: 'end' },
    { tenseId: 'future-simple', signalEn: 'by early next month', signalVi: 'trước đầu tháng tới', position: 'end' }
  ],
  'future-continuous': [
    { tenseId: 'future-continuous', signalEn: 'at this time tomorrow', signalVi: 'vào thời điểm này ngày mai', position: 'start' },
    { tenseId: 'future-continuous', signalEn: 'during the international summit next Friday', signalVi: 'trong suốt hội nghị thượng đỉnh quốc tế thứ Sáu tới', position: 'end' },
    { tenseId: 'future-continuous', signalEn: 'at 3:00 PM next Monday', signalVi: 'vào lúc 3 giờ chiều thứ Hai tới', position: 'start' },
    { tenseId: 'future-continuous', signalEn: 'throughout the upcoming convention week', signalVi: 'trong suốt tuần lễ hội nghị sắp tới', position: 'end' }
  ],
  'future-perfect': [
    { tenseId: 'future-perfect', signalEn: 'by next December', signalVi: 'trước tháng 12 tới', position: 'start' },
    { tenseId: 'future-perfect', signalEn: 'by the time the project deadline arrives', signalVi: 'trước khi thời hạn dự án tới', position: 'start' },
    { tenseId: 'future-perfect', signalEn: 'before the end of this current quarter', signalVi: 'trước khi kết thúc quý hiện tại', position: 'start' },
    { tenseId: 'future-perfect', signalEn: 'prior to the annual shareholders meeting', signalVi: 'trước cuộc họp cổ đông thường niên', position: 'start' }
  ],
  'future-perfect-continuous': [
    { tenseId: 'future-perfect-continuous', signalEn: 'by next month ... for five consecutive years', signalVi: 'tính đến tháng sau... được 5 năm liên tiếp', position: 'end' },
    { tenseId: 'future-perfect-continuous', signalEn: 'for ten full years by this December', signalVi: 'tròn 10 năm vào tháng 12 này', position: 'end' },
    { tenseId: 'future-perfect-continuous', signalEn: 'for three straight months by the time of the review', signalVi: 'được 3 tháng liên tiếp tính đến kỳ đánh giá', position: 'end' }
  ]
};

function getVerbFormForTense(
  verb: VerbTemplate, 
  tenseId: TenseId, 
  isPlural: boolean
): { text: string; formName: string } {
  switch (tenseId) {
    case 'present-simple':
      return { 
        text: isPlural ? verb.base : verb.s, 
        formName: isPlural ? `Hiện tại đơn (nguyên mẫu V_inf)` : `Hiện tại đơn (thêm s: ${verb.s})` 
      };
    case 'present-continuous':
      return { 
        text: isPlural ? `are ${verb.ing}` : `is ${verb.ing}`, 
        formName: `Hiện tại tiếp diễn (${isPlural ? 'are' : 'is'} + V-ing)` 
      };
    case 'present-perfect':
      return { 
        text: isPlural ? `have ${verb.pp}` : `has ${verb.pp}`, 
        formName: `Hiện tại hoàn thành (${isPlural ? 'have' : 'has'} + V3/ed)` 
      };
    case 'present-perfect-continuous':
      return { 
        text: isPlural ? `have been ${verb.ing}` : `has been ${verb.ing}`, 
        formName: `Hiện tại hoàn thành tiếp diễn (${isPlural ? 'have' : 'has'} been + V-ing)` 
      };
    case 'past-simple':
      return { 
        text: verb.past, 
        formName: `Quá khứ đơn (V2/ed)` 
      };
    case 'past-continuous':
      return { 
        text: isPlural ? `were ${verb.ing}` : `was ${verb.ing}`, 
        formName: `Quá khứ tiếp diễn (${isPlural ? 'were' : 'was'} + V-ing)` 
      };
    case 'past-perfect':
      return { 
        text: `had ${verb.pp}`, 
        formName: `Quá khứ hoàn thành (had + V3/ed)` 
      };
    case 'past-perfect-continuous':
      return { 
        text: `had been ${verb.ing}`, 
        formName: `Quá khứ hoàn thành tiếp diễn (had been + V-ing)` 
      };
    case 'future-simple':
      return { 
        text: `will ${verb.base}`, 
        formName: `Tương lai đơn (will + V_inf)` 
      };
    case 'future-continuous':
      return { 
        text: `will be ${verb.ing}`, 
        formName: `Tương lai tiếp diễn (will be + V-ing)` 
      };
    case 'future-perfect':
      return { 
        text: `will have ${verb.pp}`, 
        formName: `Tương lai hoàn thành (will have + V3/ed)` 
      };
    case 'future-perfect-continuous':
      return { 
        text: `will have been ${verb.ing}`, 
        formName: `Tương lai hoàn thành tiếp diễn (will have been + V-ing)` 
      };
  }
}

function getTenseActionMarkerVi(tenseId: TenseId): string {
  switch (tenseId) {
    case 'present-simple':
      return 'đều đặn';
    case 'present-continuous':
      return 'hiện đang';
    case 'present-perfect':
      return 'đã';
    case 'present-perfect-continuous':
      return 'đã và đang liên tục';
    case 'past-simple':
      return 'đã';
    case 'past-continuous':
      return 'lúc đó đang';
    case 'past-perfect':
      return 'đã hoàn tất trước đó';
    case 'past-perfect-continuous':
      return 'đã làm liên tục';
    case 'future-simple':
      return 'sẽ';
    case 'future-continuous':
      return 'sẽ đang';
    case 'future-perfect':
      return 'sẽ hoàn tất';
    case 'future-perfect-continuous':
      return 'sẽ đã làm liên tục';
  }
}

/**
 * Generate a single procedural question for a specific tense
 */
export function generateCombinatorialTenseQuestion(
  tenseId: TenseId, 
  seedIndex: number = 0
): Question {
  const meta = ALL_12_TENSES_METADATA.find(m => m.id === tenseId)!;
  
  // Decoupled coprime strides to maximize variety and avoid repetitions across thousands of questions
  const subjectIdx = (seedIndex * 17 + 5) % BUSINESS_SUBJECTS.length;
  const subject = BUSINESS_SUBJECTS[subjectIdx];

  const verbIdx = (seedIndex * 23 + 11) % BUSINESS_VERBS.length;
  const verb = BUSINESS_VERBS[verbIdx];

  const objIdx = (seedIndex * 31 + 7) % verb.objects.length;
  const obj = verb.objects[objIdx];

  const signals = TENSE_SIGNALS[tenseId] || TENSE_SIGNALS['present-simple'];
  const signalIdx = (seedIndex * 13 + 3) % signals.length;
  const signal = signals[signalIdx];

  const actionMarker = getTenseActionMarkerVi(tenseId);

  // Compose sentence
  let sentence = '';
  let translation = '';

  if (signal.position === 'start') {
    sentence = signal.signalEn.charAt(0).toUpperCase() + signal.signalEn.slice(1) + `, ${subject.text.toLowerCase()} _____ ${obj.en}.`;
    translation = `${signal.signalVi}, ${subject.meaning.toLowerCase()} ${actionMarker} ${verb.meaning} ${obj.vi}.`;
  } else if (signal.position === 'mid') {
    sentence = `${subject.text} ${signal.signalEn} _____ ${obj.en}.`;
    translation = `${subject.meaning} ${signal.signalVi} ${actionMarker} ${verb.meaning} ${obj.vi}.`;
  } else {
    sentence = `${subject.text} _____ ${obj.en} ${signal.signalEn}.`;
    translation = `${subject.meaning} ${actionMarker} ${verb.meaning} ${obj.vi} ${signal.signalVi}.`;
  }

  // Correct answer form
  const correctForm = getVerbFormForTense(verb, tenseId, subject.isPlural);

  // Pick 3 distractors from contrasting tenses
  const distractorTenses: TenseId[] = [
    'present-simple',
    'past-simple',
    'present-continuous',
    'future-simple',
    'present-perfect'
  ].filter(t => t !== tenseId) as TenseId[];

  const distractorForms = distractorTenses.slice(0, 3).map(dt => {
    return {
      tenseId: dt,
      ...getVerbFormForTense(verb, dt, subject.isPlural)
    };
  });

  // Assign to A, B, C, D with rotation based on seedIndex
  const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const correctSlot = seedIndex % 4;
  const correctKey = keys[correctSlot];

  const options: Option[] = [];
  const whyIncorrect: Record<string, string> = {};

  let dIdx = 0;
  keys.forEach((key, kIdx) => {
    if (kIdx === correctSlot) {
      options.push({ key, text: correctForm.text });
    } else {
      const distractor = distractorForms[dIdx++];
      options.push({ key, text: distractor.text });
      const distMeta = ALL_12_TENSES_METADATA.find(m => m.id === distractor.tenseId);
      whyIncorrect[key] = `"${distractor.text}" là thì ${distMeta?.nameVi || distractor.formName}, không phù hợp với dấu hiệu "${signal.signalEn}".`;
    }
  });

  const questionId = `q_comb_${tenseId}_${seedIndex}_${verb.base}_${subject.text.slice(0, 5).replace(/\s+/g, '')}`;

  return {
    id: questionId,
    category: 'tense',
    clueGroup: tenseId as any,
    clueWord: signal.signalEn,
    sentence,
    options,
    correctAnswer: correctKey,
    explanation: {
      translation,
      keySignal: `Dấu hiệu nhận biết: cụm từ "${signal.signalEn}" (${signal.signalVi}).`,
      whyCorrect: `Chủ ngữ "${subject.text}" (${subject.isPlural ? 'số nhiều' : 'số ít'}), kết hợp với dấu hiệu thời gian "${signal.signalEn}" đòi hỏi động từ phải chia ở thì ${meta.nameVi}: "${correctForm.text}".`,
      whyIncorrect,
      fastTip: meta.fastTip
    }
  };
}

export type TenseFilter = TenseId | 'all' | 'group-present' | 'group-past' | 'group-future';

export interface CombinatorialOptions {
  count: number;
  tenseId?: TenseFilter;
  excludeIds?: string[];
}

/**
 * Generate a list of combinatorial tense questions without duplicates
 */
export function generateCombinatorialTenseQuestions(options: CombinatorialOptions): Question[] {
  const { count, tenseId = 'all', excludeIds = [] } = options;
  const excludeSet = new Set(excludeIds);

  const presentTenses: TenseId[] = [
    'present-simple',
    'present-continuous',
    'present-perfect',
    'present-perfect-continuous'
  ];

  const pastTenses: TenseId[] = [
    'past-simple',
    'past-continuous',
    'past-perfect',
    'past-perfect-continuous'
  ];

  const futureTenses: TenseId[] = [
    'future-simple',
    'future-continuous',
    'future-perfect',
    'future-perfect-continuous'
  ];

  const allTenses: TenseId[] = [
    ...presentTenses,
    ...pastTenses,
    ...futureTenses
  ];

  let targetTenses: TenseId[];
  if (tenseId === 'all') {
    targetTenses = allTenses;
  } else if (tenseId === 'group-present') {
    targetTenses = presentTenses;
  } else if (tenseId === 'group-past') {
    targetTenses = pastTenses;
  } else if (tenseId === 'group-future') {
    targetTenses = futureTenses;
  } else {
    targetTenses = [tenseId as TenseId];
  }

  const result: Question[] = [];
  let seed = 0;
  let attempts = 0;
  const maxAttempts = Math.max(500, count * 50);

  while (result.length < count && attempts < maxAttempts) {
    const selectedTense = targetTenses[seed % targetTenses.length];
    const question = generateCombinatorialTenseQuestion(selectedTense, seed);
    
    if (!excludeSet.has(question.id) && !result.some(q => q.sentence === question.sentence)) {
      result.push(question);
      excludeSet.add(question.id);
    }

    seed++;
    attempts++;
  }

  return result;
}
