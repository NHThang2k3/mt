export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  region: 'bac' | 'trung' | 'nam';
  productId: string;
  image: string;
  createdAt: string;
}


export const posts: BlogPost[] = [
  {
    id: 'post-man-mocchau',
    title: 'Mứt Mận Mộc Châu – Dư Vị Núi Rừng Tây Bắc',
    titleEn: 'Moc Chau Plum Jam – Aftertaste of Northwest Mountains',
    excerpt: 'Mộc Châu sương phủ đồi cao – Mứt mận tím ngọt chua giao mùa.',
    excerptEn: 'Moc Chau fog covers high hills – Purple plum jam, sweet and sour transition.',
    content: `
# Mứt Mận Mộc Châu – Dư Vị Núi Rừng Tây Bắc Trong Từng Lát Mận

Mộc Châu hiện ra trong làn sương mỏng, những triền đồi xanh mướt nối tiếp nhau và mùa mận chín nhuộm tím cả cao nguyên. Nơi đây, mận không chỉ là trái cây theo mùa mà còn là ký ức, là hương vị gắn liền với nhịp sống chậm rãi của vùng đất Tây Bắc.

## Hương Vị Đặc Trưng

Mứt mận mang đến cảm giác mộc mạc, gần gũi – như một lát cắt nhỏ của núi rừng được giữ lại trong hũ mứt giản dị.
    `,
    contentEn: `
# Moc Chau Plum Jam – The Essence of Northwest Highlands

Moc Chau emerges in a thin mist, with lush green hills following one after another. Plum season here is not just about the fruit; it's a memory, a flavor deeply intertwined with the slow pace of life in the Northwest mountains.

## Selection of Ingredients

Our plum jam is made from ripe Moc Chau plums, featuring deep purple skin, thick flesh, and a naturally balanced sweet and sour taste. Hand-processed to preserve the soul of the highlands.
    `,
    region: 'bac',
    productId: 'bac-man',
    image: '/images/mut_man.jpg',
    createdAt: '2026-01-27'
  },

  {
    id: 'post-mo-bavi',
    title: 'Mứt Mơ Ba Vì – Dư Vị Dịu Dàng Từ Miền Đồi Núi',
    titleEn: 'Ba Vi Apricot Jam – Gentle Flavor from the Highlands',
    excerpt: 'Ba Vì mây phủ lưng đồi – Mứt mơ vàng dịu gọi mùa về.',
    excerptEn: 'Ba Vi clouds cover the hills – Gentle golden apricot jam calling the season.',
    contentEn: `
# Ba Vi Apricot Jam – Gentle Aftertaste from Northern Highlands

Ba Vi presents itself with rolling mountains, drifting white clouds, and cool air year-round. It is not only famous for its national forests but also known as a traditional apricot cultivation area of the North.

## Characteristics

When enjoyed, a mild sourness gently touches the tongue, followed by a moderate, pleasant sweetness. Apricot jam is not too bold, but deep enough to evoke a sense of relaxation – like an early morning in Ba Vi.
    `,
    content: `
# Mứt Mơ Ba Vì – Dư Vị Dịu Dàng Từ Miền Đồi Núi Phía Bắc

Ba Vì hiện lên với những dãy núi trập trùng, mây trắng bảng lảng và không khí mát lành quanh năm. Nơi đây không chỉ nổi tiếng với rừng quốc gia và làng quê yên bình, mà còn được biết đến là vùng trồng mơ truyền thống của miền Bắc.

## Hương Vị Đặc Trưng

Mứt mơ không quá nổi bật, nhưng đủ sâu để gợi cảm giác thư thái – như một buổi sớm ở Ba Vì, nơi thời gian trôi chậm và mọi thứ đều nhẹ nhàng.
    `,
    region: 'bac',
    productId: 'bac-mo',
    image: '/images/mut_mo.jpg',
    createdAt: '2026-01-26'
  },

  {
    id: 'post-sen-hue',
    title: 'Mứt Hạt Sen Huế – Vị Thanh Của Cố Đô',
    titleEn: 'Hue Lotus Seed Jam – The Subtle Taste of Ancient Capital',
    excerpt: 'Huế nghiêng bóng nước bên thềm sen – Mứt hạt thanh lành giữ vị quen.',
    excerptEn: 'Hue leans on its reflection by the lotus pond – Lotus seed jam preserves the familiar subtle taste.',
    contentEn: `
# Hue Lotus Seed Jam – When the Ancient Capital's Subtle Flavor Meets Modern Life

Hue is a place that doesn't need noise to be remembered. The city by the Perfume River, where life is slow and lotus emerges as a symbol of purity in the ancient capital's culture.

## Taste Profile

The jam has a soft golden hue, a delicate and refined sweetness. Just a few small pieces with a cup of hot tea create a sense of relaxation and convey the meaning of reunion and peace for a full year.
    `,
    content: `
# Mứt Hạt Sen Huế – Khi Vị Thanh Của Cố Đô Chạm Vào Nhịp Sống Hiện Đại

Huế lặng lẽ bên dòng Hương Giang, nơi nhịp sống chậm rãi và sen Huế hiện lên như biểu tượng của sự thuần khiết, thanh tao trong văn hóa cố đô.

## Hương Vị Đặc Trưng

Mứt sen mang sắc vàng hanh dịu mắt, vị ngọt đậm mà tinh. Chỉ cần vài viên nhỏ cùng một chén trà nóng, vị sen và hơi ấm hòa quyện, tạo nên cảm giác thư thái và gửi gắm ý nghĩa sum vầy.
    `,
    region: 'trung',
    productId: 'trung-sen',
    image: '/images/hat_sen.png',
    createdAt: '2026-01-25'
  },

  {
    id: 'post-dau-dalat',
    title: 'Mứt Dâu Tây Đà Lạt – Ngọt Lành Từ Cao Nguyên',
    titleEn: 'Dalat Strawberry Jam – Sweetness from the Highlands',
    excerpt: 'Đà Lạt se lạnh gió cao nguyên – Mứt dâu hồng thắm ngọt bình yên.',
    excerptEn: 'Dalat chilly highland wind – Glowing pink strawberry jam, sweet peace.',
    contentEn: `
# Dalat Strawberry Jam – Sweetness from the Misty Highlands

Dalat emerges softly. The highland city with misty mornings, gentle sun, and familiar chill creates a slow pace of life, where strawberries grow naturally.

## Taste Profile

When enjoyed, a mild sourness gently touches the tongue, then a full sweetness spreads naturally. Just a few slices with bread, yogurt, or a cup of tea, and the highland flavor comes alive.
    `,
    content: `
# Mứt Dâu Tây Đà Lạt – Ngọt Lành Từ Cao Nguyên Sương Mù

Thành phố cao nguyên với sương sớm, nắng dịu và cái se lạnh quen thuộc tạo nên nhịp sống chậm rãi.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị chua thanh chạm nhẹ đầu lưỡi rồi vị ngọt lan dần, đủ đầy mà không gắt.
    `,
    region: 'trung',
    productId: 'trung-dau',
    image: '/images/dau_tay.png',
    createdAt: '2026-01-24'
  },

  {
    id: 'post-dua-bentre',
    title: 'Mứt Dừa Bến Tre – Vị Béo Ngọt Hương Quê',
    titleEn: 'Ben Tre Coconut Jam – Sweet Creamy Flavor of the Homeland',
    excerpt: 'Bến Tre xứ dừa xanh nghiêng bóng – Mứt dừa béo ngọt gói hồn quê.',
    excerptEn: 'Ben Tre, the land of green leaning coconuts – Sweet creamy coconut jam packs the soul of home.',
    contentEn: `
# Ben Tre Coconut Jam – The Creamy Sweetness of Home

Ben Tre is known as the land of coconuts in the Mekong Delta. Coconuts are not just a crop; they are a symbol of resilience, peace, and abundance.

## Characteristics

When enjoyed, the creaminess of the coconut gently spreads on the tongue, blending with a delicate sweetness, bringing a sense of closeness and warmth – like the sincere and rustic Mekong Delta people.
    `,
    content: `
# Mứt Dừa Bến Tre – Vị Béo Ngọt Gói Trọn Hương Quê

Bến Tre xứ dừa xanh nghiêng bóng soi mình xuống kênh rạch.

## Hương Vị Đặc Trưng

Vị béo của dừa lan nhẹ nơi đầu lưỡi, hòa cùng vị ngọt thanh, mang lại cảm giác gần gũi và ấm áp.
    `,
    region: 'nam',
    productId: 'nam-dua',
    image: '/images/mut_dua.jpg',
    createdAt: '2026-01-23'
  },

  {
    id: 'post-mangcau-tiengiang',
    title: 'Mứt Mãng Cầu Tiền Giang – Vị Chua Ngọt Miệt Vườn',
    titleEn: 'Tien Giang Soursop Jam – Orchard Sweet and Sour Flavor',
    excerpt: 'Tiền Giang miệt vườn trĩu quả – Mứt mãng cầu chua ngọt miền nhớ.',
    excerptEn: 'Tien Giang orchards heavy with fruit – Sweet and sour soursop jam of memories.',
    contentEn: `
# Tien Giang Soursop Jam – Gentle Sweet and Sour Taste of Memories

Tien Giang is the largest fruit hub of the Mekong Delta, famous for lush orchards. Soursop is a familiar fruit, with a natural sweet and sour taste, crafted into many traditional dishes.

## Characteristics

When enjoyed, the sourness gently touches the tongue and then dissolves into a delicate sweetness, creating a fresh and pleasant feeling.
    `,
    content: `
# Mứt Mãng Cầu Tiền Giang – Vị Chua Ngọt Dịu Êm Miền Nhớ

Tiền Giang là vựa trái cây lớn của miền Tây Nam Bộ.

## Hương Vị Đặc Trưng

Khi thưởng thức, vị chua chạm nhẹ đầu lưỡi rồi tan dần trong vị ngọt dịu, tạo cảm giác tươi mới và dễ chịu.
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
