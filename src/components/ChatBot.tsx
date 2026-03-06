'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Headphones,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react';
import {
  generateAIResponse,
  QUICK_SUGGESTIONS,
  type ChatMessage,
} from '@/lib/chatbot';
import { formatPrice } from '@/data/products';
import Link from 'next/link';

// ============================================================
// VietCharm AI Chatbot Component
// Floating chat widget with beautiful Vietnamese heritage theme
// ============================================================

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transferData, setTransferData] = useState({ name: '', phone: '', note: '' });
  const [transferSent, setTransferSent] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `Chào bạn! 😊 Mình là **VietCharm AI** – trợ lý tư vấn sản phẩm mứt trái cây 3 miền.\n\nHãy hỏi mình bất cứ điều gì về sản phẩm nhé!`,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    // Generate AI response
    const aiResponse = generateAIResponse(text, messages);
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);

    if (!isOpen) {
      setHasNewMessage(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTransferSubmit = () => {
    if (!transferData.name || !transferData.phone) return;

    const systemMsg: ChatMessage = {
      id: `system-${Date.now()}`,
      role: 'system',
      content: `✅ **Yêu cầu hỗ trợ đã được gửi!**\n\nNhân viên sẽ liên hệ bạn qua số **${transferData.phone}** trong thời gian sớm nhất.\n\nCảm ơn **${transferData.name}** đã liên hệ VietCharm! 🙏`,
      timestamp: new Date(),
    };


    setMessages(prev => [...prev, systemMsg]);
    setTransferSent(true);
    setShowTransferForm(false);
    setTransferData({ name: '', phone: '', note: '' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  // Parse markdown-like bold text
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      // Handle newlines
      return part.split('\n').map((line, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </span>
      ));
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group"
            style={{
              background: 'linear-gradient(135deg, #D4A84B 0%, #B22222 100%)',
            }}
            id="chatbot-toggle-btn"
            aria-label="Mở chat tư vấn"
          >
            <MessageCircle size={28} className="text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'linear-gradient(135deg, #D4A84B, #B22222)' }}
            />
            {/* Notification badge */}
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#3D2914] text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Tư vấn sản phẩm 🍯
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: '#FFFDF5',
              border: '1px solid #E8D5B5',
            }}
            id="chatbot-window"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4A84B 0%, #B22222 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">VietCharm AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs">Đang hoạt động</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Đóng chat"
                >
                  <ChevronDown size={20} className="text-white" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setMessages([]);
                    setShowTransferForm(false);
                    setTransferSent(false);
                  }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Đóng và xóa chat"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23D4A84B' fill-opacity='0.03'/%3E%3C/svg%3E")`,
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1"
                      style={{
                        background: msg.role === 'system'
                          ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                          : 'linear-gradient(135deg, #D4A84B, #B22222)',
                      }}
                    >
                      {msg.role === 'system' ? (
                        <Headphones size={16} className="text-white" />
                      ) : (
                        <Sparkles size={16} className="text-white" />
                      )}
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-tr-md'
                        : msg.role === 'system'
                        ? 'bg-green-50 text-green-800 border border-green-200 rounded-tl-md'
                        : 'bg-white text-[#3D2914] shadow-sm border border-[#E8D5B5]/50 rounded-tl-md'
                    }`}
                    style={
                      msg.role === 'user'
                        ? { background: 'linear-gradient(135deg, #D4A84B, #B08A3E)' }
                        : undefined
                    }
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {renderMessageContent(msg.content)}
                    </div>

                    {/* Product cards in message */}
                    {msg.products && msg.products.length > 0 && msg.products.length <= 3 && (
                      <div className="mt-3 space-y-2">
                        {msg.products.filter(p => !p.isCombo).slice(0, 3).map(product => (
                          <Link
                            key={product.id}
                            href={`/san-pham/${product.id}`}
                            className="flex items-center gap-2 p-2 rounded-xl bg-[#FFF8E7] hover:bg-[#F5E6C8] transition-colors border border-[#E8D5B5]/50 group"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[#3D2914] truncate group-hover:text-[#D4A84B] transition-colors">
                                {product.name}
                              </p>
                              <p className="text-xs text-[#D4A84B] font-medium">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Transfer to staff button */}
                    {msg.isTransferRequest && !showTransferForm && !transferSent && (
                      <button
                        onClick={() => setShowTransferForm(true)}
                        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                        }}
                      >
                        <Headphones size={16} />
                        Chuyển đến nhân viên hỗ trợ
                      </button>
                    )}

                    {/* Timestamp */}
                    <p className={`text-[10px] mt-1.5 ${
                      msg.role === 'user' ? 'text-white/60' : 'text-[#8B5A2B]/40'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #D4A84B, #B22222)',
                    }}
                  >
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-[#E8D5B5]/50">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D4A84B] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#D4A84B] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#D4A84B] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Transfer Form */}
              {showTransferForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8D5B5]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}
                    >
                      <Headphones size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#3D2914]">Chuyển nhân viên hỗ trợ</p>
                      <p className="text-xs text-[#8B5A2B]/60">Để lại thông tin, chúng tôi sẽ liên hệ bạn</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B5A2B]/40" />
                      <input
                        type="text"
                        placeholder="Họ và tên *"
                        value={transferData.name}
                        onChange={(e) => setTransferData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E8D5B5] bg-[#FFF8E7] outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 transition-all text-[#3D2914] placeholder:text-[#8B5A2B]/40"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B5A2B]/40" />
                      <input
                        type="tel"
                        placeholder="Số điện thoại *"
                        value={transferData.phone}
                        onChange={(e) => setTransferData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E8D5B5] bg-[#FFF8E7] outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 transition-all text-[#3D2914] placeholder:text-[#8B5A2B]/40"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-3 text-[#8B5A2B]/40" />
                      <textarea
                        placeholder="Ghi chú (tùy chọn)"
                        value={transferData.note}
                        onChange={(e) => setTransferData(prev => ({ ...prev, note: e.target.value }))}
                        rows={2}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E8D5B5] bg-[#FFF8E7] outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 transition-all text-[#3D2914] placeholder:text-[#8B5A2B]/40 resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowTransferForm(false)}
                        className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-[#E8D5B5] text-[#8B5A2B] hover:bg-[#F5E6C8] transition-colors font-medium"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleTransferSubmit}
                        disabled={!transferData.name || !transferData.phone}
                        className="flex-1 px-3 py-2.5 text-sm rounded-xl text-white font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                        }}
                      >
                        Gửi yêu cầu
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 shrink-0">
                <p className="text-xs text-[#8B5A2B]/50 mb-2 font-medium">Gợi ý nhanh:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(suggestion)}
                      className="px-3 py-1.5 text-xs rounded-full border border-[#E8D5B5] text-[#5D3A1A] hover:bg-[#D4A84B] hover:text-white hover:border-[#D4A84B] transition-all font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div
              className="px-4 py-3 border-t shrink-0"
              style={{ borderColor: '#E8D5B5', background: '#FFFDF5' }}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Nhập câu hỏi..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 text-sm rounded-full border border-[#E8D5B5] bg-white outline-none focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 transition-all text-[#3D2914] placeholder:text-[#8B5A2B]/40 disabled:opacity-50"
                  id="chatbot-input"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg, #D4A84B, #B08A3E)'
                      : '#E8D5B5',
                  }}
                  aria-label="Gửi tin nhắn"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
              <p className="text-[10px] text-[#8B5A2B]/30 text-center mt-2">
                Powered by VietCharm AI • Tư vấn tự động 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
