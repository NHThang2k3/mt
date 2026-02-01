export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  region: 'bac' | 'trung' | 'nam' | 'combo';
  regionName: string;
  image: string;
  description: string;
  story: string;
  ingredients?: string;
  origin?: string;
  features?: string;
  weight?: string;
  isCombo?: boolean;
  album?: string[];
}

export const products: Product[] = [
  // Miền Bắc
  {
    id: 'bac-man',
    name: 'Mứt Mận Mộc Châu',
    nameEn: 'Moc Chau Plum Jam',
    price: 49000,
    weight: '250g',
    region: 'bac',
    regionName: 'Miền Bắc',
    image: '/images/mut_man.jpg',
    description: 'Dư vị núi rừng Tây Bắc trong từng lát mận',
    story: `Mộc Châu hiện ra trong làn sương mỏng, những triền đồi xanh mướt nối tiếp nhau và mùa mận chín nhuộm tím cả cao nguyên. Nơi đây, mận không chỉ là trái cây theo mùa mà còn là ký ức, là hương vị gắn liền với nhịp sống chậm rãi của vùng đất Tây Bắc.

Mứt mận Mộc Châu của VietCharm được làm từ những trái mận hậu chín vừa, vỏ tím sậm, thịt dày và vị chua thanh tự nhiên. Mận được sơ chế thủ công, tách hạt khéo léo và ngào đường chậm để giữ lại độ dẻo, màu sắc trầm ấm cùng hương thơm rất riêng của mận cao nguyên.

Khi thưởng thức, vị chua nhẹ chạm đầu lưỡi, sau đó vị ngọt lan dần, cân bằng và không gắt. Mứt mận mang đến cảm giác mộc mạc, gần gũi – như một lát cắt nhỏ của núi rừng được giữ lại trong hũ mứt giản dị.`,
    ingredients: 'Mận hậu tươi, đường mía tinh luyện',
    origin: 'Cao nguyên Mộc Châu (Sơn La) – vùng trồng mận hậu truyền thống',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    album: [
      '/images/mut_man.jpg',
      '/images/man1.JPG',
      '/images/man2.JPG',
      '/images/man3.JPG',
      '/images/man4.JPG',
      '/images/man5.JPG'
    ]
  },
  {
    id: 'bac-mo',
    name: 'Mứt Mơ Ba Vì',
    nameEn: 'Ba Vi Apricot Jam',
    price: 49000,
    weight: '250g',
    region: 'bac',
    regionName: 'Miền Bắc',
    image: '/images/mut_mo.jpg',
    description: 'Dư vị dịu dàng từ miền đồi núi phía Bắc',
    story: `Ba Vì hiện lên với những dãy núi trập trùng, mây trắng bảng lảng và không khí mát lành quanh năm. Nơi đây không chỉ nổi tiếng với rừng quốc gia và làng quê yên bình, mà còn được biết đến là vùng trồng mơ truyền thống của miền Bắc, nơi những cây mơ âm thầm kết trái mỗi độ giao mùa.

Mứt mơ Ba Vì của VietCharm được làm từ những trái mơ chín vàng, vỏ mỏng, thịt chắc và vị chua dịu tự nhiên. Mơ được thu hái đúng độ, sơ chế thủ công và ngào đường chậm để giữ lại màu vàng óng, độ dẻo mềm cùng hương thơm thanh nhẹ đặc trưng của mơ núi.

Khi thưởng thức, vị chua dịu lan nhẹ nơi đầu lưỡi, sau đó là vị ngọt vừa phải, cân bằng và dễ chịu. Mứt mơ không quá nổi bật, nhưng đủ sâu để gợi cảm giác thư thái – như một buổi sớm ở Ba Vì, nơi thời gian trôi chậm và mọi thứ đều nhẹ nhàng.`,
    ingredients: 'Mơ tươi, đường mía tinh luyện',
    origin: 'Vùng trồng mơ truyền thống tại Ba Vì (Hà Nội) và khu vực ven núi Tản',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    album: [
      '/images/mut_mo.jpg',
      '/images/mo1.JPG',
      '/images/mo2.JPG',
      '/images/mo3.JPG',
      '/images/mo4.JPG',
      '/images/mo5.JPG'
    ]
  },
  // Miền Trung
  {
    id: 'trung-sen',
    name: 'Mứt Hạt Sen Huế',
    nameEn: 'Hue Lotus Seed Jam',
    price: 49000,
    weight: '250g',
    region: 'trung',
    regionName: 'Miền Trung',
    image: '/images/hat_sen.jpg',
    description: 'Khi vị thanh của cố đô chạm vào nhịp sống hiện đại',
    story: `Có những vùng đất không cần ồn ào để được nhớ đến, và Huế là một nơi như thế. Thành phố lặng lẽ bên dòng Hương Giang, nơi nhịp sống chậm rãi và sen Huế hiện lên như biểu tượng của sự thuần khiết, thanh tao trong văn hóa cố đô.

Mứt hạt sen Huế của VietCharm được tạo nên từ tinh thần ấy. Những hạt sen tươi được tuyển chọn kỹ lưỡng, chế biến thủ công để giữ trọn hình dáng tròn đầy, vị bùi tự nhiên và lớp ngọt mỏng nhẹ, tôn lên hương sen thanh lành, không gắt.

Mứt sen mang sắc vàng hanh dịu mắt, vị ngọt đậm mà tinh. Chỉ cần vài viên nhỏ cùng một chén trà nóng, vị sen và hơi ấm hòa quyện, tạo nên cảm giác thư thái và gửi gắm ý nghĩa sum vầy, đủ đầy, an yên cho một năm trọn vẹn.`,
    ingredients: 'Hạt sen tươi, đường mía tinh luyện',
    origin: 'Hồ sen làng Phú Mậu (Phú Vang) và khu vực Hương Sơ – Hương Long (TP. Huế)',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    album: [
      '/images/hat_sen.jpg',
      '/images/hatsen1.JPG',
      '/images/hatsen2.JPG',
      '/images/hatsen3.JPG',
      '/images/hatsen4.JPG',
      '/images/hatsen5.JPG'
    ]
  },
  {
    id: 'trung-dau',
    name: 'Mứt Dâu Tây Đà Lạt',
    nameEn: 'Da Lat Strawberry Jam',
    price: 49000,
    weight: '250g',
    region: 'trung',
    regionName: 'Miền Trung',
    image: '/images/dau_tay.jpg',
    description: 'Ngọt lành từ cao nguyên sương mù',
    story: `Đà Lạt hiện ra rất khẽ, không ồn ào cũng chẳng vội vàng. Thành phố cao nguyên với sương sớm, nắng dịu và cái se lạnh quen thuộc tạo nên nhịp sống chậm rãi, nơi những trái dâu lớn lên tự nhiên, mang sắc đỏ hồng trong trẻo và vị chua thanh rất riêng.

Mứt dâu Đà Lạt của VietCharm được làm từ dâu thu hoạch khi vừa chín tới, chọn lọc kỹ lưỡng và chế biến thủ công. Từng lát dâu được ngào đường chậm rãi để thấm ngọt tự nhiên, giữ được màu tươi, độ dẻo vừa và hương thơm dịu mát đặc trưng của dâu vùng cao.

Khi thưởng thức, vị chua thanh chạm nhẹ đầu lưỡi rồi vị ngọt lan dần, đủ đầy mà không gắt. Chỉ cần vài lát mứt nhỏ dùng cùng bánh mì, sữa chua hay một tách trà, hương vị cao nguyên đã hiện lên trọn vẹn, để lại cảm giác dễ chịu rất lâu sau đó.`,
    ingredients: 'Dâu tươi Đà Lạt, đường mía tinh luyện',
    origin: 'Vườn dâu tại phường 7 – phường 8 (TP. Đà Lạt) và xã Xuân Thọ',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    album: [
      '/images/dau_tay.jpg',
      '/images/dautay1.JPG',
      '/images/dautay2.JPG',
      '/images/dautay3.JPG',
      '/images/dautay4.JPG',
      '/images/dautay5.JPG'
    ]
  },
  // Miền Nam
  {
    id: 'nam-dua',
    name: 'Mứt Dừa Bến Tre',
    nameEn: 'Ben Tre Coconut Jam',
    price: 49000,
    weight: '250g',
    region: 'nam',
    regionName: 'Miền Nam',
    image: '/images/mut_dua.jpg',
    description: 'Vị béo ngọt gói trọn hương quê',
    story: `Bến Tre được mệnh danh là xứ dừa của miền Tây Nam Bộ – nơi những hàng dừa nghiêng bóng soi mình xuống kênh rạch, gắn liền với đời sống và ẩm thực của người dân qua bao thế hệ. Dừa không chỉ là cây trồng chủ lực mà còn là biểu tượng của sự bền bỉ, hiền hòa và trù phú của vùng đất này.

Mứt dừa Bến Tre của VietCharm được làm từ cùi dừa bánh tẻ, tuyển chọn từ các vườn dừa lâu năm. Dừa được nạo sợi vừa tay, ngào đường chậm rãi để giữ độ dẻo mềm tự nhiên, vị béo dịu và hương thơm đặc trưng, không quá ngọt, không gây ngấy.

Khi thưởng thức, vị béo của dừa lan nhẹ nơi đầu lưỡi, hòa cùng vị ngọt thanh, mang lại cảm giác gần gũi và ấm áp – như chính con người miền Tây chân thành, mộc mạc. Mứt dừa không cầu kỳ, nhưng đủ sâu để gợi nhớ hương vị Tết quê nhà.`,
    ingredients: 'Dừa tươi Bến Tre, đường mía tinh luyện',
    origin: 'Các vườn dừa tại tỉnh Bến Tre',
    features: 'Ít ngọt, không chất bảo quản, chế biến thủ công',
    album: [
      '/images/mut_dua.jpg',
      '/images/dua1.JPG',
      '/images/dua2.JPG',
      '/images/dua3.JPG',
      '/images/dua4.JPG',
      '/images/dua5.JPG'
    ]
  },
  {
    id: 'nam-mangcau',
    name: 'Mứt Mãng Cầu Tiền Giang',
    nameEn: 'Tien Giang Soursop Jam',
    price: 49000,
    weight: '250g',
    region: 'nam',
    regionName: 'Miền Nam',
    image: '/images/mut_mangcau.jpg',
    description: 'Vị chua ngọt dịu êm miền nhớ',
    story: `Tiền Giang là vựa trái cây lớn của miền Tây Nam Bộ, nổi tiếng với những miệt vườn trĩu quả tại Cái Bè, Cai Lậy. Trong đó, mãng cầu là loại trái cây quen thuộc, mang vị chua ngọt tự nhiên, được người dân địa phương chế biến thành nhiều món truyền thống, đặc biệt là mứt.

Mứt mãng cầu Tiền Giang của VietCharm được làm từ mãng cầu chín vừa, tách múi thủ công và sơ chế kỹ lưỡng. Quá trình ngào đường được thực hiện chậm rãi để giữ được độ mềm dẻo, hương thơm đặc trưng và sự cân bằng giữa vị chua nhẹ và ngọt thanh.

Khi thưởng thức, vị chua chạm nhẹ đầu lưỡi rồi tan dần trong vị ngọt dịu, tạo cảm giác tươi mới và dễ chịu. Đây là loại mứt phù hợp với những ai yêu thích sự hài hòa, không quá đậm nhưng đủ để lưu lại dư vị lâu dài.`,
    ingredients: 'Mãng cầu tươi Tiền Giang, đường mía tinh luyện',
    origin: 'Vườn trái cây Cái Bè – Cai Lậy (Tiền Giang)',
    features: 'Chua ngọt cân bằng, không chất bảo quản',
    album: [
      '/images/mut_mangcau.jpg',
      '/images/mangcau1.JPG',
      '/images/mangcau2.JPG',
      '/images/mangcau3.JPG',
      '/images/mangcau4.JPG',
      '/images/mangcau5.JPG'
    ]
  },
  // Combo đặc biệt
  {
    id: 'combo-6-vi',
    name: 'Combo 6 Vị Di Sản',
    nameEn: 'Heritage 6-Flavor Combo',
    price: 169000,
    weight: '6 hũ x 150g',
    region: 'combo',
    regionName: 'Combo đặc biệt',
    image: '/images/combo6.JPG',
    description: 'Trọn bộ 6 hương vị đặc sản từ 3 miền Việt Nam',
    story: `Combo 6 Vị Di Sản là cách hoàn hảo để khám phá trọn vẹn hành trình ẩm thực ba miền Việt Nam trong một hộp quà.

Bộ combo bao gồm 6 hũ mứt đặc sản:
• Mứt Mận Mộc Châu - Miền Bắc
• Mứt Mơ Ba Vì - Miền Bắc  
• Mứt Hạt Sen Huế - Miền Trung
• Mứt Dâu Tây Đà Lạt - Miền Trung
• Mứt Dừa Bến Tre - Miền Nam
• Mứt Mãng Cầu Tiền Giang - Miền Nam

Mỗi hũ 150g được đóng gói tinh tế, phù hợp làm quà tặng ý nghĩa cho người thân, bạn bè trong dịp Tết hoặc các ngày lễ. Combo này giúp bạn tiết kiệm hơn so với mua lẻ, đồng thời mở khóa toàn bộ bản đồ di sản VietCharm ngay lập tức!`,
    ingredients: 'Đầy đủ 6 loại mứt truyền thống từ ba miền',
    origin: 'Tổng hợp từ các vùng nguyên liệu truyền thống khắp Việt Nam',
    features: 'Tiết kiệm 125k, đóng gói cao cấp, phù hợp làm quà tặng',
    isCombo: true
  }
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

export const getProductsByRegion = (region: 'bac' | 'trung' | 'nam' | 'combo'): Product[] => {
  return products.filter(p => p.region === region);
};

export const getRegularProducts = (): Product[] => {
  return products.filter(p => !p.isCombo);
};

export const getComboProducts = (): Product[] => {
  return products.filter(p => p.isCombo);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductFromCode = (code: string): Product | undefined => {
  const mapping: Record<string, string> = {
    'BAC_MAN_01': 'bac-man',
    'BAC_MO_01': 'bac-mo',
    'TRUNG_SEN_01': 'trung-sen',
    'TRUNG_DAU_01': 'trung-dau',
    'NAM_DUA_01': 'nam-dua',
    'NAM_MANGC_01': 'nam-mangcau',
    'NAM_MANGCAU_01': 'nam-mangcau',
    'COMBO_01': 'combo-6-vi'
  };

  if (mapping[code]) {
    return products.find(p => p.id === mapping[code]);
  }

  // Fallback: try to transform code to ID (e.g. NAM_MANGCAU_01 -> nam-mangcau)
  const transformedId = code.toLowerCase().replace(/_\d+$/, '').replace(/_/g, '-');
  return products.find(p => p.id === transformedId || p.id === code);
};
