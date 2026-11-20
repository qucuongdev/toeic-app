# AGENTS.MD - NGUYÊN TẮC PHÁT TRIỂN & CHUẨN MỰC CHẤT LƯỢNG (ANTI-SLOP DIRECTIVES)

> **Dự án**: EngMaster - Nền tảng Học & Luyện thi Tiếng Anh Toàn diện (TOEIC & Grammar Signal Hacks)  
> **Tech Stack**: React 18+ (TypeScript), Vite, Tailwind CSS, shadcn/ui, Zustand, Vitest, Gemini API.  
> **Mục tiêu**: Tuyệt đối không sinh mã nguồn cẩu thả (No AI Slop), chất lượng sản phẩm chuẩn Production, thiết kế đẹp, nghiệp vụ sâu sắc và đúng chuẩn TDD.

---

## 1. NGUYÊN TẮC CHỐNG "AI SLOP" (ANTI-SLOP PROTOCOL)

AI Slop là mã nguồn sơ sài, chắp vá, dùng placeholder giữ chỗ, giao diện vô hồn hoặc dữ liệu mẫu giả tạo. Bất kỳ AI Agent nào làm việc trên repository này **BẮT BUỘC** phải tuân thủ nghiêm ngặt 5 điều răn sau:

### Điều 1: KHÔNG DÙNG PLACEHOLDER / TODO DANG DỞ
* ❌ **CẤM**: Viết `// TODO: implement later`, `// mock logic here`, `/* logic goes here */`, hoặc tạo hàm rỗng `return null`.
* ✅ **BẮT BUỘC**: Mọi tính năng đã viết là phải hoạt động thật 100%, có đầy đủ xử lý ngoại lệ (loading, error, empty state, fallback).

### Điều 2: QUY TRÌNH TDD CHẶT CHẼ (RED -> GREEN -> REFACTOR)
* ❌ **CẤM**: Viết code tính năng trước rồi mới viết test sau một cách đối phó. Cấm viết test nông cạn như `expect(true).toBe(true)`.
* ✅ **BẮT BUỘC**:
  1. Viết Unit Test mô tả đúng nghiệp vụ trước $\rightarrow$ Chạy test thấy **RED** (Fail).
  2. Viết mã nguồn nghiệp vụ tối thiểu để test chuyển sang **GREEN** (Pass).
  3. Refactor tối ưu mã nguồn và kiểm tra lại toàn bộ test suite.
  4. Test phải bao phủ cả trường hợp biên (edge cases), dữ liệu sai, dữ liệu rỗng.

### Điều 3: DỮ LIỆU CÂU HỎI & HỌC TẬP PHẢI CHUẨN XÁC 100%
* ❌ **CẤM**: Sinh câu hỏi vô nghĩa kiểu "This is a _____ sentence. A. good B. bad C. big D. small".
* ✅ **BẮT BUỘC**:
  * Mỗi câu hỏi phải có ngữ cảnh thực tế (chuẩn đề thi TOEIC ETS hoặc tiếng Anh học thuật).
  * **100% Bắt buộc có Bảng Giải Thích Toàn Diện**:
    1. Bản dịch tiếng Việt sát nghĩa.
    2. Dấu hiệu nhận biết then chốt (Key Clue) được định vị chính xác.
    3. Phân tích vì sao đáp án đúng (`whyCorrect`).
    4. Phân tích chi tiết vì sao TẤT CẢ các phương án còn lại SAI (`whyIncorrect` cho từng phương án gây nhiễu).
    5. Mẹo ghi nhớ siêu tốc 5 giây (`fastTip`).

### Điều 4: CHUẨN MỰC GIAO DIỆN (UI/UX & DESIGN SYSTEM)
* ❌ **CẤM**: Giao diện thô sơ, màu sắc lệch chuẩn, vỡ layout trên mobile, thiếu animation mượt mà.
* ✅ **BẮT BUỘC**:
  * Dùng **shadcn/ui** và **Tailwind CSS** có chiều sâu thẩm mỹ (subtle shadows, borders tinh tế, font chữ dễ đọc, rounded corners đồng bộ).
  * Hiệu ứng thị giác thông minh: Dấu hiệu nhận biết phải được bôi màu nổi bật (Neon Highlight), thẻ Flashcard lật 3D mượt mà.
  * Hỗ trợ đầy đủ phím tắt (A/B/C/D để chọn đáp án, Space để lật thẻ, mũi tên để chuyển câu).
  * Tương thích 100% responsive: Hiển thị hoàn hảo trên cả Desktop, Tablet và Mobile.

### Điều 5: KIỂM SOÁT TYPE-SAFETY & BUILD VERCEL
* ❌ **CẤM**: Dùng kiểu `any`, cấm bỏ qua cảnh báo TypeScript (`@ts-ignore` không có lý do chính đáng).
* ✅ **BẮT BUỘC**:
  * Chạy `cmd /c npm run build` (`tsc -b && vite build`) và `cmd /c npm run test:run` trước khi hoàn tất mỗi bước.
  * Cấu hình Vercel SPA routing (`vercel.json`) đầy đủ, không gây lỗi 404 khi người dùng refresh trang.

---

## 2. QUY CHUẨN KIẾN TRÚC MÃ NGUỒN (CODEBASE ARCHITECTURE)

```
src/
├── components/
│   ├── ui/             # shadcn/ui primitives (button, card, dialog, progress...)
│   ├── common/         # Navbar, AudioPlayer, Timer, ClueBadge, ExplanationCard
│   └── layout/         # MainLayout, ExamLayout
├── features/           # Chia theo domain nghiệp vụ
│   ├── signals/        # Dấu hiệu nhận biết, Collocations & Word Forms reflex quiz
│   ├── ai-generator/   # Gemini AI Studio sinh câu hỏi
│   ├── vocabulary/     # Flashcard SRS (Leitner 5-box)
│   ├── dictation/      # Nghe chép chính tả thời gian thực
│   ├── exam/           # Phòng thi thử TOEIC, Question Palette, Timer
│   └── dashboard/      # Thống kê Streak, Sổ tay câu sai (Mistake Notebook)
├── services/           # Nghiệp vụ lõi (Được bao phủ 100% bởi Unit Tests)
│   ├── toeicScorer.ts
│   ├── srsEngine.ts
│   ├── dictationMatcher.ts
│   ├── wordFormChecker.ts
│   ├── collocationEngine.ts
│   └── geminiService.ts
├── stores/             # Zustand state management
├── types/              # TypeScript schemas & contracts
├── data/               # Dữ liệu tĩnh chất lượng cao (Mock & Seed Data)
└── tests/              # Vitest Unit Tests
```

---

## 3. LỆNH THAO TÁC HỆ THỐNG TRÊN MÔI TRƯỜNG WINDOWS (PNPM)

Do hệ thống chạy trên Windows với PowerShell có thể bị hạn chế ExecutionPolicy cho file `.ps1`, **MỌI LỆNH PNPM PHẢI ĐƯỢC CHẠY QUA CMD**:
* Chạy dev: `cmd /c pnpm dev`
* Chạy test: `cmd /c pnpm test:run`
* Chạy build: `cmd /c pnpm build`
* Cài đặt gói: `cmd /c pnpm add <package>` hoặc `cmd /c pnpm install`

---

## 4. CHECKLIST NGHIỆM THU MỖI BƯỚC (ACCEPTANCE CHECKLIST)
- [ ] File Unit Test (RED) được viết trước và fail đúng lý do mong đợi.
- [ ] Code triển khai (GREEN) vừa đủ, sạch, có type rõ ràng.
- [ ] Không có `any`, không có `console.log` thừa.
- [ ] `cmd /c pnpm test:run` pass 100%.
- [ ] `cmd /c pnpm build` thành công không có lỗi type.
- [ ] UI tương thích mobile, có giải thích rõ ràng cho mọi câu hỏi.
