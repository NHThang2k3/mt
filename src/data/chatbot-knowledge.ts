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
      story: 'Ba Vì hiện lên với những dãy núi trập trùng, mây trắng bảng lảng và không khí mát lành quanh năm. Vùng trồng mơ truyền thống của miền Bắc, nơi những cây mơ âm thầm kết trái mỗi độ giao mùa.',
      servingSuggestions: [
        'Dùng cùng trà nóng hoặc trà thảo mộc',
        'Pha nước mơ ấm cho ngày se lạnh',
        'Kết hợp với sữa chua không đường',
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
      origin: 'Hồ sen làng Phú Mậu (Phú Vang) và khu vực Hương Sơ – Hương Long (TP. Huế)',
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
      story: 'Bến Tre được mệnh danh là xứ dừa của miền Tây Nam Bộ – nơi những hàng dừa nghiêng bóng soi mình xuống kênh rạch, gắn liền với đời sống và ẩm thực qua bao thế hệ.',
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
      taste: 'Vị chua chạm nhẹ đầu lưỡi rồi tan dần trong vị ngọt dịu, tạo cảm giác tươi mới và dễ chịu.',
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
        'Bước 4: Chọn phương thức thanh toán và xác nhận đơn hàng',
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
      answer: "VietCharm là thương hiệu mứt trái cây thủ công cao cấp, đại diện cho tinh hoa nông sản và văn hóa 3 miền Bắc – Trung – Nam.",
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
      answer: "Là sự kết hợp giữa \"Việt\" (bản sắc Việt Nam) và \"Charm\" (nét quyến rũ, duyên dáng của hương vị truyền thống).",
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
      answer: "VietCharm làm thủ công, ít đường, không phẩm màu, không chất bảo quản và mang câu chuyện văn hóa vùng miền. Ăn mứt VietCharm vừa khỏe, vừa thể hiện tình yêu quê hương đất nước nè !!!",
    },
    {
      question: "Tầm nhìn của VietCharm?",
      answer: "Trở thành thương hiệu mứt trái cây 3 miền tiêu biểu của Việt Nam và vươn tầm quốc tế.",
    },
    {
      question: "Sứ mệnh của bạn là gì?",
      answer: "Tôn vinh nông sản Việt, hỗ trợ nông dân và mang sản phẩm sạch đến người tiêu dùng.",
    },
    {
      question: "VietCharm có bao nhiêu loại mứt chính?",
      answer: "Hiện có 6 dòng chủ lực chia đều cho 3 miền. Bạn có thể tham quan giỏ hàng để khám phá rõ hơn về các dòng sản phẩm của shop nhé.",
    },
    {
      question: "Miền Bắc có mứt gì?",
      answer: "Mứt Mơ và mứt Mận.",
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
      answer: "Mứt Hạt sen và mứt Dâu tây.",
    },
    {
      question: "Hạt sen của VietCharm là sen gì?",
      answer: "Sen từ Cố đô Huế, mềm bở và thanh tao.",
    },
    {
      question: "Dâu tây được trồng ở đâu?",
      answer: "Nguồn nguyên liệu chính từ Đà Lạt.",
    },
    {
      question: "Miền Nam có mứt gì nổi bật?",
      answer: "Mứt Dừa và mứt Mãng cầu.",
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
      answer: "Đây là dòng sản phẩm dự phòng và đang được ban quản trị VietCharm cân nhắc ra mắt trong các dịp đặc biệt. Quý khách hãy đón chờ cũng VietCharm nhé.",
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
      answer: "Mang đậm dấu ấn tinh tế và đậm đà.",
    },
    {
      question: "Vị mứt miền Nam có đặc điểm gì?",
      answer: "Nổi bật với vị ngọt tự nhiên và phong phú của trái cây nhiệt đới.",
    },
    {
      question: "Sản phẩm nào bán chạy nhất?",
      answer: "Tùy vào sở thích, nhưng Mứt Dâu Tây và Hạt Sen thường rất được lòng giới trẻ.",
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
      answer: "Sản xuất thủ công kết hợp quy trình sấy và kiểm soát an toàn thực phẩm hiện đại.",
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
      answer: "Rất tốt cho trẻ vì nguyên liệu tự nhiên và không hóa chất.",
    },
    {
      question: "Người già có dùng được mứt không?",
      answer: "Được, đặc biệt mứt hạt sen và mứt mơ rất tốt cho sức khỏe người lớn tuổi.",
    },
    {
      question: "Tại sao mứt VietCharm không để được quá lâu như siêu thị?",
      answer: "Vì chúng tôi không dùng chất bảo quản hóa học.",
    },
    {
      question: "Mứt có bị lên men không?",
      answer: "Nếu bảo quản đúng cách (nơi khô ráo hoặc ngăn mát), mứt sẽ giữ được vị ngon nhất và thời gian sử dụng được lâu nhất.",
    },
    {
      question: "Sản phẩm có dùng hương liệu nhân tạo không?",
      answer: "Không, mùi thơm của mứt là hương tự nhiên của trái cây tươi đó nha.",
    },
    {
      question: "Lợi ích sức khỏe của mứt mơ là gì?",
      answer: "Hỗ trợ tiêu hóa và giải nhiệt.",
    },
    {
      question: "Lợi ích của mứt hạt sen?",
      answer: "Giúp ngủ ngon và bồi bổ cơ thể.",
    },
    {
      question: "Mứt mãng cầu cung cấp chất gì?",
      answer: "Giàu vitamin C và hỗ trợ hệ miễn dịch.",
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
      answer: "Từ các họa tiết di sản và nét đẹp truyền thống Việt Nam.",
    },
    {
      question: "Có túi xách đi kèm khi mua set quà không?",
      answer: "Có, túi xách được thiết kế đồng bộ và rất lịch sự.",
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
      answer: "Để khách hàng truy cập website xem câu chuyện sản phẩm và quy trình sản xuất.",
    },
    {
      question: "Tôi quét mã QR bằng cách nào?",
      answer: "Dùng camera điện thoại hoặc Zalo để quét trực tiếp trên nhãn hũ.",
    },
    {
      question: "Website VietCharm cung cấp thông tin gì?",
      answer: "Thông tin vùng nguyên liệu, gợi ý sử dụng và các ưu đãi thành viên.",
    },
    {
      question: "\"Bản đồ di sản\" trên website là gì?",
      answer: "Là nơi bạn khám phá nguồn gốc của từng loại mứt trên khắp Việt Nam.",
    },
    {
      question: "Tôi có thể đặt hàng trực tiếp trên website không?",
      answer: "Có, hệ thống đặt hàng trực tuyến hoạt động 24/7.",
    },
    {
      question: "VietCharm có chương trình tích điểm không?",
      answer: "Có, khi mua hàng và đăng ký thành viên trên website.",
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
      answer: "Có, hỗ trợ chuyển khoản ngân hàng và các ví điện tử.",
    },
    {
      question: "Có ship COD (thanh toán khi nhận hàng) không?",
      answer: "Có hỗ trợ ship COD toàn quốc.",
    },
    {
      question: "VietCharm có trên Shopee/Lazada không?",
      answer: "Chúng tôi tập trung bán tại Website và Fanpage để chăm sóc khách tốt nhất.",
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
      answer: "Vì chúng tôi muốn bảo vệ môi trường và phát triển cộng đồng nông nghiệp Việt Nam.",
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
      answer: "Chúng tôi công khai thông tin vùng nguyên liệu trên website và qua mã QR.",
    },
    {
      question: "VietCharm có tuyển cộng tác viên bán hàng không?",
      answer: "Có, chúng tôi luôn tìm kiếm những người cùng tình yêu với văn hóa Việt.",
    },
    {
      question: "Tại sao bạn lại tập trung vào mứt 3 miền?",
      answer: "Để kết nối tinh hoa ẩm thực cả nước và khơi dậy niềm tự hào dân tộc.",
    },
    {
      question: "Sản phẩm VietCharm có phù hợp làm quà du lịch không?",
      answer: "Rất phù hợp vì nó là hình ảnh thu nhỏ của đặc sản Việt Nam.",
    },
    {
      question: "Làm sao để ủng hộ VietCharm bền vững hơn?",
      answer: "Hãy tiếp tục tin dùng và lan tỏa câu chuyện về mứt di sản Việt Nam cùng chúng tôi!",
    },
    {
      question: "Đào Minh Tiến / Nguyễn Nhật Toàn/ Cao Hồ Trường Thọ/ Trương Khánh Vy/ Mạch Đàn Tuyên/ Nguyễn Ngọc Khả Tú/ Nguyễn Ngọc Anh Thư/ Trương Nguyễn Ngọc Vân/ Nguyễn Hữu Tài là ai?",
      answer: "Đây là một trong những người \"góp gạch\" xây nên nền móng của VietCharm. Người này thuộc ban quản trị, đưa ra những quyết định ảnh hưởng trực tiếp đến chiến lược phát triển và tương lai của tụi mình. Đại loại là một \"Sếp lớn\" của VietCharm á, vuýp lắm !!",
    },
    {
      question: "Bản đồ di sản là gì?",
      answer: "Bản đồ di sản - hay chương trình \"Hành trình khám phá di sản Việt\" là một chương trình đang được nhà VietCharm chúng mình triển khai. Khi tham gia, bạn sẽ đóng vai là một nhà thám hiểm lần lượt mở khóa các giá trị di sản trên bản đồ Việt Nam thông qua việc sưu tập các loại mứt trái cây đặc thù của từng vùng miền. Chi tiết hơn thì bạn có thể theo dãi fanpage hoặc tiktok của VietCharm nhé.",
    },
    {
      question: "Làm sao để tham gia chương trình hành trình di sản Việt?",
      answer: "Để tham gia chương trình hành trình di sản Việt, quý khách hàng cần sở hữu cho mình ít nhất một trong các loại sản phẩm mứt trái cây của VietCharm. Sau đó quét mã QR đằng sau mỗi hũ mứt là bạn đã có thể bắt đầu chuyến hành trình khám phá di sản rồi, chúc bạn enjoy mứt VietCharm và mở khóa được thật nhiều danh hiệu cực ngầu nhé!",
    },
    {
      question: "Ăn mứt VietCharm thế nào cho sành điệu nhỉ?",
      answer: "Ngoài ăn trực tiếp, bạn thử phết lên bánh mì nướng nóng hổi hoặc bỏ vào sữa chua không đường xem, đảm bảo \"dính\" luôn đó nha!",
    },
    {
      question: "Tết này nhà mình có mứt VietCharm thì nên uống trà gì?",
      answer: "Tụi mình gợi ý trà Oolong hoặc trà Sen nhé. Vị chát nhẹ của trà quyện với vị ngọt thanh của mứt di sản đúng là \"cặp bài trùng\" luôn nè.",
    },
    {
      question: "Mứt dâu tây Đà Lạt có làm trà trái cây được không?",
      answer: "Được chứ, bạn chỉ cần pha trà túi lọc, thêm vài thìa mứt dâu và ít đá là có ngay ly trà dâu \"chill\" tại gia rồi.",
    },
    {
      question: "Sáng ra lười nấu ăn thì mứt VietCharm có \"cứu\" được mình không?",
      answer: "Cứu tinh đây rồi! Một lát bánh mì sandwich và một lớp mứt mãng cầu nồng nàn là đủ năng lượng cho buổi sáng năng động.",
    },
    {
      question: "Mình thích chụp ảnh sống ảo, mứt VietCharm lên hình đẹp không?",
      answer: "Ôi thôi rồi, bao bì tụi mình thiết kế theo style di sản tối giản nên đặt cạnh tách trà là có ngay ảnh \"ngàn like\" luôn đó.",
    },
    {
      question: "Mứt dừa Bến Tre có quá béo không bạn ơi?",
      answer: "Béo ngậy tự nhiên từ dừa nguyên chất nhưng không hề ngấy đâu nè, vì tụi mình đã điều chỉnh lượng đường cực thấp rồi.",
    },
    {
      question: "Bữa tiệc trà chiều với hội bạn thì nên chọn combo nào?",
      answer: "Bạn thử combo 3 miền: Mận Mộc Châu (chua), Hạt sen Huế (bùi) và Mứt dừa (béo). Đủ vị cho cả nhóm tám chuyện xuyên lục địa!",
    },
    {
      question: "Mứt hạt sen Huế có giúp mình ngủ ngon hơn không?",
      answer: "Hạt sen vốn nổi tiếng giúp an thần mà. Nhâm nhi vài viên mứt sen trước khi ngủ cùng chút nước ấm là ngủ ngon tới sáng luôn.",
    },
    {
      question: "Mứt mận hậu có hạt không để mình cho bé ăn?",
      answer: "Tụi mình đã tách hạt khéo léo rồi, nhưng với các bé nhỏ bạn vẫn nên để ý một chút cho an tâm tuyệt đối nhé.",
    },
    {
      question: "Vị nào của VietCharm làm mình tỉnh táo nhất nhỉ?",
      answer: "Thử ngay mứt mơ vùng trung du nhé, vị chua thanh \"bừng tỉnh\" mọi giác quan luôn á!",
    },
    {
      question: "Mình muốn làm bánh kẹp mứt, mứt nào hợp nhất?",
      answer: "Mứt dâu tây Đà Lạt dẻo thơm là lựa chọn số 1 cho các tín đồ yêu bánh ngọt nè.",
    },
    {
      question: "Hũ mứt nhỏ xíu vậy có đủ cho cả nhà ăn không?",
      answer: "Nhìn vậy thôi chứ hũ mứt VietCharm \"nhỏ mà có võ\", đủ để cả gia đình quây quần nhâm nhi suốt mấy ngày Tết luôn.",
    },
    {
      question: "Mứt dừa trắng tinh vậy có dùng chất tẩy không?",
      answer: "Tuyệt đối không nha! Đó là màu trắng nguyên bản của cơm dừa non Bến Tre đó, tụi mình yêu sự tự nhiên mà.",
    },
    {
      question: "Dạo này mình hơi stress, có vị mứt nào \"vỗ về\" tâm hồn không?",
      answer: "Thử mứt hạt sen Huế đi bạn, vị bùi bùi thanh tao sẽ giúp tâm trạng bạn dịu lại nhiều đó.",
    },
    {
      question: "Mứt mãng cầu có mùi nồng quá không?",
      answer: "Mùi thơm dịu đặc trưng của trái cây nhiệt đới, cực kỳ kích thích vị giác luôn, bạn thử là mê cho xem.",
    },
    {
      question: "Mình muốn mix mứt với cocktail, có ổn không?",
      answer: "Ý tưởng táo bạo quá! Mứt mơ hoặc dâu tây mix với chút soda và rượu nhẹ là thành món cocktail \"signature\" luôn nè.",
    },
    {
      question: "Mứt VietCharm có ngọt gắt như mứt ngoài chợ không?",
      answer: "Không hề nha, tiêu chí của tụi mình là \"ít đường - thật vị\", ăn hoài không chán luôn.",
    },
    {
      question: "Sau khi ăn đồ dầu mỡ, ăn mứt mơ có tốt không?",
      answer: "Cực tốt luôn, mứt mơ hỗ trợ tiêu hóa rất tốt, giúp bụng nhẹ nhõm hẳn ra.",
    },
    {
      question: "Mứt VietCharm có dùng mật ong thay đường không?",
      answer: "Hiện tại tụi mình dùng đường phèn thanh khiết để giữ đúng vị di sản, nhưng tụi mình đang nghiên cứu dòng mứt mật ong cho tương lai nè.",
    },
    {
      question: "Tại sao mứt của VietCharm lại dẻo hơn các loại khác?",
      answer: "Bí quyết nằm ở quy trình sên thủ công tỉ mỉ, giúp giữ lại độ dẻo tự nhiên của thớ thịt trái cây đó.",
    },
    {
      question: "Mình có thể dùng mứt để làm salad không?",
      answer: "Tại sao không nhỉ? Một ít mứt dâu cắt nhỏ trộn salad sẽ tạo ra hương vị chua ngọt cực bùng nổ.",
    },
    {
      question: "Lỡ ăn hết một hũ trong một lúc có sao không?",
      answer: "Haha, ngon quá nên khó kìm lòng đúng không? Nhưng cái gì vừa đủ cũng tốt nhất, bạn chia sẻ với bạn bè cho vui nhé!",
    },
    {
      question: "Hành trình khám phá di sản có giới hạn thời gian không?",
      answer: "Cứ thong thả bạn ơi, di sản là để thưởng thức mà. Tụi mình không giới hạn thời gian mở khóa danh hiệu đâu.",
    },
    {
      question: "Mở khóa hết bản đồ di sản thì được gì ta?",
      answer: "Một món quà đặc biệt \"đậm chất VietCharm\" và chứng nhận \"Nhà thám hiểm di sản vĩ đại\" đang đợi bạn đó!",
    },
    {
      question: "Mỗi hũ mứt chỉ quét được 1 lần mã QR thôi hả?",
      answer: "Đúng rồi, mỗi hũ là một \"chìa khóa\" độc nhất để bạn mở khóa một vùng đất mới trên bản đồ.",
    },
    {
      question: "Mình mua 2 hũ mứt dâu giống nhau có được tính 2 lượt thám hiểm không?",
      answer: "Được tính là bạn đã \"master\" vùng đất Đà Lạt, tích thêm điểm kinh nghiệm để đổi quà xịn nè.",
    },
    {
      question: "Lỡ làm rách tem QR thì làm sao tham gia hành trình đây?",
      answer: "Đừng lo nè, bạn chụp ảnh hóa đơn mua hàng và hũ mứt rồi inbox cho tụi mình để được cấp mã mới nhé.",
    },
    {
      question: "Tại sao VietCharm lại gọi mứt là \"Di sản\"?",
      answer: "Vì mỗi loại mứt là một câu chuyện văn hóa, là công thức truyền đời và là niềm tự hào của mỗi vùng quê Việt Nam.",
    },
    {
      question: "Mình có thể chia sẻ thành tích thám hiểm lên Facebook không?",
      answer: "Rất khuyến khích luôn! Đăng lên kèm hashtag #VietCharm để tụi mình vào \"thả tim\" và tặng thêm code ưu đãi nhé.",
    },
    {
      question: "Danh hiệu nào là cao quý nhất trong hành trình di sản?",
      answer: "Đó là danh hiệu \"Đại sứ Văn hóa Việt\", dành cho những bạn mở khóa trọn bộ 3 miền Bắc - Trung - Nam.",
    },
    {
      question: "Cái bản đồ trên website nhìn nghệ thuật quá, ai vẽ vậy?",
      answer: "Đội ngũ designer của tụi mình đã thức trắng nhiều đêm để \"dệt\" nên nét vẽ di sản đó đó, bạn thấy ưng cái bụng không?",
    },
    {
      question: "Trong tương lai bản đồ có thêm vùng đất mới không?",
      answer: "Chắc chắn rồi! Việt Nam mình còn nhiều đặc sản lắm, VietCharm sẽ sớm đưa bạn đi khắp 63 tỉnh thành luôn.",
    },
    {
      question: "Mua set quà 6 hũ là mở khóa được hết bản đồ luôn đúng không?",
      answer: "Chuẩn không cần chỉnh! Một bước thành \"Pro\" thám hiểm luôn, quá tiện lợi đúng không nè?",
    },
    {
      question: "Làm sao để biết mình đã thám hiểm được bao nhiêu % hành trình?",
      answer: "Bạn chỉ cần đăng nhập vào tài khoản trên website VietCharm là thấy ngay tiến độ \"level\" của mình.",
    },
    {
      question: "Có bao giờ mã QR bị lỗi không?",
      answer: "Tụi mình kiểm tra kỹ lắm, nhưng nếu lỡ có trục trặc, cứ ới tụi mình một tiếng là có team hỗ trợ ngay và luôn.",
    },
    {
      question: "Mình muốn tặng lượt thám hiểm cho bạn mình có được không?",
      answer: "Bạn cứ gửi mã QR chưa quét cho bạn ấy là được nè, một món quà tinh thần quá ý nghĩa luôn.",
    },
    {
      question: "Hành trình di sản có tốn phí tham gia không?",
      answer: "Hoàn toàn miễn phí nha! Chỉ cần bạn yêu mứt và yêu văn hóa Việt là tụi mình đón chào hết mình.",
    },
    {
      question: "Cái tên \"Nét duyên Hương Việt\" nghe thơ quá, ý nghĩa là gì vậy?",
      answer: "Là cái \"duyên\" ngầm của người phụ nữ Việt đảm đang quyện cùng \"hương\" vị nồng nàn của đất trời 3 miền đó.",
    },
    {
      question: "VietCharm có định làm workshop làm mứt không?",
      answer: "Ý tưởng hay quá! Tụi mình đang lên kế hoạch, khi nào có sẽ nhắn tin mời bạn đến \"sên\" mứt cùng tụi mình nhé.",
    },
    {
      question: "Mứt hạt sen Huế có gợi nhớ gì về Cố đô không?",
      answer: "Có chứ, khi ăn bạn hãy nhắm mắt lại, cảm nhận vị thanh tao như đang ngồi bên hồ Tịnh Tâm ngắm sen nở vậy.",
    },
    {
      question: "Mứt dừa Bến Tre có làm mình thấy yêu miền Tây hơn không?",
      answer: "Ăn một miếng là thấy cả sự nồng hậu, chất phác của người dân xứ Dừa hiện ra trước mắt luôn á.",
    },
    {
      question: "Tại sao mứt mận lại đại diện cho miền núi phía Bắc?",
      answer: "Vì đó là tinh hoa của nắng gió vùng cao, là sự kiên cường của cây mận hậu giữa sương mù Mộc Châu.",
    },
    {
      question: "VietCharm có bán lẻ hũ dùng thử không?",
      answer: "Hiện tại tụi mình có các hũ size nhỏ xinh xắn để bạn trải nghiệm đủ vị trước khi mua hũ lớn nè.",
    },
    {
      question: "Làm sao để đóng góp ý tưởng sản phẩm mới cho VietCharm?",
      answer: "Cứ nhắn tin trực tiếp cho tụi mình nhé, mỗi ý kiến của bạn đều là \"báu vật\" để VietCharm hoàn thiện hơn.",
    },
    {
      question: "Mứt VietCharm có phù hợp cho người ăn chay không?",
      answer: "100% thuần thực vật từ trái cây và đường phèn nên các bạn ăn chay yên tâm thưởng thức nhé.",
    },
    {
      question: "Mình muốn viết bài Review về VietCharm, bạn có hỗ trợ hình ảnh không?",
      answer: "Quá tuyệt vời! Tụi mình sẽ gửi tặng bạn kho ảnh \"di sản\" siêu nét để bài review thêm lung linh nhé.",
    },
    {
      question: "Hành trình di sản có quà cho nhóm bạn không?",
      answer: "Có chứ, nếu nhóm bạn cùng rủ nhau \"thám hiểm\", tụi mình sẽ có những combo quà tặng \"tình bạn bền lâu\" cực xịn.",
    },
    {
      question: "Các \"Sếp lớn\" của VietCharm có hay ăn mứt không?",
      answer: "Các Sếp là \"fan cứng\" số 1 luôn đó, ngày nào cũng phải nhâm nhi một chút mới có cảm hứng làm việc á.",
    },
    {
      question: "Ai là người khó tính nhất trong ban quản trị khi chọn nguyên liệu?",
      answer: "Ơi là các Sếp Tiến, Toàn và Thọ nè, chỉ cần một quả mận hơi héo hay một hạt sen chưa bở là bị loại ngay lập tức.",
    },
    {
      question: "Team thiết kế bao bì là ai mà khéo thế?",
      answer: "Đó là thành quả của sự sáng tạo không ngừng từ Sếp Vy, Tuyên và Tú đó, những người luôn muốn VietCharm phải đẹp \"không góc chết\".",
    },
    {
      question: "Ai là người chịu trách nhiệm về nội dung trên Tiktok của VietCharm?",
      answer: "Là team của Sếp Thư, Vân và Tài nè, những người luôn mang đến những video \"vibe\" di sản cực cuốn.",
    },
    {
      question: "Các Sếp có bao giờ cãi nhau khi phát triển sản phẩm không?",
      answer: "Có chứ, tranh luận kịch liệt lắm để tìm ra công thức ít đường nhất mà vẫn ngon nhất cho bạn đó.",
    },
    {
      question: "VietCharm ra đời vào một ngày nắng hay ngày mưa?",
      answer: "Ra đời vào một ngày nắng đẹp tại IUH, với khao khát cháy bỏng là nâng tầm nông sản Việt.",
    },
    {
      question: "Tên VietCharm có phải là do một Sếp \"nằm mơ\" thấy không?",
      answer: "Gần đúng rồi nè, đó là kết quả của hàng chục buổi brainstorming đến tận khuya của cả nhóm đó.",
    },
    {
      question: "Tại sao các Sếp lại chọn Gò Vấp làm địa chỉ văn phòng?",
      answer: "Vì đây là nơi khởi nguồn của nhiều ý tưởng sáng tạo và thuận tiện để ship mứt nhanh nhất đến tay bạn nè.",
    },
    {
      question: "VietCharm có bao nhiêu thành viên tất cả?",
      answer: "Ngoài các \"Sếp lớn\" thì còn cả một gia đình lớn những người nông dân và team vận hành tận tâm nữa.",
    },
    {
      question: "Có sếp nào biết chơi piano như người dùng VietCharm không?",
      answer: "Bí mật nha, một trong các Sếp đang miệt mài luyện tập để tương lai đánh đàn cho bạn nghe khi ăn mứt đó.",
    },
    {
      question: "Sếp nào là người hay trả lời tin nhắn khách hàng nhất?",
      answer: "Tất cả các Sếp đều thay phiên nhau trực vì tụi mình muốn lắng nghe bạn một cách chân thành nhất.",
    },
    {
      question: "Dự án VietCharm có phải là đồ án sinh viên không?",
      answer: "Đúng rồi, là tâm huyết của nhóm OMNI9 tụi mình, bắt đầu từ bài tập nhưng lớn lên bằng tình yêu văn hóa thực thụ.",
    },
    {
      question: "Làm mứt thủ công có mệt lắm không bạn?",
      answer: "Mệt thì có mệt vì phải đứng bếp sên lâu, nhưng thấy hũ mứt đẹp đến tay bạn là mọi mệt mỏi tan biến hết.",
    },
    {
      question: "Có bao giờ mứt bị hỏng trong lúc sản xuất không?",
      answer: "Có chứ, những mẻ chưa đạt chuẩn tụi mình kiên quyết không bán để đảm bảo uy tín 100%.",
    },
    {
      question: "VietCharm có định mở quán trà mứt trong tương lai không?",
      answer: "Ước mơ của tụi mình đó! Hy vọng một ngày sớm nhất sẽ được mời bạn ghé chơi không gian di sản của VietCharm.",
    },
    {
      question: "Ai là người nghĩ ra cái trò quét mã QR mở khóa di sản?",
      answer: "Ý tưởng độc đáo này đến từ mong muốn biến việc ăn mứt thành một chuyến du lịch tại chỗ của cả team OMNI9 đó.",
    },
    {
      question: "Hũ mứt thủy tinh dùng xong mình làm gì cho đỡ phí?",
      answer: "Bạn rửa sạch để đựng gia vị, trồng cây thủy sinh hoặc làm hũ đựng nến thơm là cực xinh luôn nha.",
    },
    {
      question: "VietCharm có hay thức khuya để gói hàng không?",
      answer: "Mùa lễ Tết thì \"chuyện thường ở huyện\" luôn, miễn là hàng đến tay bạn đúng hẹn là tụi mình vui rồi.",
    },
    {
      question: "Màu đỏ trên logo VietCharm là đỏ gì vậy?",
      answer: "Là màu đỏ của sự nhiệt huyết, của quả chín và cũng là màu đỏ may mắn trong ngày Tết truyền thống.",
    },
    {
      question: "Tại sao VietCharm lại dùng túi giấy thay vì túi nilon?",
      answer: "Vì tụi mình muốn di sản Việt được bảo tồn trong một môi trường xanh và bền vững nhất.",
    },
    {
      question: "Bạn có hay bị khách hàng \"mắng\" không?",
      answer: "Rất ít nè, nhưng nếu có tụi mình luôn cầu thị lắng nghe để sửa đổi, vì khách hàng là bạn của VietCharm mà.",
    },
    {
      question: "Làm sao để mình trở thành \"Sếp lớn\" của VietCharm như nhóm bạn?",
      answer: "Hãy luôn giữ tình yêu với nông sản Việt và bắt đầu từ những dự án nhỏ nhất nhé, tụi mình luôn ủng hộ!",
    },
    {
      question: "Website VietCharm có an toàn bảo mật không?",
      answer: "Cực kỳ an toàn nha, thông tin của bạn được tụi mình bảo vệ như bảo vệ công thức làm mứt gia truyền vậy.",
    },
    {
      question: "VietCharm có nhận đại lý ở nước ngoài không?",
      answer: "Tụi mình đang chuẩn bị các thủ tục, nếu bạn ở nước ngoài và muốn mang vị Việt ra thế giới thì đừng ngần ngại nhé.",
    },
    {
      question: "Câu nói nào của khách làm team VietCharm cảm động nhất?",
      answer: "\"Vị mứt này làm mình nhớ về bà, nhớ về những ngày Tết xưa cũ\" - Đọc xong là tụi mình muốn khóc luôn á.",
    },
    {
      question: "Sắp đến sinh nhật mẹ, tặng mứt VietCharm có ổn không?",
      answer: "Tuyệt vời luôn! Mẹ sẽ rất cảm động với món quà sức khỏe và tinh tế như mứt hạt sen hay mứt mơ đó.",
    },
    {
      question: "Mình muốn viết thư tay gửi kèm quà, shop viết giúp được không?",
      answer: "Sẵn lòng luôn bạn ơi! Bạn cứ gửi nội dung, tụi mình sẽ nắn nót viết lên thiệp thật đẹp để gửi đến người thương.",
    },
    {
      question: "Người yêu mình thích ăn vặt nhưng sợ béo, chọn vị nào?",
      answer: "Mứt dâu tây hoặc mứt mận hậu nhé, vừa ngon vừa lành, ăn thoải mái không lo \"bé mỡ\" ghé thăm.",
    },
    {
      question: "Đi ra mắt nhà người yêu nên mang gì của VietCharm?",
      answer: "Một Set quà 3 miền sang trọng sẽ ghi điểm tuyệt đối trong mắt phụ huynh vì sự chỉn chu và hiểu biết văn hóa đó.",
    },
    {
      question: "Lỡ mình đặt nhầm vị thì có đổi được không?",
      answer: "Nếu đơn hàng chưa gửi đi, nhắn tụi mình ngay để đổi nhé. Nếu đã nhận rồi mà chưa bóc tem, tụi mình vẫn hỗ trợ đổi trả nhiệt tình.",
    },
    {
      question: "Shop có giao hàng hỏa tốc trong 2h không?",
      answer: "Tại TP.HCM tụi mình có hỗ trợ qua các đơn vị vận chuyển công nghệ, báo tụi mình để \"bay\" hàng đi ngay nhé.",
    },
    {
      question: "Mình muốn tặng quà ẩn danh cho crush, shop giữ bí mật chứ?",
      answer: "Bí mật cấp quốc gia luôn! Tụi mình sẽ đóng vai \"người đưa tin\" thầm lặng để tạo bất ngờ cho bạn.",
    },
    {
      question: "Set quà 6 hũ có nặng quá khi xách đi máy bay không?",
      answer: "Không đâu nè, tụi mình thiết kế túi xách rất chắc chắn và gọn gàng, bạn cứ yên tâm mang đi muôn nơi.",
    },
    {
      question: "Mứt có bị chảy nước khi để ở nhiệt độ thường không?",
      answer: "Do không có hóa chất nên nếu trời quá nóng mứt dẻo có thể hơi ẩm một chút, tốt nhất bạn cứ bỏ ngăn mát tủ lạnh là ngon nhất.",
    },
    {
      question: "Mình muốn mua mứt làm quà cưới, có ưu đãi gì không?",
      answer: "Chúc mừng hạnh phúc bạn nha! Với số lượng lớn làm quà cưới, tụi mình có mức chiết khấu cực \"ngọt\" luôn.",
    },
    {
      question: "Hũ mứt bị móp nắp khi nhận hàng thì sao?",
      answer: "Ôi lỗi tại vận chuyển rồi, bạn chụp ảnh gửi tụi mình để nhận ngay hũ mới \"coóng\" đền bù nhé.",
    },
    {
      question: "Website bị lag không thanh toán được thì làm thế nào?",
      answer: "Bạn F5 lại trang hoặc inbox trực tiếp, team kỹ thuật của tụi mình sẽ hỗ trợ bạn đặt hàng trong 1 nốt nhạc.",
    },
    {
      question: "VietCharm có thường xuyên có code giảm giá không?",
      answer: "Có chứ, bạn theo dõi Fanpage và check email thường xuyên nhé, \"mưa voucher\" hay rơi bất ngờ lắm.",
    },
    {
      question: "Mua mứt VietCharm có được tặng kèm trà không?",
      answer: "Thỉnh thoảng trong các chương trình tri ân tụi mình có tặng kèm trà hoa để bạn thưởng thức trọn vị di sản nè.",
    },
    {
      question: "Mứt nào hợp để nhâm nhi khi xem phim nhỉ?",
      answer: "Mứt dừa Bến Tre giòn sần sật béo ngậy là \"mồi ngon\" số 1 khi cày phim đó nha.",
    },
    {
      question: "Mình ở nước ngoài muốn mua tặng người thân ở Việt Nam được không?",
      answer: "Được luôn bạn ơi, bạn thanh toán chuyển khoản và tụi mình sẽ ship tận tay người thân bạn nhé.",
    },
    {
      question: "Hũ mứt có dễ mở nắp không, mình sợ đau tay?",
      answer: "Nắp vặn rất nhẹ nhàng, nhưng nếu hơi chặt, bạn chỉ cần gõ nhẹ vào nắp là mở ra dễ ợt luôn.",
    },
    {
      question: "Mứt VietCharm có vị mặn không?",
      answer: "Hiện tại các dòng mứt của tụi mình thiên về chua - ngọt - bùi tự nhiên, chưa có vị mặn nè.",
    },
    {
      question: "Làm sao để biết mứt còn hạn sử dụng?",
      answer: "Bạn xem dưới đáy hũ hoặc trên nhãn nhé, tụi mình luôn in ngày sản xuất mới nhất cho bạn.",
    },
    {
      question: "Mình muốn đặt set quà theo ngân sách riêng có được không?",
      answer: "Được chứ, bạn cứ cho tụi mình biết ngân sách, VietCharm sẽ tư vấn combo \"ngon - bổ - rẻ\" nhất cho bạn.",
    },
    {
      question: "Sau khi mở nắp thì nên ăn trong bao lâu?",
      answer: "Tốt nhất là trong vòng 1 tháng để cảm nhận trọn vẹn hương vị tươi ngon nhất của trái cây nhé.",
    },
    {
      question: "VietCharm có tham gia các hội chợ đặc sản không?",
      answer: "Có chứ, tụi mình thường xuyên xuất hiện tại các hội chợ OCOP và văn hóa, nhớ ghé gian hàng tụi mình chơi nhé.",
    },
    {
      question: "Tại sao mứt dâu tây lại có màu đỏ không đồng đều?",
      answer: "Vì đó là màu tự nhiên của từng quả dâu tươi, không có phẩm màu nên màu sắc sẽ có độ đậm nhạt tự nhiên đó bạn.",
    },
    {
      question: "Mình muốn làm đại sứ thương hiệu cho VietCharm được không?",
      answer: "Rất hoan nghênh những bạn yêu văn hóa Việt! Hãy gửi profile cho tụi mình để cùng nhau bàn bạc nhé.",
    },
    {
      question: "Câu hỏi cuối nè, VietCharm có yêu khách hàng không?",
      answer: "Yêu \"không lối thoát\" luôn! Cảm ơn bạn đã đồng hành và dệt nên câu chuyện di sản cùng tụi mình nhé! ❤️",
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
export function buildSystemPrompt(): string {
  const k = CHATBOT_KNOWLEDGE;

  let prompt = `Bạn là VietCharm AI – trợ lý tư vấn sản phẩm của thương hiệu ${k.brand.fullName}.
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

## DANH SÁCH SẢN PHẨM LẺ (6 vị):
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
