export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  region: 'bac' | 'trung' | 'nam';
  productId: string;
  image: string;
  createdAt: string;
}

export const posts: BlogPost[] = [
  {
    id: 'post-man-mocchau',
    title: 'Mứt Mận Mộc Châu – Dư Vị Núi Rừng Tây Bắc',
    excerpt: 'Mộc Châu sương phủ đồi cao – Mứt mận tím ngọt chua giao mùa.',
    content: `
# Mứt Mận Mộc Châu – Dư Vị Núi Rừng Tây Bắc Trong Từng Lát Mận

Mộc Châu hiện ra trong làn sương mỏng, những triền đồi xanh mướt nối tiếp nhau và mùa mận chín nhuộm tím cả cao nguyên. Nơi đây, mận không chỉ là trái cây theo mùa mà còn là ký ức, là hương vị gắn liền với nhịp sống chậm rãi của vùng đất Tây Bắc.

## Nguyên Liệu Tuyển Chọn

Mứt mận Mộc Châu của VietCharm được làm từ những trái mận hậu chín vừa, vỏ tím sậm, thịt dày và vị chua thanh tự nhiên. Mận được sơ chế thủ công, tách hạt khéo léo và ngào đường chậm để giữ lại độ dẻo, màu sắc trầm ấm cùng hương thơm rất riêng của mận cao nguyên.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị chua nhẹ chạm đầu lưỡi, sau đó vị ngọt lan dần, cân bằng và không gắt. Mứt mận mang đến cảm giác mộc mạc, gần gũi – như một lát cắt nhỏ của núi rừng được giữ lại trong hũ mứt giản dị.

Với VietCharm, mứt mận Mộc Châu không chỉ là món ngọt ngày Tết, mà là cách lưu giữ hương vị Tây Bắc bằng ngôn ngữ hiện đại.

## Cách Thưởng Thức

🍑 Dùng cùng trà nóng để cân bằng vị chua ngọt
🍑 Kết hợp với sữa chua hoặc yến mạch
🍑 Ăn kèm bánh mì nhạt cho bữa nhẹ
🍑 Phù hợp làm quà tặng mang hương vị núi rừng

## Thông Tin Sản Phẩm

- Thành phần: Mận hậu tươi, đường mía tinh luyện
- Nguồn nguyên liệu: Cao nguyên Mộc Châu (Sơn La) – vùng trồng mận hậu truyền thống
- Đặc điểm: Ít đường, không chất bảo quản, chế biến thủ công

## Trải Nghiệm Văn Hóa Số VietCharm

Quét QR code để khám phá câu chuyện về mùa mận Mộc Châu, về nhịp sống vùng cao và hành trình VietCharm gìn giữ hương vị Tây Bắc trong từng hũ mứt.
    `,
    region: 'bac',
    productId: 'bac-man',
    image: '/images/mut_man.jpg',
    createdAt: '2026-01-27'
  },
  {
    id: 'post-mo-bavi',
    title: 'Mứt Mơ Ba Vì – Dư Vị Dịu Dàng Từ Miền Đồi Núi',
    excerpt: 'Ba Vì mây phủ lưng đồi – Mứt mơ vàng dịu gọi mùa về.',
    content: `
# Mứt Mơ Ba Vì – Dư Vị Dịu Dàng Từ Miền Đồi Núi Phía Bắc

Ba Vì hiện lên với những dãy núi trập trùng, mây trắng bảng lảng và không khí mát lành quanh năm. Nơi đây không chỉ nổi tiếng với rừng quốc gia và làng quê yên bình, mà còn được biết đến là vùng trồng mơ truyền thống của miền Bắc, nơi những cây mơ âm thầm kết trái mỗi độ giao mùa.

## Nguyên Liệu Tuyển Chọn

Mứt mơ Ba Vì của VietCharm được làm từ những trái mơ chín vàng, vỏ mỏng, thịt chắc và vị chua dịu tự nhiên. Mơ được thu hái đúng độ, sơ chế thủ công và ngào đường chậm để giữ lại màu vàng óng, độ dẻo mềm cùng hương thơm thanh nhẹ đặc trưng của mơ núi.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị chua dịu lan nhẹ nơi đầu lưỡi, sau đó là vị ngọt vừa phải, cân bằng và dễ chịu. Mứt mơ không quá nổi bật, nhưng đủ sâu để gợi cảm giác thư thái – như một buổi sớm ở Ba Vì, nơi thời gian trôi chậm và mọi thứ đều nhẹ nhàng.

Với VietCharm, mứt mơ Ba Vì không chỉ là món mứt truyền thống quen thuộc, mà còn là cách lưu giữ không khí núi rừng miền Bắc trong một hình thức giản dị và hiện đại.

## Cách Thưởng Thức

🍑 Dùng cùng trà nóng hoặc trà thảo mộc
🍑 Pha nước mơ ấm cho ngày se lạnh
🍑 Kết hợp với sữa chua không đường
🍑 Món quà nhẹ nhàng cho người yêu sự thanh giản

## Thông Tin Sản Phẩm

- Thành phần: Mơ tươi, đường mía tinh luyện
- Nguồn nguyên liệu: Vùng trồng mơ truyền thống tại Ba Vì (Hà Nội) và khu vực ven núi Tản
- Đặc điểm: Ít đường, không chất bảo quản, chế biến thủ công

## Trải Nghiệm Văn Hóa Số VietCharm

Mỗi hũ mứt mơ Ba Vì đều được gắn QR code định danh. Khi quét mã, bạn không chỉ tìm hiểu thông tin sản phẩm mà còn bước vào câu chuyện về vùng núi Ba Vì, về mùa mơ chín và hành trình VietCharm gìn giữ những giá trị ẩm thực miền Bắc.
    `,
    region: 'bac',
    productId: 'bac-mo',
    image: '/images/mut_mo.jpg',
    createdAt: '2026-01-26'
  },
  {
    id: 'post-sen-hue',
    title: 'Mứt Hạt Sen Huế – Vị Thanh Của Cố Đô',
    excerpt: 'Huế nghiêng bóng nước bên thềm sen – Mứt hạt thanh lành giữ vị quen.',
    content: `
# Mứt Hạt Sen Huế – Khi Vị Thanh Của Cố Đô Chạm Vào Nhịp Sống Hiện Đại

Có những vùng đất không cần ồn ào để được nhớ đến, và Huế là một nơi như thế. Thành phố lặng lẽ bên dòng Hương Giang, nơi nhịp sống chậm rãi và sen Huế hiện lên như biểu tượng của sự thuần khiết, thanh tao trong văn hóa cố đô.

## Tinh Hoa Từ Sen Huế

Mứt hạt sen Huế của VietCharm được tạo nên từ tinh thần ấy. Những hạt sen tươi được tuyển chọn kỹ lưỡng, chế biến thủ công để giữ trọn hình dáng tròn đầy, vị bùi tự nhiên và lớp ngọt mỏng nhẹ, tôn lên hương sen thanh lành, không gắt.

## Hương Vị Đặc Trưng

Mứt sen mang sắc vàng hanh dịu mắt, vị ngọt đậm mà tinh. Chỉ cần vài viên nhỏ cùng một chén trà nóng, vị sen và hơi ấm hòa quyện, tạo nên cảm giác thư thái và gửi gắm ý nghĩa sum vầy, đủ đầy, an yên cho một năm trọn vẹn.

Với VietCharm, mứt hạt sen không chỉ là một món ngọt ngày Tết, mà là cách gìn giữ cả một giá trị ẩm thực vùng miền Việt bằng ngôn ngữ hiện đại.

## Cách Thưởng Thức – Chậm Rãi Như Chính Huế

🌸 Dùng cùng trà nóng hoặc trà sen để cảm nhận trọn vẹn vị thanh
🍑 Kết hợp với chè hạt sen, cháo ngọt hoặc sữa hạt cho bữa nhẹ lành mạnh
🍑 Một món quà tinh tế dành cho những ai trân trọng sự giản dị và chiều sâu văn hóa

## Thông Tin Sản Phẩm

- Thành phần: Hạt sen tươi, đường mía tinh luyện
- Nguồn nguyên liệu: Hồ sen làng Phú Mậu (Phú Vang) và khu vực Hương Sơ – Hương Long (TP. Huế)
- Đặc điểm: Ít đường, không chất bảo quản, chế biến thủ công

## Trải Nghiệm Văn Hóa Số VietCharm

Mỗi hũ mứt hạt sen Huế đều có QR code định danh. Khi quét mã, bạn không chỉ đọc thông tin sản phẩm, mà còn bước vào câu chuyện về sen Huế, về lối sống chậm và hành trình đưa tinh thần cố đô vào một hũ mứt hiện đại.
    `,
    region: 'trung',
    productId: 'trung-sen',
    image: '/images/hat_sen.png',
    createdAt: '2026-01-25'
  },
  {
    id: 'post-dau-dalat',
    title: 'Mứt Dâu Tây Đà Lạt – Ngọt Lành Từ Cao Nguyên',
    excerpt: 'Đà Lạt se lạnh gió cao nguyên – Mứt dâu hồng thắm ngọt bình yên.',
    content: `
# Mứt Dâu Tây Đà Lạt – Ngọt Lành Từ Cao Nguyên Sương Mù

Đà Lạt hiện ra rất khẽ, không ồn ào cũng chẳng vội vàng. Thành phố cao nguyên với sương sớm, nắng dịu và cái se lạnh quen thuộc tạo nên nhịp sống chậm rãi, nơi những trái dâu lớn lên tự nhiên, mang sắc đỏ hồng trong trẻo và vị chua thanh rất riêng.

## Dâu Cao Nguyên Tươi Ngon

Mứt dâu Đà Lạt của VietCharm được làm từ dâu thu hoạch khi vừa chín tới, chọn lọc kỹ lưỡng và chế biến thủ công. Từng lát dâu được ngào đường chậm rãi để thấm ngọt tự nhiên, giữ được màu tươi, độ dẻo vừa và hương thơm dịu mát đặc trưng của dâu vùng cao.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị chua thanh chạm nhẹ đầu lưỡi rồi vị ngọt lan dần, đủ đầy mà không gắt. Chỉ cần vài lát mứt nhỏ dùng cùng bánh mì, sữa chua hay một tách trà, hương vị cao nguyên đã hiện lên trọn vẹn, để lại cảm giác dễ chịu rất lâu sau đó.

Với VietCharm, mứt dâu Đà Lạt không đơn thuần là món ngọt, mà là cách lưu giữ một phần cao nguyên trong hình hài giản dị nhất.

## Cách Thưởng Thức – Nhẹ Nhàng Như Sương Sớm Cao Nguyên

🍑 Dùng cùng bánh mì hoặc pancake cho bữa sáng nhẹ nhàng
🍑 Kết hợp với sữa chua, granola hoặc phô mai tươi
🍑 Thưởng thức cùng trà hoa quả hoặc trà thảo mộc để cân bằng vị chua ngọt
🍑 Món quà nhỏ xinh dành cho những ai yêu sự tươi mới và tinh tế

## Thông Tin Sản Phẩm

- Thành phần: Dâu tươi Đà Lạt, đường mía tinh luyện
- Nguồn nguyên liệu: Vườn dâu tại phường 7 – phường 8 (TP. Đà Lạt) và xã Xuân Thọ
- Đặc điểm: Ít đường, không chất bảo quản, chế biến thủ công

## Trải Nghiệm Văn Hóa Số VietCharm

Mỗi hũ mứt dâu Đà Lạt đều được gắn QR code định danh. Khi quét mã, bạn không chỉ xem thông tin sản phẩm mà còn lắng nghe câu chuyện về dâu cao nguyên, về nhịp sống chậm và hành trình VietCharm đưa hương vị vùng miền vào từng hũ mứt hiện đại.
    `,
    region: 'trung',
    productId: 'trung-dau',
    image: '/images/dau_tay.png',
    createdAt: '2026-01-24'
  },
  {
    id: 'post-dua-bentre',
    title: 'Mứt Dừa Bến Tre – Vị Béo Ngọt Hương Quê',
    excerpt: 'Bến Tre xứ dừa xanh nghiêng bóng – Mứt dừa béo ngọt gói hồn quê.',
    content: `
# Mứt Dừa Bến Tre – Vị Béo Ngọt Gói Trọn Hương Quê

Bến Tre được mệnh danh là xứ dừa của miền Tây Nam Bộ – nơi những hàng dừa nghiêng bóng soi mình xuống kênh rạch, gắn liền với đời sống và ẩm thực của người dân qua bao thế hệ. Dừa không chỉ là cây trồng chủ lực mà còn là biểu tượng của sự bền bỉ, hiền hòa và trù phú của vùng đất này.

## Dừa Bến Tre Chất Lượng

Mứt dừa Bến Tre của VietCharm được làm từ cùi dừa bánh tẻ, tuyển chọn từ các vườn dừa lâu năm. Dừa được nạo sợi vừa tay, ngào đường chậm rãi để giữ độ dẻo mềm tự nhiên, vị béo dịu và hương thơm đặc trưng, không quá ngọt, không gây ngấy.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị béo của dừa lan nhẹ nơi đầu lưỡi, hòa cùng vị ngọt thanh, mang lại cảm giác gần gũi và ấm áp – như chính con người miền Tây chân thành, mộc mạc. Mứt dừa không cầu kỳ, nhưng đủ sâu để gợi nhớ hương vị Tết quê nhà.

Với VietCharm, mứt dừa Bến Tre không chỉ là món mứt truyền thống ngày Tết, mà là cách lưu giữ hồn sông nước Nam Bộ bằng hình thức hiện đại.

## Cách Thưởng Thức – Mộc Mạc Như Miền Sông Nước

🍑 Dùng cùng trà nóng hoặc trà lài
🍑 Ăn kèm bánh mì, bánh quy nhạt
🍑 Quà Tết truyền thống mang đậm chất miền Tây

## Thông Tin Sản Phẩm

- Thành phần: Dừa tươi Bến Tre, đường mía tinh luyện
- Nguồn nguyên liệu: Các vườn dừa tại tỉnh Bến Tre
- Đặc điểm: Ít ngọt, không chất bảo quản, chế biến thủ công

## Trải Nghiệm Văn Hóa Số VietCharm

Quét QR code để khám phá câu chuyện xứ dừa Bến Tre và hành trình đưa đặc sản miền Tây vào trải nghiệm hiện đại.
    `,
    region: 'nam',
    productId: 'nam-dua',
    image: '/images/mut_dua.jpg',
    createdAt: '2026-01-23'
  },
  {
    id: 'post-mangcau-tiengiang',
    title: 'Mứt Mãng Cầu Tiền Giang – Vị Chua Ngọt Miệt Vườn',
    excerpt: 'Tiền Giang miệt vườn trĩu quả – Mứt mãng cầu chua ngọt miền nhớ.',
    content: `
# Mứt Mãng Cầu Tiền Giang – Vị Chua Ngọt Dịu Êm Miền Nhớ

Tiền Giang là vựa trái cây lớn của miền Tây Nam Bộ, nổi tiếng với những miệt vườn trĩu quả tại Cái Bè, Cai Lậy. Trong đó, mãng cầu là loại trái cây quen thuộc, mang vị chua ngọt tự nhiên, được người dân địa phương chế biến thành nhiều món truyền thống, đặc biệt là mứt.

## Mãng Cầu Tuyển Chọn

Mứt mãng cầu Tiền Giang của VietCharm được làm từ mãng cầu chín vừa, tách múi thủ công và sơ chế kỹ lưỡng. Quá trình ngào đường được thực hiện chậm rãi để giữ được độ mềm dẻo, hương thơm đặc trưng và sự cân bằng giữa vị chua nhẹ và ngọt thanh.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị chua chạm nhẹ đầu lưỡi rồi tan dần trong vị ngọt dịu, tạo cảm giác tươi mới và dễ chịu. Đây là loại mứt phù hợp với những ai yêu thích sự hài hòa, không quá đậm nhưng đủ để lưu lại dư vị lâu dài.

Với VietCharm, mứt mãng cầu Tiền Giang là cách lưu giữ sự tươi mới của trái cây miền nhiệt đới bằng phương pháp thủ công và tinh thần hiện đại, để mỗi hũ mứt không chỉ ngon mà còn mang theo nhịp sống hiền hòa của miệt vườn Nam Bộ.

## Cách Thưởng Thức – Tươi Mát Như Vườn Trái Miền Tây

🍑 Dùng cùng trà hoa quả hoặc trà thảo mộc
🍑 Kết hợp với sữa chua, granola
🍑 Phù hợp làm quà cho người yêu vị chua ngọt tự nhiên

## Thông Tin Sản Phẩm

- Thành phần: Mãng cầu tươi Tiền Giang, đường mía tinh luyện
- Nguồn nguyên liệu: Vườn trái cây Cái Bè – Cai Lậy (Tiền Giang)
- Đặc điểm: Chua ngọt cân bằng, không chất bảo quản

## Trải Nghiệm Văn Hóa Số VietCharm

QR code dẫn bạn đến câu chuyện về miệt vườn Tiền Giang và hành trình giữ trọn vị trái cây trong từng hũ mứt.
    `,
    region: 'nam',
    productId: 'nam-mangcau',
    image: '/images/mut_mangcau.jpg',
    createdAt: '2026-01-22'
  }
];

export const getPostByProductId = (productId: string): BlogPost | undefined => {
  return posts.find(p => p.productId === productId);
};
