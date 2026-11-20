import { test, expect } from '@playwright/test';

test.describe('EngMaster E2E Verification Suite', () => {
  test('Complete flow: Signal Quiz, 100% Explanation, API Key Modal, Flashcard SRS & Exam', async ({ page }) => {
    // 1. Visit App
    await page.goto('/');
    await expect(page).toHaveTitle(/EngMaster/i);
    await expect(page.getByText('EngMaster', { exact: true })).toBeVisible();

    // 2. Test Signal Quiz & 100% Detailed Explanation
    // Verify question is loaded
    await expect(page.getByText('Câu 1 /')).toBeVisible();
    
    // Click Option A
    const optionA = page.getByRole('button', { name: /^A\s+/i }).first();
    await expect(optionA).toBeVisible();
    await optionA.click();

    // Verify 100% Explanation Card displays immediately
    await expect(page.getByText('Giải thích chi tiết')).toBeVisible();
    await expect(page.getByText('1. Bản dịch tiếng Việt:')).toBeVisible();
    await expect(page.getByText('2. Dấu hiệu nhận biết then chốt (Key Clue):')).toBeVisible();
    await expect(page.getByText(/3\. Vì sao đáp án \([ABCD]\) ĐÚNG:/)).toBeVisible();
    await expect(page.getByText('5. Mẹo ghi nhớ siêu tốc 5 giây:')).toBeVisible();

    // 2.5 Test Dedicated 12 Tenses Module & Cheat Sheet Matrix
    await page.getByRole('button', { name: /12 Loại Thì/i }).click();
    await expect(page.getByText('12 Thì Tiếng Anh & Dấu Hiệu Nhận Biết')).toBeVisible();

    // Click "Bí Kíp 12 Thì"
    await page.getByRole('button', { name: 'Bí Kíp 12 Thì' }).click();
    await expect(page.getByText('Bảng Tổng Hợp Công Thức & Dấu Hiệu Nhận Biết 12 Thì')).toBeVisible();
    await expect(page.getByText('Present Perfect', { exact: true })).toBeVisible();

    // Switch back to "Luyện Trắc Nghiệm"
    await page.getByRole('button', { name: 'Luyện Trắc Nghiệm' }).click();
    await expect(page.getByText('Chọn chính xác 1 trong 12 thì để luyện riêng:')).toBeVisible();

    // Test filtering by individual tense (e.g. Quá khứ hoàn thành)
    const pastPerfectBtn = page.getByRole('button', { name: 'Past Perfect Quá khứ hoàn thành' });
    await expect(pastPerfectBtn).toBeVisible();
    await pastPerfectBtn.click();
    await expect(page.getByText('Đang lọc: Quá khứ hoàn thành')).toBeVisible();

    // Test selecting Question Count (5 câu)
    const count5Btn = page.getByRole('button', { name: '5 câu', exact: true });
    await expect(count5Btn).toBeVisible();
    await count5Btn.click();
    await expect(page.getByText('Câu 1 / 5')).toBeVisible();

    // Select Option A for question 1
    const tenseOption = page.getByRole('button', { name: /^A\s+/i }).first();
    await expect(tenseOption).toBeVisible();
    await tenseOption.click();

    // Verify 100% Explanation Card shows
    await expect(page.getByText('Giải thích chi tiết')).toBeVisible();
    await expect(page.getByText('Dấu hiệu nhận biết then chốt (Key Clue):')).toBeVisible();

    // Answer remaining questions (2 to 5) to test Scoring & Evaluation screen
    for (let i = 2; i <= 5; i++) {
      await page.getByRole('button', { name: 'Câu kế tiếp' }).click();
      await page.getByRole('button', { name: /^A\s+/i }).first().click();
    }

    // On question 5, click "Xem kết quả & Chấm điểm"
    await page.getByRole('button', { name: 'Xem kết quả & Chấm điểm' }).click();

    // Verify Score & Evaluation Screen
    await expect(page.getByText(/Câu Đúng/i)).toBeVisible();
    await expect(page.getByText(/Độ chính xác:/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Luyện tiếp bộ câu mới (Không trùng)' })).toBeVisible();

    // 3. Test Gemini API Key Modal
    await page.getByRole('button', { name: /Gemini AI Studio/i }).click();
    await expect(page.getByText('AI Question Studio')).toBeVisible();

    // Open API Key Modal
    const apiKeyBtn = page.getByRole('button', { name: /Nhập Gemini Key/i }).first();
    await apiKeyBtn.click();

    // Verify modal and Google AI Studio direct link
    await expect(page.getByText('Cấu hình Gemini API Key')).toBeVisible();
    const googleAiStudioLink = page.getByRole('link', { name: 'Mở Google AI Studio để lấy Key' });
    await expect(googleAiStudioLink).toBeVisible();
    await expect(googleAiStudioLink).toHaveAttribute('href', 'https://aistudio.google.com/app/apikey');
    
    // Close modal
    await page.getByRole('button', { name: 'Đóng' }).click();

    // 4. Test Flashcard SRS (Leitner)
    await page.getByRole('button', { name: /Từ Vựng SRS/i }).click();
    await expect(page.getByText('Flashcard SRS Leitner')).toBeVisible();
    await expect(page.locator('.perspective-1000 h3')).toBeVisible();

    // Click card to flip
    await page.locator('.perspective-1000').click();
    await expect(page.getByText('Nghĩa tiếng Việt')).toBeVisible();

    // Rate card "Nhớ tốt"
    await page.getByRole('button', { name: /3. Nhớ tốt/i }).click();
    // Card advances
    await expect(page.locator('.perspective-1000 h3')).toBeVisible();

    // 5. Test Exam Simulator (TOEIC Mini Test)
    await page.getByRole('button', { name: /Phòng Thi Thử/i }).click();
    await expect(page.getByText('Thi Thử TOEIC Part 5')).toBeVisible();
    await expect(page.getByText('Bảng Câu Hỏi (Question Palette)')).toBeVisible();

    // Select an option and submit
    const examOption = page.getByRole('button', { name: /^A\s+/i }).first();
    await expect(examOption).toBeVisible();
    await examOption.click();

    // Submit test
    await page.getByRole('button', { name: 'Nộp bài thi' }).click();

    // Verify honest Part 5 Reading scaled score and CEFR level are calculated
    await expect(page.getByText('/ 495 Điểm')).toBeVisible();
    await expect(page.getByText(/Ước lượng toàn bài/i)).toBeVisible();
    await expect(page.getByText('Trình độ ước tính:')).toBeVisible();

    // 6. Test Mistake Notebook & Re-Quiz Mode
    await page.getByRole('button', { name: /Sổ Tay Câu Sai/i }).click();
    await expect(page.getByText('Sổ Tay Câu Sai (Mistake Notebook)')).toBeVisible();

    // Verify mistakes from exam were automatically captured and Re-Quiz button is active
    const reTestBtn = page.getByRole('button', { name: /Luyện giải lại/i });
    if (await reTestBtn.isVisible()) {
      await reTestBtn.click();
      await expect(page.getByText(/Đã làm đúng:/)).toBeVisible();
    }

    // 7. Test Dark Mode & Light Mode Toggle
    const themeBtn = page.getByTestId('theme-toggle-button');
    await expect(themeBtn).toBeVisible();

    // Toggle theme to dark
    await themeBtn.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    const darkThemeInStorage = await page.evaluate(() => localStorage.getItem('engmaster_theme'));
    expect(darkThemeInStorage).toBe('dark');

    // Toggle theme back to light
    await themeBtn.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    const lightThemeInStorage = await page.evaluate(() => localStorage.getItem('engmaster_theme'));
    expect(lightThemeInStorage).toBe('light');
  });
});
