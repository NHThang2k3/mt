'use client';

import { products, formatPrice, type Product } from '@/data/products';
import { posts, type BlogPost } from '@/data/posts';

// ============================================================
// VietCharm AI Chatbot Engine
// Tự động tư vấn sản phẩm dựa trên dữ liệu products & posts
// ============================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  products?: Product[];
  isTransferRequest?: boolean;
}

// Từ khóa mapping cho từng loại sản phẩm
const PRODUCT_KEYWORDS: Record<string, string[]> = {
  'bac-man': ['mận', 'man', 'mộc châu', 'moc chau', 'tây bắc', 'tay bac', 'plum'],
  'bac-mo': ['mơ', 'mo', 'ba vì', 'ba vi', 'apricot'],
  'trung-sen': ['sen', 'hạt sen', 'hat sen', 'huế', 'hue', 'lotus'],
  'trung-dau': ['dâu', 'dau', 'dâu tây', 'dau tay', 'đà lạt', 'da lat', 'strawberry'],
  'nam-dua': ['dừa', 'dua', 'bến tre', 'ben tre', 'coconut'],
  'nam-mangcau': ['mãng cầu', 'mang cau', 'tiền giang', 'tien giang', 'soursop'],
  'combo-trai-nghiem': ['combo 2', 'trải nghiệm', 'trai nghiem', '2 món', '2 mon'],
  'combo-3-mien': ['combo 3', '3 miền', '3 mien', '3 vùng'],
  'combo-gia-dinh': ['combo 4', 'gia đình', 'gia dinh', '4 món', '4 mon', 'family'],
  'combo-6-vi': ['combo 6', '6 vị', '6 vi', 'di sản', 'di san', 'heritage', 'trọn bộ'],
};

// Từ khóa cho các câu hỏi chung
const TOPIC_KEYWORDS = {
  price: ['giá', 'gia', 'bao nhiêu', 'bao nhieu', 'tiền', 'tien', 'price', 'cost', 'rẻ', 're', 'đắt', 'dat', 'khuyến mãi', 'khuyen mai', 'giảm giá', 'giam gia', 'discount'],
  ingredients: ['thành phần', 'thanh phan', 'nguyên liệu', 'nguyen lieu', 'ingredients', 'chất', 'chat', 'gồm gì', 'gom gi', 'làm từ', 'lam tu'],
  origin: ['nguồn gốc', 'nguon goc', 'xuất xứ', 'xuat xu', 'origin', 'vùng', 'vung', 'từ đâu', 'tu dau', 'ở đâu', 'o dau'],
  features: ['đặc điểm', 'dac diem', 'tính năng', 'tinh nang', 'nổi bật', 'noi bat', 'đặc biệt', 'dac biet', 'khác gì', 'khac gi'],
  taste: ['vị', 'vi', 'hương', 'huong', 'ngon', 'chua', 'ngọt', 'ngot', 'béo', 'beo', 'thơm', 'thom', 'taste', 'flavor'],
  howToEat: ['ăn', 'an', 'thưởng thức', 'thuong thuc', 'kết hợp', 'ket hop', 'dùng', 'dung', 'cách dùng', 'cach dung', 'serving'],
  region: ['miền', 'mien', 'bắc', 'bac', 'trung', 'nam', 'region', 'vùng miền'],
  combo: ['combo', 'bộ', 'bo', 'set', 'gói', 'goi', 'bundle', 'nhiều', 'nhieu', 'quà', 'qua', 'gift', 'tặng', 'tang'],
  weight: ['nặng', 'nang', 'gram', 'weight', 'khối lượng', 'khoi luong', 'bao nhiêu gram'],
  preservation: ['bảo quản', 'bao quan', 'hạn sử dụng', 'han su dung', 'giữ', 'giu', 'để được', 'de duoc', 'expire'],
  order: ['đặt hàng', 'dat hang', 'mua', 'order', 'ship', 'giao hàng', 'giao hang', 'thanh toán', 'thanh toan', 'delivery'],
  greeting: ['xin chào', 'hello', 'hi', 'hey', 'chào', 'chao', 'ơi', 'oi'],
  thanks: ['cảm ơn', 'cam on', 'thank', 'thanks'],
  all_products: ['tất cả', 'tat ca', 'danh sách', 'danh sach', 'list', 'có gì', 'co gi', 'sản phẩm', 'san pham', 'loại nào', 'loai nao', 'bán gì', 'ban gi', 'menu'],
  recommend: ['gợi ý', 'goi y', 'nên mua', 'nen mua', 'recommend', 'tư vấn', 'tu van', 'phù hợp', 'phu hop', 'chọn', 'chon'],
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim();
}

function matchesKeywords(input: string, keywords: string[]): boolean {
  const normalizedInput = normalizeText(input);
  return keywords.some(kw => normalizedInput.includes(normalizeText(kw)));
}

function findMatchingProducts(input: string): Product[] {
  const matched: Product[] = [];
  for (const [productId, keywords] of Object.entries(PRODUCT_KEYWORDS)) {
    if (matchesKeywords(input, keywords)) {
      const product = products.find(p => p.id === productId);
      if (product) matched.push(product);
    }
  }
  return matched;
}

function findMatchingTopic(input: string): string | null {
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (matchesKeywords(input, keywords)) {
      return topic;
    }
  }
  return null;
}

function getRegionProducts(region: 'bac' | 'trung' | 'nam'): Product[] {
  return products.filter(p => p.region === region);
}

function getRelatedPost(productId: string): BlogPost | undefined {
  return posts.find(p => p.productId === productId);
}

function formatProductInfo(product: Product, detail: string = 'overview'): string {
  switch (detail) {
    case 'price':
      return `💰 **${product.name}**: ${formatPrice(product.price)} / ${product.weight}`;
    case 'ingredients':
      return `🌿 **${product.name}**\n- Thành phần: ${product.ingredients || 'Nguyên liệu tự nhiên'}\n- Đặc điểm: ${product.features || 'Chế biến thủ công'}`;
    case 'origin':
      return `📍 **${product.name}**\n- Nguồn gốc: ${product.origin || product.regionName}\n- Vùng miền: ${product.regionName}`;
    case 'taste':
    case 'howToEat':
      const post = getRelatedPost(product.id);
      if (post) {
        // Extract "Cách Thưởng Thức" section from post
        const tastePart = post.content.match(/## (?:Hương Vị|Cách Thưởng Thức)[^\n]*\n([\s\S]*?)(?=##|$)/);
        if (tastePart) {
          return `✨ **${product.name}**\n${tastePart[1].trim().slice(0, 300)}`;
        }
      }
      return `✨ **${product.name}**: ${product.description}`;
    default:
      return `🍯 **${product.name}** (${product.regionName})\n${product.description}\n💰 ${formatPrice(product.price)} / ${product.weight}`;
  }
}

// Main AI response engine
export function generateAIResponse(userMessage: string, conversationHistory: ChatMessage[]): ChatMessage {
  const input = userMessage.trim();
  const normalizedInput = normalizeText(input);
  const matchedProducts = findMatchingProducts(input);
  const topic = findMatchingTopic(input);

  let responseContent = '';
  let responseProducts: Product[] = [];
  let isTransferRequest = false;

  // 1. Handle greetings
  if (topic === 'greeting' && normalizedInput.length < 30) {
    responseContent = `Xin chào! 👋 Mình là trợ lý AI của **VietCharm** – thương hiệu mứt trái cây di sản 3 miền Việt Nam.

Mình có thể giúp bạn:
🍯 Tư vấn về **6 loại mứt** đặc sản từ Bắc – Trung – Nam
🎁 Giới thiệu các **combo quà tặng** tiết kiệm
💰 Thông tin về **giá cả** và cách đặt hàng
📖 Chia sẻ **câu chuyện** đằng sau mỗi hũ mứt

Bạn muốn tìm hiểu về sản phẩm nào?`;
    return createMessage(responseContent, responseProducts);
  }

  // 2. Handle thanks
  if (topic === 'thanks') {
    responseContent = `Cảm ơn bạn đã quan tâm đến VietCharm! 😊🙏

Nếu bạn còn bất kỳ câu hỏi nào, đừng ngại hỏi mình nhé. Chúc bạn có trải nghiệm thú vị với mứt trái cây 3 miền! 🍯`;
    return createMessage(responseContent, responseProducts);
  }

  // 3. List all products
  if (topic === 'all_products' && matchedProducts.length === 0) {
    const regularProducts = products.filter(p => !p.isCombo);
    const comboProducts = products.filter(p => p.isCombo);

    responseContent = `Đây là tất cả sản phẩm của **VietCharm** 🍯\n\n**🌿 Mứt lẻ (6 vị):**\n`;
    regularProducts.forEach(p => {
      responseContent += `• **${p.name}** – ${formatPrice(p.price)} / ${p.weight}\n`;
    });
    responseContent += `\n**🎁 Combo đặc biệt:**\n`;
    comboProducts.forEach(p => {
      responseContent += `• **${p.name}** – ${formatPrice(p.price)} / ${p.weight}\n`;
    });
    responseContent += `\nBạn muốn tìm hiểu chi tiết sản phẩm nào?`;
    responseProducts = products;
    return createMessage(responseContent, responseProducts);
  }

  // 4. Specific product + specific topic
  if (matchedProducts.length > 0 && topic) {
    if (topic === 'price') {
      responseContent = matchedProducts.map(p => formatProductInfo(p, 'price')).join('\n\n');
      if (matchedProducts.length === 1 && !matchedProducts[0].isCombo) {
        responseContent += `\n\n💡 **Mẹo**: Mua combo sẽ tiết kiệm hơn! Combo 6 Vị Di Sản chỉ ${formatPrice(169000)} cho 6 hũ x 150g.`;
      }
    } else if (topic === 'ingredients') {
      responseContent = matchedProducts.map(p => formatProductInfo(p, 'ingredients')).join('\n\n');
    } else if (topic === 'origin') {
      responseContent = matchedProducts.map(p => formatProductInfo(p, 'origin')).join('\n\n');
    } else if (topic === 'taste' || topic === 'howToEat') {
      responseContent = matchedProducts.map(p => formatProductInfo(p, 'taste')).join('\n\n');
    } else {
      responseContent = matchedProducts.map(p => formatProductInfo(p, 'overview')).join('\n\n');
    }
    responseProducts = matchedProducts;
    return createMessage(responseContent, responseProducts);
  }

  // 5. Matched products without specific topic
  if (matchedProducts.length > 0) {
    responseContent = matchedProducts.map(p => formatProductInfo(p, 'overview')).join('\n\n');
    if (matchedProducts.length === 1) {
      const p = matchedProducts[0];
      const post = getRelatedPost(p.id);
      if (post && !p.isCombo) {
        responseContent += `\n\n📖 **Câu chuyện**: ${post.excerpt}`;
      }
      responseContent += `\n\n❓ Bạn muốn biết thêm về **thành phần**, **cách thưởng thức** hay **đặt hàng** không?`;
    }
    responseProducts = matchedProducts;
    return createMessage(responseContent, responseProducts);
  }

  // 6. Topic without specific product
  if (topic === 'price') {
    responseContent = `💰 **Bảng giá VietCharm:**\n\n**Mứt lẻ:**\n`;
    products.filter(p => !p.isCombo).forEach(p => {
      responseContent += `• ${p.name}: **${formatPrice(p.price)}** / ${p.weight}\n`;
    });
    responseContent += `\n**Combo:**\n`;
    products.filter(p => p.isCombo).forEach(p => {
      responseContent += `• ${p.name}: **${formatPrice(p.price)}** / ${p.weight}\n`;
    });
    responseContent += `\n🎉 Mua combo sẽ tiết kiệm hơn rất nhiều so với mua lẻ!`;
    return createMessage(responseContent, products);
  }

  if (topic === 'region') {
    if (matchesKeywords(input, ['bắc', 'bac'])) {
      const regionProducts = getRegionProducts('bac');
      responseContent = `🏔️ **Sản phẩm Miền Bắc:**\n\n`;
      regionProducts.forEach(p => {
        responseContent += formatProductInfo(p, 'overview') + '\n\n';
      });
      responseProducts = regionProducts;
    } else if (matchesKeywords(input, ['trung'])) {
      const regionProducts = getRegionProducts('trung');
      responseContent = `🌸 **Sản phẩm Miền Trung:**\n\n`;
      regionProducts.forEach(p => {
        responseContent += formatProductInfo(p, 'overview') + '\n\n';
      });
      responseProducts = regionProducts;
    } else if (matchesKeywords(input, ['nam'])) {
      const regionProducts = getRegionProducts('nam');
      responseContent = `🌴 **Sản phẩm Miền Nam:**\n\n`;
      regionProducts.forEach(p => {
        responseContent += formatProductInfo(p, 'overview') + '\n\n';
      });
      responseProducts = regionProducts;
    } else {
      responseContent = `🗺️ VietCharm có mứt từ **3 miền Việt Nam**:\n\n🏔️ **Miền Bắc**: Mứt Mận Mộc Châu, Mứt Mơ Ba Vì\n🌸 **Miền Trung**: Mứt Hạt Sen Huế, Mứt Dâu Tây Đà Lạt\n🌴 **Miền Nam**: Mứt Dừa Bến Tre, Mứt Mãng Cầu Tiền Giang\n\nBạn quan tâm đến miền nào?`;
    }
    return createMessage(responseContent, responseProducts);
  }

  if (topic === 'combo') {
    const comboProducts = products.filter(p => p.isCombo);
    responseContent = `🎁 **Các Combo VietCharm:**\n\n`;
    comboProducts.forEach(p => {
      responseContent += `• **${p.name}** – ${formatPrice(p.price)} / ${p.weight}\n  ${p.description}\n\n`;
    });
    responseContent += `💡 Combo 6 Vị Di Sản là lựa chọn được yêu thích nhất, tiết kiệm đến **125.000đ** so với mua lẻ!`;
    responseProducts = comboProducts;
    return createMessage(responseContent, responseProducts);
  }

  if (topic === 'recommend') {
    responseContent = `🌟 **Gợi ý từ VietCharm:**\n\n`;
    responseContent += `🥇 **Best seller**: Mứt Dâu Tây Đà Lạt – vị chua ngọt thanh mát\n`;
    responseContent += `🎁 **Quà tặng**: Combo 6 Vị Di Sản – trọn bộ hương vị 3 miền\n`;
    responseContent += `💰 **Tiết kiệm**: Combo 3 Miền – ${formatPrice(139000)} cho 3 hũ tự chọn\n`;
    responseContent += `🍵 **Trà đối ẩm**: Mứt Hạt Sen Huế – vị thanh tao, bùi nhẹ\n`;
    responseContent += `\nBạn thích vị **chua**, **ngọt**, hay **béo**? Mình sẽ tư vấn phù hợp hơn!`;
    return createMessage(responseContent);
  }

  if (topic === 'preservation') {
    responseContent = `🧊 **Hướng dẫn bảo quản mứt VietCharm:**\n\n`;
    responseContent += `• Bảo quản nơi khô ráo, thoáng mát\n`;
    responseContent += `• Sau khi mở nắp, bảo quản trong **tủ lạnh**\n`;
    responseContent += `• Tránh tiếp xúc trực tiếp với ánh nắng\n`;
    responseContent += `• Sử dụng muỗng sạch khi lấy mứt\n`;
    responseContent += `• Sản phẩm không chứa chất bảo quản, nên sử dụng trong vòng **2 tuần** sau khi mở\n\n`;
    responseContent += `📦 Hạn sử dụng (chưa mở): **3-6 tháng** kể từ ngày sản xuất`;
    return createMessage(responseContent);
  }

  if (topic === 'order') {
    responseContent = `🛒 **Cách đặt hàng VietCharm:**\n\n`;
    responseContent += `1️⃣ Chọn sản phẩm yêu thích tại **Cửa Hàng**\n`;
    responseContent += `2️⃣ Thêm vào **Giỏ Hàng**\n`;
    responseContent += `3️⃣ Điền thông tin giao hàng\n`;
    responseContent += `4️⃣ Chọn phương thức **thanh toán**\n\n`;
    responseContent += `🚚 Giao hàng toàn quốc\n`;
    responseContent += `💳 Hỗ trợ COD & chuyển khoản\n\n`;
    responseContent += `Bạn cần hỗ trợ đặt hàng không?`;
    return createMessage(responseContent);
  }

  if (topic === 'weight') {
    responseContent = `⚖️ **Khối lượng sản phẩm:**\n\n`;
    products.filter(p => !p.isCombo).forEach(p => {
      responseContent += `• ${p.name}: **${p.weight}**\n`;
    });
    responseContent += `\n**Combo:**\n`;
    products.filter(p => p.isCombo).forEach(p => {
      responseContent += `• ${p.name}: **${p.weight}**\n`;
    });
    return createMessage(responseContent);
  }

  // 7. Cannot answer → suggest transfer to staff
  responseContent = `Xin lỗi, mình chưa hiểu rõ câu hỏi của bạn 😅

Bạn có thể thử hỏi:
• Thông tin về **loại mứt** cụ thể (dâu, dừa, sen, mận, mơ, mãng cầu)
• **Giá cả** và **combo** ưu đãi
• **Nguồn gốc** và **thành phần** sản phẩm
• Cách **thưởng thức** và **bảo quản**

Hoặc bạn có thể nhấn nút **"Chuyển nhân viên"** bên dưới để được hỗ trợ trực tiếp.`;
  isTransferRequest = true;
  return createMessage(responseContent, [], isTransferRequest);
}

function createMessage(
  content: string,
  products: Product[] = [],
  isTransferRequest: boolean = false
): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: 'assistant',
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
  '🍓 Mứt dâu Đà Lạt',
  '🥥 Mứt dừa Bến Tre',
];
