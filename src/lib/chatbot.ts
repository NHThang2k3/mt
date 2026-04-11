'use client';

import { type Product } from '@/data/products';

// ============================================================
// VietCharm AI Chatbot Types & Utilities
// Support both Gemini API and local fallback
// ============================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  products?: Product[];
  isTransferRequest?: boolean;
}

// Call Gemini API via Next.js route
export async function callGeminiAPI(
  messages: { role: string; content: string }[],
  language: string = 'vi'
): Promise<{ response: string; shouldTransfer: boolean; fallback: boolean }> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      response: language === 'vi' 
        ? 'Xin lỗi, đang có sự cố kết nối. Bạn có thể nhấn **"Chuyển nhân viên"** để được hỗ trợ trực tiếp! 🙏'
        : 'Sorry, there is a connection issue. You can press **"Transfer to staff"** for direct support! 🙏',
      shouldTransfer: true,
      fallback: true,
    };
  }
}

export function createMessage(
  content: string,
  role: 'assistant' | 'system' = 'assistant',
  products: Product[] = [],
  isTransferRequest: boolean = false
): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date(),
    products: products.length > 0 ? products : undefined,
    isTransferRequest,
  };
}

// Quick suggestion chips
export const QUICK_SUGGESTIONS = {
  vi: [
    '🍯 Có những sản phẩm nào?',
    '💰 Giá bao nhiêu?',
    '🎁 Combo nào tiết kiệm nhất?',
    '🌟 Gợi ý cho mình',
    '🍓 Mứt dâu Đà Lạt có gì đặc biệt?',
    '🥥 So sánh mứt dừa và mứt sen',
  ],
  en: [
    '🍯 What products are available?',
    '💰 What are the prices?',
    '🎁 Which combo is best?',
    '🌟 Suggest for me',
    '🍓 What is special about Da Lat Strawberry?',
    '🥥 Compare Coconut and Lotus seed jam',
  ]
};
