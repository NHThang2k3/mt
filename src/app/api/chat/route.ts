import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt } from '@/data/chatbot-knowledge';

// ============================================================
// VietCharm AI Chatbot API Route
// Cơ chế: Gửi prompt + system instruction + history + knowledge → Gemini → trả kết quả
// Dữ liệu knowledge lấy từ: src/data/chatbot-knowledge.ts
// ============================================================

export async function POST(request: NextRequest) {
  let language = 'vi';
  try {
    const body = await request.json();
    language = body.language || 'vi';
    const { messages } = body;


    const apiKey = process.env.GEMINI_API_KEY;

    // Không có API key → trả lỗi rõ ràng
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      const errorMsg = language === 'en' 
        ? '⚠️ Chatbot is not configured with an API key. Please contact admin or press **"Transfer to staff"** for direct support! 🙏'
        : '⚠️ Chatbot hiện chưa được cấu hình API key. Vui lòng liên hệ quản trị viên hoặc nhấn **"Chuyển nhân viên"** để được hỗ trợ trực tiếp! 🙏';
        
      return NextResponse.json({
        response: errorMsg,
        shouldTransfer: true,
        fallback: true,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // System prompt đã bao gồm toàn bộ chatbot knowledge
    const SYSTEM_PROMPT = buildSystemPrompt(language as 'vi' | 'en');

    // Try multiple models in order (fallback nếu model bị rate limit)
    const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash'];

    // Build conversation history cho Gemini
    // Đảm bảo history đúng format: bắt đầu bằng 'user', xen kẽ user/model
    const rawHistory = messages.slice(0, -1)
      .filter((msg: { role: string }) => msg.role === 'user' || msg.role === 'model')
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    // Đảm bảo history bắt đầu bằng 'user' và xen kẽ đúng
    const chatHistory = [...rawHistory];

    while (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
      chatHistory.shift();
    }

    const cleanHistory: typeof chatHistory = [];
    for (const msg of chatHistory) {
      if (cleanHistory.length === 0 || cleanHistory[cleanHistory.length - 1].role !== msg.role) {
        cleanHistory.push(msg);
      }
    }

    // History phải kết thúc bằng 'model' (không phải 'user')
    if (cleanHistory.length > 0 && cleanHistory[cleanHistory.length - 1].role === 'user') {
      cleanHistory.pop();
    }

    // Tin nhắn mới nhất của user
    const lastMessage = messages[messages.length - 1].content;

    let responseText = '';
    let succeeded = false;

    // Thử từng model, gửi: system instruction (chứa knowledge) + history + prompt
    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 800,
          },
        });

        const chat = model.startChat({ history: cleanHistory });
        const result = await chat.sendMessage(lastMessage);
        responseText = result.response.text();
        succeeded = true;
        break;
      } catch (modelError: unknown) {
        const errMsg = modelError instanceof Error ? modelError.message : String(modelError);
        console.warn(`Model ${modelName} failed:`, errMsg);

        // Nếu lỗi do hết Quota/Rate limit (429) thì ngưng loop luôn, việc thử model khác không có tác dụng
        if (errMsg.includes('429') || errMsg.includes('Quota') || errMsg.includes('Too Many Requests')) {
          break;
        }
      }
    }

    // Tất cả model đều thất bại
    if (!succeeded) {
      const overloadedMsg = language === 'en'
        ? 'Sorry, the system is temporarily overloaded. 😓 Please try again in a moment or press **"Transfer to staff"** for direct support! 🙏'
        : 'Xin lỗi, hệ thống đang tạm thời quá tải. 😓 Bạn vui lòng thử lại sau giây lát hoặc nhấn **"Chuyển nhân viên"** để được hỗ trợ trực tiếp nhé! 🙏';

      return NextResponse.json({
        response: overloadedMsg,
        shouldTransfer: true,
        fallback: true,
      });
    }

    // Kiểm tra xem response có nên chuyển nhân viên không
    const shouldTransfer = checkShouldTransfer(responseText);

    return NextResponse.json({
      response: responseText,
      shouldTransfer,
      fallback: false,
    });

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error('Gemini API Error:', errMessage);

    const generalErrorMsg = language === 'en'
      ? 'An error occurred while processing your message. Please try again or press **"Transfer to staff"** for support! 🙏'
      : 'Đã xảy ra lỗi khi xử lý tin nhắn. Bạn vui lòng thử lại hoặc nhấn **"Chuyển nhân viên"** để được hỗ trợ! 🙏';

    return NextResponse.json({
      response: generalErrorMsg,
      shouldTransfer: true,
      fallback: true,
      error: true,
    });
  }
}

// Kiểm tra xem Gemini response có gợi ý chuyển nhân viên không
function checkShouldTransfer(response: string): boolean {
  const transferKeywords = [
    'liên hệ nhân viên', 'liên hệ trực tiếp', 'hỗ trợ trực tiếp',
    'chuyển nhân viên', 'hotline', 'tổng đài', 'vượt quá phạm vi',
    'không thể hỗ trợ', 'khiếu nại', 'hoàn tiền', 'đổi trả',
    'contact staff', 'human support', 'transfer to human', 'agent',
    'talk to human', 'customer service', 'refund', 'complaint'
  ];
  const normalizedResponse = response.toLowerCase();
  return transferKeywords.some(kw => normalizedResponse.includes(kw));
}
