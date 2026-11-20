import React, { useState } from 'react';
import { useSettingsStore, GeminiModelId } from '@/stores/useSettingsStore';
import { Key, ExternalLink, Check, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const { 
    geminiApiKey, 
    setGeminiApiKey, 
    clearGeminiApiKey, 
    geminiModel,
    setGeminiModel,
    isSettingsOpen, 
    setSettingsOpen 
  } = useSettingsStore();

  const [inputKey, setInputKey] = useState(geminiApiKey);
  const [showKey, setShowKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    if (!inputKey.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng không để trống API key.' });
      return;
    }
    setGeminiApiKey(inputKey.trim());
    setStatusMessage({ type: 'success', text: 'Đã lưu API Key vào trình duyệt thành công!' });
    setTimeout(() => {
      setStatusMessage(null);
      setSettingsOpen(false);
    }, 1200);
  };

  const handleClear = () => {
    clearGeminiApiKey();
    setInputKey('');
    setStatusMessage({ type: 'success', text: 'Đã xóa API Key khỏi bộ nhớ trình duyệt.' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-800 border border-slate-200/80 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cấu hình Gemini API Key</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tự do sinh hàng ngàn câu hỏi tiếng Anh theo yêu cầu</p>
            </div>
          </div>
          <button
            onClick={() => setSettingsOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 space-y-4">
          {/* Direct link to Google AI Studio */}
          <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 to-blue-50/50 dark:from-indigo-950/40 dark:to-blue-950/30 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-indigo-600 p-2 text-white shadow-sm">
                <ExternalLink className="h-4 w-4" />
              </div>
              <div className="flex-1 text-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Chưa có API Key? Lấy miễn phí 100%:</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Google cung cấp Gemini API hoàn toàn miễn phí (15 lượt gọi/phút, 1.5 triệu token/tháng). Bạn chỉ cần tài khoản Google.
                </p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                >
                  <span>Mở Google AI Studio để lấy Key</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Key input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Gemini API Key của bạn
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Dán API Key (bắt đầu bằng AIzaSy...)"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 pr-10 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              🔒 Key được lưu an toàn 100% trong bộ nhớ trình duyệt (LocalStorage) của bạn, không gửi về bất kỳ máy chủ nào khác.
            </p>
          </div>

          {/* Model selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Phiên bản Gemini Model
            </label>
            <div className="relative">
              <select
                value={geminiModel}
                onChange={(e) => setGeminiModel(e.target.value as GeminiModelId)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (Khuyên dùng - Siêu tốc & Chuẩn xác)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash (Flash thế hệ 2.0)</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (Tư duy sâu & Phân tích ngữ pháp nâng cao)</option>
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              Google đã ngừng hỗ trợ gemini-1.5-flash từ 24/09/2025; vui lòng dùng dòng 2.x còn hoạt động.
            </p>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`flex items-center gap-2 rounded-lg p-2.5 text-xs font-medium ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
          {geminiApiKey ? (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Xóa Key</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSettingsOpen(false)}
              className="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Đóng
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
