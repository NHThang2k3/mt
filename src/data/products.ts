export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  region: 'bac' | 'trung' | 'nam' | 'combo';
  regionName: string;
  regionNameEn: string;
  image: string;
  description: string;
  descriptionEn: string;
  story: string;
  storyEn: string;
  ingredients?: string;
  ingredientsEn?: string;
  origin?: string;
  originEn?: string;
  features?: string;
  featuresEn?: string;
  weight?: string;
  isCombo?: boolean;
  comboChoices?: number;
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
    regionNameEn: 'North Vietnam',
    image: '/images/man2.JPG',
    description: 'Dư vị núi rừng Tây Bắc trong từng lát mận',
    descriptionEn: 'The aftertaste of Northwest mountains in every plum slice',
    story: `Mộc Châu hiện ra trong làn sương mỏng, những triền đồi xanh mướt nối tiếp nhau và mùa mận chín nhuộm tím cả cao nguyên. Nơi đây, mận không chỉ là trái cây theo mùa mà còn là ký ức, là hương vị gắn liền với nhịp sống chậm rãi của vùng đất Tây Bắc.

Mứt mận Mộc Châu của VietCharm được làm từ những trái mận hậu chín vừa, vỏ tím sậm, thịt dày và vị chua thanh tự nhiên. Mận được sơ chế thủ công, tách hạt khéo léo và ngào đường chậm để giữ lại độ dẻo, màu sắc trầm ấm cùng hương thơm rất riêng của mận cao nguyên.

Khi thưởng thức, vị chua nhẹ chạm đầu lưỡi, sau đó vị ngọt lan dần, cân bằng và không gắt. Mứt mận mang đến cảm giác mộc mạc, gần gũi – như một lát cắt nhỏ của núi rừng được giữ lại trong hũ mứt giản dị.`,
    storyEn: `Moc Chau appears in thin mist, with rolling green hills and plum ripening season turning the entire plateau purple. Here, plums are not just seasonal fruits but memories, flavors associated with the slow pace of life in the Northwest.

VietCharm's Moc Chau Plum Jam is made from perfectly ripened "man hau" plums, with dark purple skin, thick flesh, and a naturally tart-sweet taste. The plums are handcrafted, skillfully pitted, and slow-cooked with sugar to maintain their chewiness, warm colors, and the unique aroma of plateau plums.

When enjoyed, a light tartness touches the tongue, followed by a spreading sweetness that is balanced and not sharp. Plum jam brings a rustic, close-to-nature feeling – like a small slice of the mountains preserved in a simple jar.`,
    ingredients: 'Mận hậu tươi, đường mía tinh luyện',
    ingredientsEn: 'Fresh plums, refined cane sugar',
    origin: 'Cao nguyên Mộc Châu (Sơn La) – vùng trồng mận hậu truyền thống',
    originEn: 'Moc Chau Plateau (Son La) – traditional plum growing region',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    featuresEn: 'Low sugar, no preservatives, handcrafted',
    album: [
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
    regionNameEn: 'North Vietnam',
    image: '/images/mo1.JPG',
    description: 'Dư vị dịu dàng từ miền đồi núi phía Bắc',
    descriptionEn: 'A gentle aftertaste from the Northern mountains',
    story: `Ba Vì hiện lên với những dãy núi trập trùng, mây trắng bảng lảng và không khí mát lành quanh năm. Nơi đây không chỉ nổi tiếng với rừng quốc gia và làng quê yên bình, mà còn được biết đến là vùng trồng mơ truyền thống của miền Bắc, nơi những cây mơ âm thầm kết trái mỗi độ giao mùa.

Mứt mơ Ba Vì của VietCharm được làm từ những trái mơ chín vàng, vỏ mỏng, thịt chắc và vị chua dịu tự nhiên. Mơ được thu hái đúng độ, sơ chế thủ công và ngào đường chậm để giữ lại màu vàng óng, độ dẻo mềm cùng hương thơm thanh nhẹ đặc trưng của mơ núi.

Khi thưởng thức, vị chua dịu lan nhẹ nơi đầu lưỡi, sau đó là vị ngọt vừa phải, cân bằng và dễ chịu. Mứt mơ không quá nổi bật, nhưng đủ sâu để gợi cảm giác thư thái – như một buổi sớm ở Ba Vì, nơi thời gian trôi chậm và mọi thứ đều nhẹ nhàng.`,
    storyEn: `Ba Vi appears with rolling mountains, drifting white clouds, and cool air year-round. It is famous not only for its national forest and peaceful villages but also as the traditional apricot growing region of the North, where apricot trees quietly bear fruit every changing season.

VietCharm's Ba Vi Apricot Jam is made from ripe golden apricots, with thin skin, firm flesh, and a naturally mild tartness. Apricots are harvested at the right time, handcrafted, and slow-cooked with sugar to maintain their golden color, soft chewiness, and the characteristic light aroma of mountain apricots.

When enjoyed, a mild tartness spreads gently on the tongue, followed by a moderate sweetness, balanced and pleasant. Apricot jam is not too prominent, but deep enough to evoke a feeling of relaxation – like an early morning in Ba Vi, where time flows slowly and everything is gentle.`,
    ingredients: 'Mơ tươi, đường mía tinh luyện',
    ingredientsEn: 'Fresh apricots, refined cane sugar',
    origin: 'Vùng trồng mơ truyền thống tại Ba Vì (Hà Nội) và khu vực ven núi Tản',
    originEn: 'Traditional apricot growing region in Ba Vi (Hanoi) and Tan mountain area',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    featuresEn: 'Low sugar, no preservatives, handcrafted',
    album: [
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
    regionNameEn: 'Central Vietnam',
    image: '/images/hatsen2.JPG',
    description: 'Khi vị thanh của cố đô chạm vào nhịp sống hiện đại',
    descriptionEn: 'When the elegance of the ancient capital meets modern life',
    story: `Có những vùng đất không cần ồn ào để được nhớ đến, và Huế là một nơi như thế. Thành phố lặng lẽ bên dòng Hương Giang, nơi nhịp sống chậm rãi và sen Huế hiện lên như biểu tượng của sự thuần khiết, thanh tao trong văn hóa cố đô.

Mứt hạt sen Huế của VietCharm được tạo nên từ tinh thần ấy. Những hạt sen tươi được tuyển chọn kỹ lưỡng, chế biến thủ công để giữ trọn hình dáng tròn đầy, vị bùi tự nhiên và lớp ngọt mỏng nhẹ, tôn lên hương sen thanh lành, không gắt.

Mứt sen mang sắc vàng hanh dịu mắt, vị ngọt đậm mà tinh. Chỉ cần vài viên nhỏ cùng một chén trà nóng, vị sen và hơi ấm hòa quyện, tạo nên cảm giác thư thái và gửi gắm ý nghĩa sum vầy, đủ đầy, an yên cho một năm trọn vẹn.`,
    storyEn: `Some lands do not need noise to be remembered, and Hue is such a place. The city is quiet by the Huong River, where life is slow and Hue lotus appears as a symbol of purity and elegance in the ancient capital's culture.

VietCharm's Hue Lotus Seed Jam is created from that spirit. Fresh lotus seeds are carefully selected and handcrafted to preserve their full round shape, natural buttery taste, and a thin layer of sweetness, highlighting the pure, non-sharp lotus scent.

Lotus jam has a gentle sun-kissed yellow color and a deep yet refined sweetness. Just a few small pieces with a cup of hot tea, the lotus flavor and warmth blend together, creating a feeling of relaxation and conveying the meaning of reunion, fullness, and peace for a complete year.`,
    ingredients: 'Hạt sen tươi, đường mía tinh luyện',
    ingredientsEn: 'Fresh lotus seeds, refined cane sugar',
    origin: 'Hồ sen làng Phú Mậu (Phú Vang) và khu vực Hương Sơ – Hương Long (TP. Huế)',
    originEn: 'Phu Mau village lotus pond (Phu Vang) and Huong So – Huong Long area (Hue City)',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    featuresEn: 'Low sugar, no preservatives, handcrafted',
    album: [
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
    regionNameEn: 'Central Vietnam',
    image: '/images/dautay1.JPG',
    description: 'Ngọt lành từ cao nguyên sương mù',
    descriptionEn: 'Sweetness from the misty plateau',
    story: `Đà Lạt hiện ra rất khẽ, không ồn ào cũng chẳng vội vàng. Thành phố cao nguyên với sương sớm, nắng dịu và cái se lạnh quen thuộc tạo nên nhịp sống chậm rãi, nơi những trái dâu lớn lên tự nhiên, mang sắc đỏ hồng trong trẻo và vị chua thanh rất riêng.

Mứt dâu Đà Lạt của VietCharm được làm từ dâu thu hoạch khi vừa chín tới, chọn lọc kỹ lưỡng và chế biến thủ công. Từng lát dâu được ngào đường chậm rãi để thấm ngọt tự nhiên, giữ được màu tươi, độ dẻo vừa và hương thơm dịu mát đặc trưng của dâu vùng cao.

Khi thưởng thức, vị chua thanh chạm nhẹ đầu lưỡi rồi vị ngọt lan dần, đủ đầy mà không gắt. Chỉ cần vài lát mứt nhỏ dùng cùng bánh mì, sữa chua hay một tách trà, hương vị cao nguyên đã hiện lên trọn vẹn, để lại cảm giác dễ chịu rất lâu sau đó.`,
    storyEn: `Da Lat appears very softly, neither noisy nor hurried. The highland city with morning mist, gentle sunlight, and familiar chill creates a slow pace of life, where strawberries grow naturally, carrying a clear pink-red color and a unique tart flavor.

VietCharm's Da Lat Strawberry Jam is made from strawberries harvested just as they ripen, carefully selected and handcrafted. Each strawberry slice is slow-cooked with sugar to absorb natural sweetness, maintaining its fresh color, moderate chewiness, and the characteristic cool aroma of highland strawberries.

When enjoyed, a tart flavor touches the tongue lightly then the sweetness spreads, full but not sharp. Just a few small jam slices with bread, yogurt, or a cup of tea, the plateau flavor appears fully, leaving a pleasant feeling for a long time.`,
    ingredients: 'Dâu tươi Đà Lạt, đường mía tinh luyện',
    ingredientsEn: 'Fresh Da Lat strawberries, refined cane sugar',
    origin: 'Vườn dâu tại phường 7 – phường 8 (TP. Đà Lạt) và xã Xuân Thọ',
    originEn: 'Strawberry gardens in Ward 7 – Ward 8 (Da Lat City) and Xuan Tho commune',
    features: 'Ít đường, không chất bảo quản, chế biến thủ công',
    featuresEn: 'Low sugar, no preservatives, handcrafted',
    album: [
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
    regionNameEn: 'South Vietnam',
    image: '/images/dua2.JPG',
    description: 'Vị béo ngọt gói trọn hương quê',
    descriptionEn: 'The rich sweet flavor capturing the homeland essence',
    story: `Bến Tre được mệnh danh là xứ dừa của miền Tây Nam Bộ – nơi những hàng dừa nghiêng bóng soi mình xuống kênh rạch, gắn liền với đời sống và ẩm thực của người dân qua bao thế hệ. Dừa không chỉ là cây trồng chủ lực mà còn là biểu tượng của sự bền bỉ, hiền hòa và trù phú của vùng đất này.

Mứt dừa Bến Tre của VietCharm được làm từ cùi dừa bánh tẻ, tuyển chọn từ các vườn dừa lâu năm. Dừa được nạo sợi vừa tay, ngào đường chậm rãi để giữ độ dẻo mềm tự nhiên, vị béo dịu và hương thơm đặc trưng, không quá ngọt, không gây ngấy.

Khi thưởng thức, vị béo của dừa lan nhẹ nơi đầu lưỡi, hòa cùng vị ngọt thanh, mang lại cảm giác gần gũi và ấm áp – như chính con người miền Tây chân thành, mộc mạc. Mứt dừa không cầu kỳ, nhưng đủ sâu để gợi nhớ hương vị Tết quê nhà.`,
    storyEn: `Ben Tre is known as the coconut kingdom of the Southwest – where coconut trees lean over canals, associated with the life and cuisine of the people for generations. Coconut is not only a major crop but also a symbol of the durability, gentleness, and richness of this land.

VietCharm's Ben Tre Coconut Jam is made from medium-aged coconut meat, selected from long-standing coconut groves. The coconut is hand-shredded, slow-cooked with sugar to maintain its natural soft chewiness, mild richness, and characteristic aroma, not too sweet, not cloying.

When enjoyed, the richness of the coconut spreads gently on the tongue, blending with a clear sweetness, bringing a close and warm feeling – like the sincere, rustic people of the West. Coconut jam is not sophisticated, but deep enough to evoke the flavor of Tet in the hometown.`,
    ingredients: 'Dừa tươi Bến Tre, đường mía tinh luyện',
    ingredientsEn: 'Fresh Ben Tre coconut, refined cane sugar',
    origin: 'Các vườn dừa tại tỉnh Bến Tre',
    originEn: 'Coconut groves in Ben Tre province',
    features: 'Ít ngọt, không chất bảo quản, chế biến thủ công',
    featuresEn: 'Low sugar, no preservatives, handcrafted',
    album: [
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
    regionNameEn: 'South Vietnam',
    image: '/images/mangcau1.JPG',
    description: 'Vị chua ngọt dịu êm miền nhớ',
    descriptionEn: 'Gentle sweet and sour flavor of memories',
    story: `Tiền Giang là vựa trái cây lớn của miền Tây Nam Bộ, nổi tiếng with những miệt vườn trĩu quả tại Cái Bè, Cai Lậy. Trong đó, mãng cầu là loại trái cây quen thuộc, mang vị chua ngọt tự nhiên, được người dân địa phương chế biến thành nhiều món truyền thống, đặc biệt là mứt.

Mứt mãng cầu Tiền Giang của VietCharm được làm từ mãng cầu chín vừa, tách múi thủ công và sơ chế kỹ lưỡng. Quá trình ngào đường được thực hiện chậm rãi để giữ được độ mềm dẻo, hương thơm đặc trưng và sự cân bằng giữa vị chua nhẹ và ngọt thanh.

Khi thưởng thức, vị chua chạm nhẹ đầu lưỡi rồi tan dần trong vị ngọt dịu, tạo cảm giác tươi mới and dễ chịu. Đây là loại mứt phù hợp với những ai yêu thích sự hài hòa, không quá đậm nhưng đủ để lưu lại dư vị lâu dài.`,
    storyEn: `Tien Giang is a large fruit granary of the Southwest, famous for its fruitful orchards in Cai Be and Cai Lay. Among them, soursop is a familiar fruit with a natural tart-sweet taste, processed by locals into many traditional dishes, especially jam.

VietCharm's Tien Giang Soursop Jam is made from perfectly ripe soursop, hand-segmented and carefully processed. The sugar-cooking process is performed slowly to maintain soft chewiness, characteristic aroma, and the balance between light tartness and clear sweetness.

When enjoyed, the tartness touches the tongue lightly then fades into a gentle sweetness, creating a fresh and pleasant feeling. This is a jam suitable for those who love harmony, not too strong but enough to leave a long-lasting aftertaste.`,
    ingredients: 'Mãng cầu tươi Tiền Giang, đường mía tinh luyện',
    ingredientsEn: 'Fresh soursop from Tien Giang, refined cane sugar',
    origin: 'Vườn trái cây Cái Bè – Cai Lậy (Tiền Giang)',
    originEn: 'Cai Be – Cai Lay fruit orchards (Tien Giang)',
    features: 'Chua ngọt cân bằng, không chất bảo quản',
    featuresEn: 'Balanced tart-sweet, no preservatives',
    album: [
      '/images/mangcau1.JPG',
      '/images/mangcau2.JPG',
      '/images/mangcau3.JPG',
      '/images/mangcau4.JPG',
      '/images/mangcau5.JPG'
    ]
  },
  // Combo đặc biệt
  {
    id: 'combo-trai-nghiem',
    name: 'Combo Trải Nghiệm 2 Món',
    nameEn: 'Experience 2-Flavor Combo',
    price: 98000,
    weight: '2 hũ x 250g',
    region: 'combo',
    regionName: 'Combo đặc biệt',
    regionNameEn: 'Special Combo',
    image: '/images/2mon2.jpg',
    description: 'Chọn 2 trong 6 hương vị mứt đặc sản',
    descriptionEn: 'Choose 2 out of 6 specialty jam flavors',
    story: 'Trải nghiệm ngẫu hứng 2 hương vị tùy chọn từ bản đồ mứt di sản.',
    storyEn: 'An impromptu experience of 2 optional flavors from the heritage jam map.',
    ingredients: 'Mứt truyền thống tự chọn',
    ingredientsEn: 'Optional traditional jams',
    origin: 'Việt Nam',
    originEn: 'Vietnam',
    features: 'Tùy chọn đa dạng, phù hợp dùng thử',
    featuresEn: 'Diverse options, suitable for trial',
    isCombo: true,
    comboChoices: 2,
    album: ['/images/2mon1.jpg', '/images/2mon2.jpg', '/images/2mon3.jpg']
  },
  {
    id: 'combo-3-mien',
    name: 'Combo 3 Miền',
    nameEn: '3 Regions Combo',
    price: 139000,
    weight: '3 hũ x 250g',
    region: 'combo',
    regionName: 'Combo đặc biệt',
    regionNameEn: 'Special Combo',
    image: '/images/3mon1.jpg',
    description: 'Chọn 3 trong 6 hương vị mứt đặc sản',
    descriptionEn: 'Choose 3 out of 6 specialty jam flavors',
    story: 'Khám phá sự giao thoa ẩm thực qua 3 hương vị tự chọn từ các vùng miền.',
    storyEn: 'Explore culinary intersection through 3 optional flavors from different regions.',
    ingredients: 'Mứt truyền thống tự chọn',
    ingredientsEn: 'Optional traditional jams',
    origin: 'Việt Nam',
    originEn: 'Vietnam',
    features: 'Đa dạng hương vị, tiết kiệm hơn',
    featuresEn: 'Diverse flavors, better savings',
    isCombo: true,
    comboChoices: 3,
    album: ['/images/3mon1.jpg', '/images/3mon2.jpg', '/images/3mon3.jpg']
  },
  {
    id: 'combo-gia-dinh',
    name: 'Combo Gia Đình',
    nameEn: 'Family Combo',
    price: 189000,
    weight: '4 hũ x 250g',
    region: 'combo',
    regionName: 'Combo đặc biệt',
    regionNameEn: 'Special Combo',
    image: '/images/4mon1.jpg',
    description: 'Chọn 4 trong 6 hương vị mứt đặc sản',
    descriptionEn: 'Choose 4 out of 6 specialty jam flavors',
    story: 'Hương vị đủ đầy cho cả gia đình cùng nhâm nhi dịp cuối năm.',
    storyEn: 'Full flavors for the whole family to sip at the end of the year.',
    ingredients: 'Mứt truyền thống tự chọn',
    ingredientsEn: 'Optional traditional jams',
    origin: 'Việt Nam',
    originEn: 'Vietnam',
    features: 'Phù hợp gia đình, tối ưu chi phí',
    featuresEn: 'Family suitable, cost optimization',
    isCombo: true,
    comboChoices: 4,
    album: ['/images/4mon1.jpg', '/images/4mon2.jpg', '/images/4mon3.jpg']
  },
  {
    id: 'combo-6-vi',
    name: 'Combo 6 Vị Di Sản',
    nameEn: 'Heritage 6-Flavor Combo',
    price: 169000,
    weight: '6 hũ x 150g',
    region: 'combo',
    regionName: 'Combo đặc biệt',
    regionNameEn: 'Special Combo',
    image: '/images/combo6.JPG',
    description: 'Trọn bộ 6 hương vị đặc sản từ 3 miền Việt Nam',
    descriptionEn: 'Complete set of 6 specialty flavors from 3 regions of Vietnam',
    story: `Combo 6 Vị Di Sản là cách hoàn hảo để khám phá trọn vẹn hành trình ẩm thực ba miền Việt Nam trong một hộp quà.

Bộ combo bao gồm 6 hũ mứt đặc sản:
• Mứt Mận Mộc Châu - Miền Bắc
• Mứt Mơ Ba Vì - Miền Bắc  
• Mứt Hạt Sen Huế - Miền Trung
• Mứt Dâu Tây Đà Lạt - Miền Trung
• Mứt Dừa Bến Tre - Miền Nam
• Mứt Mãng Cầu Tiền Giang - Miền Nam

Mỗi hũ 150g được đóng gói tinh tế, phù hợp làm quà tặng ý nghĩa cho người thân, bạn bè trong dịp Tết hoặc các ngày lễ. Combo này giúp bạn tiết kiệm hơn so với mua lẻ, đồng thời mở khóa toàn bộ bản đồ di sản VietCharm ngay lập tức!`,
    storyEn: `Heritage 6-Flavor Combo is the perfect way to fully explore the culinary journey of three regions of Vietnam in one gift box.

The combo set includes 6 specialty jam jars:
• Moc Chau Plum Jam - North Vietnam
• Ba Vi Apricot Jam - North Vietnam
• Hue Lotus Seed Jam - Central Vietnam
• Da Lat Strawberry Jam - Central Vietnam
• Ben Tre Coconut Jam - South Vietnam
• Tien Giang Soursop Jam - South Vietnam

Each 150g jar is exquisitely packaged, suitable as a meaningful gift for relatives and friends during Tet or holidays. This combo helps you save more than buying individually, while simultaneously unlocking the entire VietCharm heritage map immediately!`,
    ingredients: 'Đầy đủ 6 loại mứt truyền thống từ ba miền',
    ingredientsEn: 'Full 6 types of traditional jams from three regions',
    origin: 'Tổng hợp từ các vùng nguyên liệu truyền thống khắp Việt Nam',
    originEn: 'Aggregated from traditional raw material regions across Vietnam',
    features: 'Tiết kiệm 125k, đóng gói cao cấp, phù hợp làm quà tặng',
    featuresEn: 'Save 125k, premium packaging, suitable for gifting',
    isCombo: true,
    album: [
      '/images/combo6.JPG',
      '/images/combo1.JPG',
      '/images/combo2.JPG',
      '/images/combo3.JPG'
    ]
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
