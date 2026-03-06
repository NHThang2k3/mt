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
  messages: { role: string; content: string }[]
): Promise<{ response: string; shouldTransfer: boolean; fallback: boolean }> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      response: 'Xin lỗi, đang có sự cố kết nối. Bạn có thể nhấn **"Chuyển nhân viên"** để được hỗ trợ trực tiếp! 🙏',
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
export const QUICK_SUGGESTIONS = [
  '🍯 Có những sản phẩm nào?',
  '💰 Giá bao nhiêu?',
  '🎁 Combo nào tiết kiệm nhất?',
  '🌟 Gợi ý cho mình',
  '🍓 Mứt dâu Đà Lạt có gì đặc biệt?',
  '🥥 So sánh mứt dừa và mứt sen',
];
