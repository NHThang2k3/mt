// ============================================================
// VietCharm AI Chatbot - Nguồn dữ liệu tập trung
// File này chứa toàn bộ kiến thức cho chatbot
// Khi cần cập nhật thông tin, chỉ cần sửa file này
// ============================================================

export const CHATBOT_KNOWLEDGE = {

  // ==================== THÔNG TIN THƯƠNG HIỆU ====================
  brand: {
    name: 'VietCharm',
    fullName: 'VietCharm - Mứt Trái Cây 3 Miền Việt Nam',
    slogan: 'Gìn giữ hương vị di sản Việt trong từng hũ mứt',
    description: 'VietCharm là thương hiệu mứt trái cây thủ công, mang hương vị truyền thống từ ba miền Bắc - Trung - Nam Việt Nam. Mỗi sản phẩm là sự kết hợp giữa nguyên liệu tự nhiên được tuyển chọn kỹ lưỡng và phương pháp chế biến thủ công truyền thống.',
    values: [
      'Nguyên liệu 100% tự nhiên, không chất bảo quản',
      'Chế biến thủ công theo phương pháp truyền thống',
      'Ít đường, giữ hương vị nguyên bản',
      'Nguồn nguyên liệu từ các vùng trồng truyền thống uy tín',
      'Đóng gói tinh tế, phù hợp làm quà tặng',
    ],
    valuesEn: [
      '100% natural ingredients, no preservatives',
      'Handcrafted using traditional methods',
      'Low sugar, preserving original flavors',
      'Sourced from reputable traditional growing regions',
      'Exquisite packaging, perfect for gifting',
    ],
  },

  // ==================== DANH SÁCH SẢN PHẨM ====================
  products: [
    {
      id: 'bac-man',
      name: 'Mứt Mận Mộc Châu',
      nameEn: 'Moc Chau Plum Jam',
      price: 49000,
      priceFormatted: '49.000₫',
      weight: '250g',
      region: 'Miền Bắc',
      image: '/images/man2.JPG',
      shortDescription: 'Dư vị núi rừng Tây Bắc trong từng lát mận',
      ingredients: 'Mận hậu tươi, đường mía tinh luyện',
      origin: 'Cao nguyên Mộc Châu (Sơn La) – vùng trồng mận hậu truyền thống',
      features: 'Ít đường, không chất bảo quản, chế biến thủ công',
      taste: 'Vị chua nhẹ chạm đầu lưỡi, sau đó vị ngọt lan dần, cân bằng và không gắt. Cảm giác mộc mạc, gần gũi.',
      story: 'Mộc Châu hiện ra trong làn sương mỏng, những triền đồi xanh mướt nối tiếp nhau và mùa mận chín nhuộm tím cả cao nguyên. Mận không chỉ là trái cây theo mùa mà còn là ký ức, là hương vị gắn liền với nhịp sống chậm rãi của vùng đất Tây Bắc.',
      servingSuggestions: [
        'Dùng cùng trà nóng để cân bằng vị chua ngọt',
        'Kết hợp với sữa chua hoặc yến mạch',
        'Ăn kèm bánh mì nhạt cho bữa nhẹ',
        'Phù hợp làm quà tặng mang hương vị núi rừng',
      ],
    },
    {
      id: 'bac-mo',
      name: 'Mứt Mơ Ba Vì',
      nameEn: 'Ba Vi Apricot Jam',
      price: 49000,
      priceFormatted: '49.000₫',
      weight: '250g',
      region: 'Miền Bắc',
      image: '/images/mo1.JPG',
      shortDescription: 'Dư vị dịu dàng từ miền đồi núi phía Bắc',
      ingredients: 'Mơ tươi, đường mía tinh luyện',
      origin: 'Vùng trồng mơ truyền thống tại Ba Vì (Hà Nội) và khu vực ven núi Tản',
      features: 'Ít đường, không chất bảo quản, chế biến thủ công',
      taste: 'Vị chua dịu lan nhẹ nơi đầu lưỡi, sau đó là vị ngọt vừa phải, cân bằng và dễ chịu. Gợi cảm giác thư thái.',
      story: 'Ba Vì hiện lên với những dãy núi trập trùng, mây trắng bảng lảng and không khí mát lành quanh năm. Vùng trồng mơ truyền thống của miền Bắc, nơi những cây mơ âm thầm kết trái mỗi độ giao mùa.',
      servingSuggestions: [
        'Dùng cùng trà nóng hoặc trà thảo mộc',
        'Pha nước mơ ấm cho ngày se lạnh',
        'Kết hợp with sữa chua không đường',
        'Món quà nhẹ nhàng cho người yêu sự thanh giản',
      ],
    },
    {
      id: 'trung-sen',
      name: 'Mứt Hạt Sen Huế',
      nameEn: 'Hue Lotus Seed Jam',
      price: 49000,
      priceFormatted: '49.000₫',
      weight: '250g',
      region: 'Miền Trung',
      image: '/images/hatsen2.JPG',
      shortDescription: 'Khi vị thanh của cố đô chạm vào nhịp sống hiện đại',
      ingredients: 'Hạt sen tươi, đường mía tinh luyện',
      origin: 'Hồ sen làng Phú Mậu (Phú Vang) and khu vực Hương Sơ – Hương Long (TP. Huế)',
      features: 'Ít đường, không chất bảo quản, chế biến thủ công',
      taste: 'Sắc vàng hanh dịu mắt, vị ngọt đậm mà tinh, vị bùi tự nhiên. Hòa quyện với trà nóng tạo cảm giác thư thái.',
      story: 'Huế lặng lẽ bên dòng Hương Giang, nơi nhịp sống chậm rãi và sen Huế hiện lên như biểu tượng của sự thuần khiết, thanh tao trong văn hóa cố đô.',
      servingSuggestions: [
        'Dùng cùng trà nóng hoặc trà sen để cảm nhận trọn vẹn vị thanh',
        'Kết hợp với chè hạt sen, cháo ngọt hoặc sữa hạt',
        'Món quà tinh tế cho người trân trọng sự giản dị và chiều sâu văn hóa',
      ],
    },
    {
      id: 'trung-dau',
      name: 'Mứt Dâu Tây Đà Lạt',
      nameEn: 'Da Lat Strawberry Jam',
      price: 49000,
      priceFormatted: '49.000₫',
      weight: '250g',
      region: 'Miền Trung',
      image: '/images/dautay1.JPG',
      shortDescription: 'Ngọt lành từ cao nguyên sương mù',
      ingredients: 'Dâu tươi Đà Lạt, đường mía tinh luyện',
      origin: 'Vườn dâu tại phường 7 – phường 8 (TP. Đà Lạt) và xã Xuân Thọ',
      features: 'Ít đường, không chất bảo quản, chế biến thủ công',
      taste: 'Vị chua thanh chạm nhẹ đầu lưỡi rồi vị ngọt lan dần, đủ đầy mà không gắt. Hương vị cao nguyên trọn vẹn.',
      story: 'Đà Lạt hiện ra rất khẽ, không ồn ào cũng chẳng vội vàng. Thành phố cao nguyên với sương sớm, nắng dịu và cái se lạnh quen thuộc tạo nên nhịp sống chậm rãi.',
      servingSuggestions: [
        'Dùng cùng bánh mì hoặc pancake cho bữa sáng nhẹ nhàng',
        'Kết hợp với sữa chua, granola hoặc phô mai tươi',
        'Thưởng thức cùng trà hoa quả hoặc trà thảo mộc',
        'Món quà nhỏ xinh cho những ai yêu sự tươi mới và tinh tế',
      ],
    },
    {
      id: 'nam-dua',
      name: 'Mứt Dừa Bến Tre',
      nameEn: 'Ben Tre Coconut Jam',
      price: 49000,
      priceFormatted: '49.000₫',
      weight: '250g',
      region: 'Miền Nam',
      image: '/images/dua2.JPG',
      shortDescription: 'Vị béo ngọt gói trọn hương quê',
      ingredients: 'Dừa tươi Bến Tre, đường mía tinh luyện',
      origin: 'Các vườn dừa tại tỉnh Bến Tre',
      features: 'Ít ngọt, không chất bảo quản, chế biến thủ công',
      taste: 'Vị béo của dừa lan nhẹ nơi đầu lưỡi, hòa cùng vị ngọt thanh, cảm giác gần gũi và ấm áp.',
      story: 'Bến Tre được mệnh danh là xứ dừa của miền Tây Nam Bộ – nơi những hàng dừa nghiêng bóng soi mình xuống kênh rạch, gắn liền với đời sống and ẩm thực qua bao thế hệ.',
      servingSuggestions: [
        'Dùng cùng trà nóng hoặc trà lài',
        'Ăn kèm bánh mì, bánh quy nhạt',
        'Quà Tết truyền thống mang đậm chất miền Tây',
      ],
    },
    {
      id: 'nam-mangcau',
      name: 'Mứt Mãng Cầu Tiền Giang',
      nameEn: 'Tien Giang Soursop Jam',
      price: 49000,
      priceFormatted: '49.000₫',
      weight: '250g',
      region: 'Miền Nam',
      image: '/images/mangcau1.JPG',
      shortDescription: 'Vị chua ngọt dịu êm miền nhớ',
      ingredients: 'Mãng cầu tươi Tiền Giang, đường mía tinh luyện',
      origin: 'Vườn trái cây Cái Bè – Cai Lậy (Tiền Giang)',
      features: 'Chua ngọt cân bằng, không chất bảo quản',
      taste: 'Vị chua chạm nhẹ đầu lưỡi rồi tan dần trong vị ngọt dịu, tạo cảm giác tươi mới and dễ chịu.',
      story: 'Tiền Giang là vựa trái cây lớn của miền Tây Nam Bộ, nổi tiếng với những miệt vườn trĩu quả tại Cái Bè, Cai Lậy.',
      servingSuggestions: [
        'Dùng cùng trà hoa quả hoặc trà thảo mộc',
        'Kết hợp với sữa chua, granola',
        'Phù hợp làm quà cho người yêu vị chua ngọt tự nhiên',
      ],
    },
  ],

  // ==================== COMBO SẢN PHẨM ====================
  combos: [
    {
      id: 'combo-trai-nghiem',
      name: 'Combo Trải Nghiệm 2 Món',
      price: 98000,
      priceFormatted: '98.000₫',
      weight: '2 hũ x 250g',
      description: 'Chọn 2 trong 6 hương vị mứt đặc sản',
      highlight: 'Phù hợp dùng thử, trải nghiệm ngẫu hứng',
      comboChoices: 2,
    },
    {
      id: 'combo-3-mien',
      name: 'Combo 3 Miền',
      price: 139000,
      priceFormatted: '139.000₫',
      weight: '3 hũ x 250g',
      description: 'Chọn 3 trong 6 hương vị mứt đặc sản',
      highlight: 'Đa dạng hương vị, tiết kiệm hơn mua lẻ',
      comboChoices: 3,
    },
    {
      id: 'combo-gia-dinh',
      name: 'Combo Gia Đình',
      price: 189000,
      priceFormatted: '189.000₫',
      weight: '4 hũ x 250g',
      description: 'Chọn 4 trong 6 hương vị mứt đặc sản',
      highlight: 'Phù hợp gia đình, tối ưu chi phí',
      comboChoices: 4,
    },
    {
      id: 'combo-6-vi',
      name: 'Combo 6 Vị Di Sản',
      price: 169000,
      priceFormatted: '169.000₫',
      weight: '6 hũ x 150g',
      description: 'Trọn bộ 6 hương vị đặc sản từ 3 miền Việt Nam',
      highlight: 'Best seller! Tiết kiệm 125.000₫ so với mua lẻ. Đóng gói cao cấp, phù hợp làm quà tặng',
      comboChoices: 6,
      includes: [
        'Mứt Mận Mộc Châu - Miền Bắc',
        'Mứt Mơ Ba Vì - Miền Bắc',
        'Mứt Hạt Sen Huế - Miền Trung',
        'Mứt Dâu Tây Đà Lạt - Miền Trung',
        'Mứt Dừa Bến Tre - Miền Nam',
        'Mứt Mãng Cầu Tiền Giang - Miền Nam',
      ],
    },
  ],

  // ==================== CHÍNH SÁCH & THÔNG TIN ====================
  policies: {
    preservation: {
      title: 'Hướng dẫn bảo quản',
      items: [
        'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp',
        'Sau khi mở nắp, bảo quản trong tủ lạnh (2-8°C)',
        'Sử dụng muỗng sạch, khô khi lấy mứt',
        'Không chứa chất bảo quản, sử dụng trong vòng 2 tuần sau khi mở',
        'Hạn sử dụng (chưa mở): 3-6 tháng kể từ ngày sản xuất',
        'Đậy kín nắp sau mỗi lần sử dụng',
      ],
    },
    ordering: {
      title: 'Hướng dẫn đặt hàng',
      steps: [
        'Bước 1: Chọn sản phẩm yêu thích tại mục Cửa Hàng',
        'Bước 2: Thêm vào Giỏ Hàng, chọn số lượng',
        'Bước 3: Điền thông tin giao hàng (họ tên, số điện thoại, địa chỉ)',
        'Bước 4: Chọn phương thức thanh toán and xác nhận đơn hàng',
      ],
      paymentMethods: ['COD (thanh toán khi nhận hàng)', 'Chuyển khoản ngân hàng'],
      shipping: 'Giao hàng toàn quốc',
      note: 'Đơn hàng sẽ được xử lý trong vòng 1-2 ngày làm việc',
    },
    returns: {
      title: 'Chính sách đổi trả',
      items: [
        'Đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi do nhà sản xuất',
        'Sản phẩm phải còn nguyên seal, chưa mở nắp',
        'Liên hệ nhân viên hỗ trợ để được hướng dẫn đổi trả',
        'Không áp dụng đổi trả với sản phẩm đã mở sử dụng (trừ lỗi chất lượng)',
      ],
    },
    contact: {
      title: 'Thông tin liên hệ',
      channels: [
        'Chat trực tiếp trên website (chatbot AI hoặc nhân viên)',
        'Fanpage Facebook: VietCharm',
        'Email: contact@vietcharm.vn',
      ],
      workingHours: 'Nhân viên hỗ trợ: 8:00 - 22:00 hàng ngày',
    },
  },

  // ==================== CÂU HỎI THƯỜNG GẶP (FAQ) ====================
  faq: [
    {
      question: "VietCharm là gì?",
      answer: "VietCharm là thương hiệu mứt trái cây thủ công cao cấp, đại diện cho tinh hoa nông sản and văn hóa 3 miền Bắc – Trung – Nam.",
    },
    {
      question: "Slogan của VietCharm là gì?",
      answer: "\"Ba miền chung mâm - VietCharm chung vị\".",
    },
    {
      question: "Tên đầy đủ của công ty là gì?",
      answer: "Công ty TNHH VIETCHARM.",
    },
    {
      question: "Ý nghĩa tên gọi VietCharm?",
      answer: "Là sự kết hợp giữa \"Việt\" (bản sắc Việt Nam) and \"Charm\" (nét quyến rũ, duyên dáng của hương vị truyền thống).",
    },
    {
      question: "Cửa hàng VietCharm ở đâu?",
      answer: "Hiện tại VietCharm tập trung bán trực tuyến, địa chỉ văn phòng tại số 10 Đường Nguyễn Văn Dung, P.6, Gò Vấp, TP.HCM.",
    },
    {
      question: "Tôi có thể liên hệ qua đâu?",
      answer: "Bạn có thể gửi email đến vietcharmvn25@gmail.com hoặc gọi hotline 0363386787. Ngoài ra bạn có thể liên hệ thông qua fanpage chính thức của VietCharm cũng như kênh tiktok của chúng mình để liên hệ hợp tác.\nFanpage: https://www.facebook.com/profile.php?id=61586548063950\nTiktok: https://www.tiktok.com/@mutvietcharm?is_from_webapp=1&sender_device=pc",
    },
    {
      question: "VietCharm có Fanpage không?",
      answer: "Có, tên Fanpage là \"VietCharm - Nét duyên Hương Việt\".\nĐường link fanpage để quý khách hàng có thể tiện truy cập ạ: https://www.facebook.com/profile.php?id=61586548063950",
    },
    {
      question: "VietCharm khác gì với mứt công nghiệp?",
      answer: "VietCharm làm thủ công, ít đường, không phẩm màu, không chất bảo quản and mang câu chuyện văn hóa vùng miền. Ăn mứt VietCharm vừa khỏe, vừa thể hiện tình yêu quê hương đất nước nè !!!",
    },
    {
      question: "Tầm nhìn của VietCharm?",
      answer: "Trở thành thương hiệu mứt trái cây 3 miền tiêu biểu của Việt Nam and vươn tầm quốc tế.",
    },
    {
      question: "Sứ mệnh của bạn là gì?",
      answer: "Tôn vinh nông sản Việt, hỗ trợ nông dân and mang sản phẩm sạch đến người tiêu dùng.",
    },
    {
      question: "VietCharm có bao nhiêu loại mứt chính?",
      answer: "Hiện có 6 dòng chủ lực chia đều cho 3 miền. Bạn có thể tham quan giỏ hàng để khám phá rõ hơn về các dòng sản phẩm của shop nhé.",
    },
    {
      question: "Miền Bắc có mứt gì?",
      answer: "Mứt Mơ and mứt Mận.",
    },
    {
      question: "Mứt Mơ VietCharm lấy nguyên liệu từ đâu?",
      answer: "Từ vùng trung du Bắc Bộ, gắn liền văn hóa Hà Nội.",
    },
    {
      question: "Mứt Mận có đặc điểm gì?",
      answer: "Làm từ mận hậu vùng núi phía Bắc, vị chua ngọt đằm thắm.",
    },
    {
      question: "Miền Trung có những loại mứt nào?",
      answer: "Mứt Hạt sen and mứt Dâu tây.",
    },
    {
      question: "Hạt sen của VietCharm là sen gì?",
      answer: "Sen từ Cố đô Huế, mềm bở and thanh tao.",
    },
    {
      question: "Dâu tây được trồng ở đâu?",
      answer: "Nguồn nguyên liệu chính từ Đà Lạt.",
    },
    {
      question: "Miền Nam có mứt gì nổi bật?",
      answer: "Mứt Dừa and mứt Mãng cầu.",
    },
    {
      question: "Mứt Dừa VietCharm lấy từ đâu?",
      answer: "Đặc sản Bến Tre với vị béo ngọt tự nhiên.",
    },
    {
      question: "Mứt Mãng cầu có vị như thế nào?",
      answer: "Vị chua ngọt nhiệt đới đặc trưng, rất lạ miệng.",
    },
    {
      question: "Tại sao lại chọn mứt Hạt sen cho miền Trung?",
      answer: "Vì nó đại diện cho sự tinh tế, đài các của ẩm thực cung đình Huế.",
    },
    {
      question: "Mứt nào phù hợp với người thích vị chua?",
      answer: "Mứt Mơ hoặc mứt Mận.",
    },
    {
      question: "Mứt nào dành cho người thích vị béo?",
      answer: "Chắc chắn là mứt Dừa Bến Tre.",
    },
    {
      question: "VietCharm có mứt Chùm ruột không?",
      answer: "Đây là dòng sản phẩm dự phòng and đang được ban quản trị VietCharm cân nhắc ra mắt trong các dịp đặc biệt. Quý khách hãy đón chờ cũng VietCharm nhé.",
    },
    {
      question: "Mứt Thanh long có nằm trong danh mục không?",
      answer: "Có thể lắm chứ, đây là một sản phẩm dự phòng cho khu vực Nam Trung Bộ mà VietCharm cân nhắc cho vào danh mục sản phẩm. Cũng nhau đón chờ nhé quý khách hàng iu ơi.",
    },
    {
      question: "Tôi muốn mua mứt đại diện cho cả 3 miền?",
      answer: "Bạn có thể chọn Set quà tặng 3 miền của VietCharm.",
    },
    {
      question: "Mứt dâu tây có quá ngọt không?",
      answer: "Không, VietCharm hướng đến vị ngọt tự nhiên của trái cây, ít đường.",
    },
    {
      question: "Mứt hạt sen có bị nát không?",
      answer: "Không, quy trình thủ công giúp hạt sen giữ nguyên hình dáng nhưng vẫn bở mềm.",
    },
    {
      question: "Mứt mãng cầu có hạt không?",
      answer: "Chúng tôi đã xử lý tách hạt tối đa để khách hàng dễ thưởng thức.",
    },
    {
      question: "Mứt mận có giòn không?",
      answer: "Mứt mận VietCharm giữ được độ dẻo dai đặc trưng của mận hậu.",
    },
    {
      question: "Vị mứt miền Bắc có gì khác?",
      answer: "Thường có vị thanh nhẹ, tao nhã.",
    },
    {
      question: "Vị mứt miền Trung có gì đặc biệt?",
      answer: "Mang đậm dấu ấn tinh tế and đậm đà.",
    },
    {
      question: "Vị mứt miền Nam có đặc điểm gì?",
      answer: "Nổi bật với vị ngọt tự nhiên and phong phú của trái cây nhiệt đới.",
    },
    {
      question: "Sản phẩm nào bán chạy nhất?",
      answer: "Tùy vào sở thích, nhưng Mứt Dâu Tây and Hạt Sen thường rất được lòng giới trẻ.",
    },
    {
      question: "Tôi muốn thử vị mứt truyền thống nhất?",
      answer: "Hãy thử Mứt Mơ hoặc Mứt Dừa nhé.",
    },
    {
      question: "Sản phẩm có dùng chất bảo quản không?",
      answer: "Hoàn toàn không chất bảo quản.",
    },
    {
      question: "Mứt VietCharm có dùng phẩm màu không?",
      answer: "Không, màu sắc hoàn toàn tự nhiên từ trái cây.",
    },
    {
      question: "Tôi đang ăn kiêng có dùng được mứt không?",
      answer: "Được, vì VietCharm sử dụng công thức ít đường, lành mạnh.",
    },
    {
      question: "Hàm lượng đường trong mứt là bao nhiêu?",
      answer: "Chúng tôi giảm tối đa lượng đường so với mứt công nghiệp, chỉ vừa đủ để bảo quản tự nhiên.",
    },
    {
      question: "Quy trình sản xuất mứt như thế nào?",
      answer: "Sản xuất thủ công kết hợp quy trình sấy and kiểm soát an toàn thực phẩm hiện đại.",
    },
    {
      question: "Nguồn nguyên liệu có an toàn không?",
      answer: "Nguyên liệu được thu mua trực tiếp từ nông trại vùng miền, có nguồn gốc rõ ràng.",
    },
    {
      question: "Sản phẩm có chứng nhận ATVSTP không?",
      answer: "VietCharm luôn tuân thủ nghiêm ngặt các tiêu chuẩn an toàn thực phẩm. Song do là thương hiệu mới thành lập nên VietCharm vẫn đang cố gắng nâng cao quy trình để có thể đạt được những tiêu chí cung cấp chứng nhận ATVSTP sớm nhất. Mong quý khách hàng vẫn yên tâm sử dụng sản phẩm ạ!",
    },
    {
      question: "Trẻ em có dùng được mứt này không?",
      answer: "Rất tốt cho trẻ vì nguyên liệu tự nhiên and không hóa chất.",
    },
    {
      question: "Người già có dùng được mứt không?",
      answer: "Được, đặc biệt mứt hạt sen and mứt mơ rất tốt cho sức khỏe người lớn tuổi.",
    },
    {
      question: "Tại sao mứt VietCharm không để được quá lâu như siêu thị?",
      answer: "Vì chúng tôi không dùng chất bảo quản hóa học.",
    },
    {
      question: "Mứt có bị lên men không?",
      answer: "Nếu bảo quản đúng cách (nơi khô ráo hoặc ngăn mát), mứt sẽ giữ được vị ngon nhất and thời gian sử dụng được lâu nhất.",
    },
    {
      question: "Sản phẩm có dùng hương liệu nhân tạo không?",
      answer: "Không, mùi thơm của mứt là hương tự nhiên của trái cây tươi đó nha.",
    },
    {
      question: "Lợi ích sức khỏe của mứt mơ là gì?",
      answer: "Hỗ trợ tiêu hóa and giải nhiệt.",
    },
    {
      question: "Lợi ích của mứt hạt sen?",
      answer: "Giúp ngủ ngon and bồi bổ cơ thể.",
    },
    {
      question: "Mứt mãng cầu cung cấp chất gì?",
      answer: "Giàu vitamin C and hỗ trợ hệ miễn dịch.",
    },
    {
      question: "Bao bì VietCharm có gì đặc biệt?",
      answer: "Thiết kế tối giản, đậm chất văn hóa di sản của từng vùng miền.",
    },
    {
      question: "VietCharm có set quà tặng không?",
      answer: "Có các set quà 3 miền sang trọng phù hợp biếu tặng.",
    },
    {
      question: "Chất liệu bao bì là gì?",
      answer: "Chúng tôi ưu tiên vật liệu thân thiện với môi trường, hạn chế nhựa.",
    },
    {
      question: "Tôi có thể yêu cầu gói quà riêng không?",
      answer: "Có, VietCharm hỗ trợ dịch vụ đóng gói quà tặng theo yêu cầu.",
    },
    {
      question: "Trên bao bì có thông tin vùng miền không?",
      answer: "Có, mỗi sản phẩm đều kể câu chuyện về vùng đất xuất thân của nó.",
    },
    {
      question: "VietCharm có cung cấp quà tặng doanh nghiệp không?",
      answer: "Có, chúng tôi có chính sách chiết khấu tốt cho đơn hàng số lượng lớn.",
    },
    {
      question: "Tôi có thể in logo công ty lên quà tặng không?",
      answer: "Có hỗ trợ tùy biến cho đơn hàng quà tặng doanh nghiệp.",
    },
    {
      question: "Hũ mứt làm bằng gì?",
      answer: "Hũ thủy tinh hoặc hũ nhựa PET cao cấp tái chế được, đảm bảo vệ sinh.",
    },
    {
      question: "Thiết kế bao bì lấy cảm hứng từ đâu?",
      answer: "Từ các họa tiết di sản and nét đẹp truyền thống Việt Nam.",
    },
    {
      question: "Có túi xách đi kèm khi mua set quà không?",
      answer: "Có, túi xách được thiết kế đồng bộ and rất lịch sự.",
    },
    {
      question: "Set quà 3 miền có mấy hũ?",
      answer: "Thường có các set 3 hũ hoặc 6 hũ.",
    },
    {
      question: "Tôi có thể tự chọn vị mứt trong set quà không?",
      answer: "Hoàn toàn được, bạn có thể mix vị theo ý thích.",
    },
    {
      question: "Món quà này có phù hợp tặng người nước ngoài không?",
      answer: "Rất phù hợp vì nó mang tính biểu trưng văn hóa Việt Nam cao.",
    },
    {
      question: "Có thiệp chúc mừng đi kèm không?",
      answer: "VietCharm tặng kèm thiệp thiết kế riêng cho các đơn hàng quà tặng.",
    },
    {
      question: "Bao bì có chắc chắn khi vận chuyển xa không?",
      answer: "Có, chúng tôi đóng gói chống sốc rất kỹ lưỡng.",
    },
    {
      question: "Mã QR trên bao bì dùng để làm gì?",
      answer: "Để khách hàng truy cập website xem câu chuyện sản phẩm and quy trình sản xuất.",
    },
    {
      question: "Tôi quét mã QR bằng cách nào?",
      answer: "Dùng camera điện thoại hoặc Zalo để quét trực tiếp trên nhãn hũ.",
    },
    {
      question: "Website VietCharm cung cấp thông tin gì?",
      answer: "Thông tin vùng nguyên liệu, gợi ý sử dụng and các ưu đãi thành viên.",
    },
    {
      question: "Bản đồ di sản trên website là gì?",
      answer: "Là nơi bạn khám phá nguồn gốc của từng loại mứt trên khắp Việt Nam.",
    },
    {
      question: "Tôi có thể đặt hàng trực tiếp trên website không?",
      answer: "Có, hệ thống đặt hàng trực tuyến hoạt động 24/7.",
    },
    {
      question: "VietCharm có chương trình tích điểm không?",
      answer: "Có, khi mua hàng and đăng ký thành viên trên website.",
    },
    {
      question: "Làm sao để biết quy trình làm mứt của bạn?",
      answer: "Bạn có thể xem video quy trình trên website hoặc qua mã QR.",
    },
    {
      question: "Tôi có thể gửi feedback về sản phẩm ở đâu?",
      answer: "Trực tiếp trên website hoặc inbox Fanpage nhé.",
    },
    {
      question: "Hệ thống có lưu lịch sử mua hàng của tôi không?",
      answer: "Có, nếu bạn đăng ký tài khoản thành viên.",
    },
    {
      question: "Tôi quét mã QR có được giảm giá không?",
      answer: "Thường xuyên có các voucher bí mật dành riêng cho khách hàng quét mã đấy!",
    },
    {
      question: "Phí vận chuyển tại TP.HCM là bao nhiêu?",
      answer: "Tùy theo quận, VietCharm có chính sách freeship cho đơn hàng từ 500k.",
    },
    {
      question: "Có giao hàng toàn quốc không?",
      answer: "Có, VietCharm giao hàng đến mọi tỉnh thành Việt Nam.",
    },
    {
      question: "Thời gian nhận hàng là bao lâu?",
      answer: "Nội thành 1-2 ngày, tỉnh thành khác 3-5 ngày.",
    },
    {
      question: "Tôi được kiểm tra hàng trước khi thanh toán không?",
      answer: "Có, bạn được kiểm tra hàng trước khi nhận.",
    },
    {
      question: "Nếu hàng bị vỡ/hỏng khi vận chuyển thì sao?",
      answer: "VietCharm cam kết đổi trả 1:1 miễn phí cho bạn.",
    },
    {
      question: "Có thanh toán qua chuyển khoản không?",
      answer: "Có, hỗ trợ chuyển khoản ngân hàng and các ví điện tử.",
    },
    {
      question: "Có ship COD (thanh toán khi nhận hàng) không?",
      answer: "Có hỗ trợ ship COD toàn quốc.",
    },
    {
      question: "VietCharm có trên Shopee/Lazada không?",
      answer: "Chúng tôi tập trung bán tại Website and Fanpage để chăm sóc khách tốt nhất.",
    },
    {
      question: "Tôi muốn mua sỉ thì liên hệ ai?",
      answer: "Vui lòng gọi hotline 0363386787 để được tư vấn giá sỉ.",
    },
    {
      question: "Hủy đơn hàng đã đặt như thế nào?",
      answer: "Bạn vui lòng liên hệ hotline sớm nhất trước khi đơn hàng được gửi đi.",
    },
    {
      question: "Tôi có thể hẹn giờ giao hàng không?",
      answer: "Có, hãy ghi chú trong đơn hàng hoặc báo với nhân viên tư vấn.",
    },
    {
      question: "Có hóa đơn đỏ (VAT) không?",
      answer: "Có cung cấp hóa đơn cho khách hàng doanh nghiệp.",
    },
    {
      question: "VietCharm có chi nhánh miền Bắc không?",
      answer: "Hiện tại chúng tôi gửi hàng từ kho TP.HCM ra toàn quốc.",
    },
    {
      question: "Tôi có thể mua trực tiếp tại văn phòng Gò Vấp không?",
      answer: "Có, nhưng vui lòng liên hệ trước để chúng tôi chuẩn bị hàng nhé.",
    },
    {
      question: "Hạn sử dụng của mứt là bao lâu?",
      answer: "Thường từ 4-6 tháng kể từ ngày sản xuất (chi tiết in trên bao bì).",
    },
    {
      question: "VietCharm hỗ trợ nông dân như thế nào?",
      answer: "Chúng tôi thu mua nguyên liệu tận vườn với giá ổn định, giúp nâng cao giá trị nông sản.",
    },
    {
      question: "Bạn có giúp giảm lãng phí nông sản không?",
      answer: "Có, việc chế biến sâu giúp giải quyết đầu ra cho trái cây khi vào mùa vụ cao điểm.",
    },
    {
      question: "Tại sao VietCharm lại hướng tới sự bền vững?",
      answer: "Vì chúng tôi muốn bảo vệ môi trường and phát triển cộng đồng nông nghiệp Việt Nam.",
    },
    {
      question: "VietCharm có dự án thiện nguyện nào không?",
      answer: "Chúng tôi trích một phần lợi nhuận để hỗ trợ các vùng trồng nguyên liệu khó khăn.",
    },
    {
      question: "Tôi muốn cộng tác giới thiệu sản phẩm có được không?",
      answer: "Rất hoan nghênh, hãy liên hệ qua email vietcharmvn25@gmail.com nhé.",
    },
    {
      question: "Làm sao để biết VietCharm dùng nguyên liệu sạch?",
      answer: "Chúng tôi công khai thông tin vùng nguyên liệu trên website and qua mã QR.",
    },
    {
      question: "VietCharm có tuyển cộng tác viên bán hàng không?",
      answer: "Có, chúng tôi luôn tìm kiếm những người cùng tình yêu với văn hóa Việt.",
    },
    {
      question: "Tại sao bạn lại tập trung vào mứt 3 miền?",
      answer: "Để kết nối tinh hoa ẩm thực cả nước and khơi dậy niềm tự hào dân tộc.",
    },
    {
      question: "Sản phẩm VietCharm có phù hợp làm quà du lịch không?",
      answer: "Rất phù hợp vì nó là hình ảnh thu nhỏ của đặc sản Việt Nam.",
    },
    {
      question: "Làm sao để ủng hộ VietCharm bền vững hơn?",
      answer: "Hãy tiếp tục tin dùng and lan tỏa câu chuyện về mứt di sản Việt Nam cùng chúng tôi!",
    },
    {
      question: "Màu đỏ trên logo VietCharm là đỏ gì vậy?",
      answer: "Là màu đỏ của sự nhiệt huyết, của quả chín and cũng là màu đỏ may mắn trong ngày Tết truyền thống.",
    },
    {
      question: "Tại sao VietCharm lại chọn bao bì thân thiện với môi trường?",
      answer: "Vì tụi mình muốn di sản Việt được bảo tồn trong một môi trường xanh and bền vững nhất.",
    },
    {
      question: "Bản đồ di sản là gì?",
      answer: "Bản đồ di sản - hay chương trình \"Hành trình khám phá di sản Việt\" là một chương trình đang được nhà VietCharm chúng mình triển khai. Khi tham gia, bạn sẽ đóng vai là một nhà thám hiểm lần lượt mở khóa các giá trị di sản trên bản đồ Việt Nam thông qua việc sưu tập các loại mứt trái cây đặc thù của từng vùng miền. Chi tiết hơn thì bạn có thể theo dãi fanpage hoặc tiktok của VietCharm nhé.",
    },
    {
      question: "Làm sao để tham gia chương trình hành trình di sản Việt?",
      answer: "Để tham gia chương trình hành trình di sản Việt, quý khách hàng cần sở hữu cho mình ít nhất một trong các loại sản phẩm mứt trái cây của VietCharm. Sau đó quét mã QR đằng sau mỗi hũ mứt là bạn đã có thể bắt đầu chuyến hành trình khám phá di sản rồi, chúc bạn enjoy mứt VietCharm and mở khóa được thật nhiều danh hiệu cực ngầu nhé!",
    },
  ],

  // ==================== GỢI Ý TƯ VẤN ====================
  recommendations: {
    bestSeller: {
      product: 'Combo 6 Vị Di Sản',
      reason: 'Trọn bộ 6 hương vị, tiết kiệm 125.000₫, đóng gói cao cấp',
    },
    forGift: {
      product: 'Combo 6 Vị Di Sản hoặc Combo Gia Đình',
      reason: 'Đóng gói tinh tế, đa dạng hương vị, phù hợp làm quà tặng',
    },
    forTrying: {
      product: 'Combo Trải Nghiệm 2 Món',
      reason: 'Chọn 2 vị yêu thích để trải nghiệm, giá hợp lý',
    },
    sweetTooth: {
      products: ['Mứt Dâu Tây Đà Lạt', 'Mứt Hạt Sen Huế'],
      reason: 'Vị ngọt thanh, dễ ăn, phù hợp người thích vị ngọt',
    },
    sourLover: {
      products: ['Mứt Mận Mộc Châu', 'Mứt Mãng Cầu Tiền Giang'],
      reason: 'Vị chua thanh tự nhiên, cân bằng với vị ngọt',
    },
    forTea: {
      products: ['Mứt Hạt Sen Huế', 'Mứt Mơ Ba Vì'],
      reason: 'Vị thanh nhẹ, bùi dịu, hoàn hảo khi dùng cùng trà nóng',
    },
    richFlavor: {
      products: ['Mứt Dừa Bến Tre'],
      reason: 'Vị béo ngọt đặc trưng, đậm đà hương quê',
    },
  },

  // ==================== SO SÁNH SẢN PHẨM ====================
  comparisons: [
    {
      title: 'So sánh theo vùng miền',
      data: {
        'Miền Bắc': { products: ['Mứt Mận Mộc Châu', 'Mứt Mơ Ba Vì'], flavor: 'Chua thanh, dịu nhẹ' },
        'Miền Trung': { products: ['Mứt Hạt Sen Huế', 'Mứt Dâu Tây Đà Lạt'], flavor: 'Thanh tao, ngọt nhẹ' },
        'Miền Nam': { products: ['Mứt Dừa Bến Tre', 'Mứt Mãng Cầu Tiền Giang'], flavor: 'Béo ngọt, chua ngọt nhiệt đới' },
      },
    },
    {
      title: 'So sánh theo hương vị',
      data: {
        'Ngọt nhất': 'Mứt Hạt Sen Huế – vị ngọt bùi thanh tao',
        'Chua nhất': 'Mứt Mận Mộc Châu – chua thanh tự nhiên của mận hậu',
        'Béo nhất': 'Mứt Dừa Bến Tre – béo dịu đặc trưng của dừa',
        'Cân bằng nhất': 'Mứt Dâu Tây Đà Lạt – chua ngọt hài hòa',
        'Đặc biệt nhất': 'Mứt Mãng Cầu Tiền Giang – vị nhiệt đới độc đáo',
        'Thanh nhẹ nhất': 'Mứt Mơ Ba Vì – dịu dàng, tinh tế',
      },
    },
  ],

  // ==================== CHƯƠNG TRÌNH BẢN ĐỒ DI SẢN ====================
  heritageMap: {
    name: 'Hành trình khám phá di sản Việt',
    alias: 'Bản đồ di sản',
    description: 'Chương trình đang được VietCharm triển khai. Khi tham gia, bạn sẽ đóng vai là một nhà thám hiểm, lần lượt mở khóa các giá trị di sản trên bản đồ Việt Nam thông qua việc sưu tập các loại mứt trái cây đặc thù của từng vùng miền.',
    howToJoin: [
      'Sở hữu ít nhất một sản phẩm mứt trái cây của VietCharm',
      'Quét mã QR đằng sau mỗi hũ mứt để bắt đầu hành trình',
      'Mở khóa các giá trị di sản và thu thập danh hiệu',
    ],
    moreInfo: 'Theo dõi fanpage hoặc TikTok của VietCharm để cập nhật chi tiết chương trình.',
  },
};

// ==================== SYSTEM PROMPT CHO GEMINI ====================
export function buildSystemPrompt(language: 'vi' | 'en' = 'vi'): string {
  const k = CHATBOT_KNOWLEDGE;

  let prompt = '';
  
  if (language === 'en') {
    prompt = `You are VietCharm AI – product advisor for the brand ${k.brand.fullName}.
VietCharm is a handcrafted fruit jam brand, bringing traditional flavors from the North, Central, and South of Vietnam.

## Role:
- Advise and introduce fruit jam products to customers
- Answer questions about products: price, ingredients, origin, serving suggestions, preservation
- Suggest products suitable for customer needs
- Support ordering information

## Rules:
1. Always reply in English, friendly and professional
2. Use appropriate emojis to create a friendly feeling
3. Only advise based on the product information provided below
4. If asked outside VietCharm's scope, gently redirect back to products
5. When uncertain or customer asks for returns/complaints, suggest "contact support staff"
6. Emphasize highlights: handcrafted, no preservatives, natural ingredients
7. Reply concisely, easy to read, use bullet points when needed
8. When introducing products, include the price
9. Do not invent information. Only use the provided data.

## Brand Values:
${k.brand.valuesEn ? k.brand.valuesEn.map(v => `- ${v}`).join('\n') : k.brand.values.map(v => `- ${v}`).join('\n')}
`;
  } else {
    prompt = `Bạn là VietCharm AI – trợ lý tư vấn sản phẩm của thương hiệu ${k.brand.fullName}.
${k.brand.description}

## Vai trò:
- Tư vấn, giới thiệu sản phẩm mứt trái cây cho khách hàng
- Trả lời câu hỏi về sản phẩm: giá cả, thành phần, nguồn gốc, cách thưởng thức, bảo quản
- Gợi ý sản phẩm phù hợp với nhu cầu khách hàng
- Hỗ trợ thông tin đặt hàng

## Quy tắc:
1. Luôn trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
2. Sử dụng emoji phù hợp để tạo cảm giác gần gũi
3. Chỉ tư vấn dựa trên thông tin sản phẩm được cung cấp bên dưới
4. Nếu khách hỏi ngoài phạm vi sản phẩm VietCharm, hãy nhẹ nhàng hướng lại về sản phẩm
5. Khi không chắc chắn hoặc khách yêu cầu đổi trả/khiếu nại, hãy đề xuất "liên hệ nhân viên hỗ trợ"
6. Nhấn mạnh các điểm nổi bật: thủ công, không chất bảo quản, nguyên liệu tự nhiên
7. Trả lời ngắn gọn, dễ đọc, dùng bullet point khi cần
8. Khi giới thiệu sản phẩm, nên kèm giá
9. Không bịa thông tin. Chỉ dùng dữ liệu được cung cấp.

## Giá trị thương hiệu:
${k.brand.values.map(v => `- ${v}`).join('\n')}
`;
  }

  prompt += `\n## DANH SÁCH SẢN PHẨM LẺ (6 vị):
`;

  for (const p of k.products) {
    prompt += `
### ${p.name} (${p.nameEn}) – ${p.region}
- Giá: ${p.priceFormatted} / ${p.weight}
- Mô tả: ${p.shortDescription}
- Thành phần: ${p.ingredients}
- Nguồn gốc: ${p.origin}
- Đặc điểm: ${p.features}
- Hương vị: ${p.taste}
- Câu chuyện: ${p.story}
- Cách thưởng thức: ${p.servingSuggestions.join('; ')}
`;
  }

  prompt += `\n## COMBO ĐẶC BIỆT:\n`;
  for (const c of k.combos) {
    prompt += `
### ${c.name}
- Giá: ${c.priceFormatted} / ${c.weight}
- Mô tả: ${c.description}
- Nổi bật: ${c.highlight}
- Chọn: ${c.comboChoices} hương vị
${c.includes ? `- Bao gồm: ${c.includes.join(', ')}` : ''}
`;
  }

  prompt += `\n## CHÍNH SÁCH BẢO QUẢN:\n`;
  prompt += k.policies.preservation.items.map(i => `- ${i}`).join('\n');

  prompt += `\n\n## HƯỚNG DẪN ĐẶT HÀNG:\n`;
  prompt += k.policies.ordering.steps.join('\n');
  prompt += `\n- Thanh toán: ${k.policies.ordering.paymentMethods.join(', ')}`;
  prompt += `\n- ${k.policies.ordering.shipping}`;

  prompt += `\n\n## CHÍNH SÁCH ĐỔI TRẢ:\n`;
  prompt += k.policies.returns.items.map(i => `- ${i}`).join('\n');

  prompt += `\n\n## LIÊN HỆ:\n`;
  prompt += k.policies.contact.channels.map(c => `- ${c}`).join('\n');
  prompt += `\n- ${k.policies.contact.workingHours}`;

  prompt += `\n\n## CÂU HỎI THƯỜNG GẶP:\n`;
  for (const faq of k.faq) {
    prompt += `\nQ: ${faq.question}\nA: ${faq.answer}\n`;
  }

  prompt += `\n\n## GỢI Ý TƯ VẤN:\n`;
  prompt += `- Best seller: ${k.recommendations.bestSeller.product} – ${k.recommendations.bestSeller.reason}\n`;
  prompt += `- Làm quà: ${k.recommendations.forGift.product} – ${k.recommendations.forGift.reason}\n`;
  prompt += `- Dùng thử: ${k.recommendations.forTrying.product} – ${k.recommendations.forTrying.reason}\n`;
  prompt += `- Thích ngọt: ${k.recommendations.sweetTooth.products.join(', ')} – ${k.recommendations.sweetTooth.reason}\n`;
  prompt += `- Thích chua: ${k.recommendations.sourLover.products.join(', ')} – ${k.recommendations.sourLover.reason}\n`;
  prompt += `- Uống trà: ${k.recommendations.forTea.products.join(', ')} – ${k.recommendations.forTea.reason}\n`;
  prompt += `- Đậm đà: ${k.recommendations.richFlavor.products.join(', ')} – ${k.recommendations.richFlavor.reason}\n`;

  prompt += `\n\n## SO SÁNH SẢN PHẨM:\n`;
  const flavorComp = k.comparisons[1].data as unknown as Record<string, string>;
  for (const [key, val] of Object.entries(flavorComp)) {
    prompt += `- ${key}: ${val}\n`;
  }

  prompt += `\n\n## CHƯƠNG TRÌNH BẢN ĐỒ DI SẢN:\n`;
  prompt += `- Tên: ${k.heritageMap.name} (${k.heritageMap.alias})\n`;
  prompt += `- Mô tả: ${k.heritageMap.description}\n`;
  prompt += `- Cách tham gia:\n`;
  for (const step of k.heritageMap.howToJoin) {
    prompt += `  + ${step}\n`;
  }
  prompt += `- ${k.heritageMap.moreInfo}\n`;

  return prompt;
}
