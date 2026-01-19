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
    id: 'post-sen-tayho',
    title: 'Sen Tây Hồ - Hương Thơm Ngàn Năm Kinh Kỳ',
    excerpt: 'Khám phá câu chuyện về loài sen thanh khiết đã trở thành biểu tượng của đất Hà thành.',
    content: `
# Sen Tây Hồ - Hương Thơm Ngàn Năm Kinh Kỳ

Hồ Tây - viên ngọc xanh giữa lòng Hà Nội, từ ngàn đời đã là nơi sinh sống của loài sen thanh khiết. 
Sen Tây Hồ không chỉ đẹp mà còn mang trong mình hương vị tinh túy của đất kinh kỳ.

## Lịch sử và văn hóa
Sen đã gắn bó với người Hà Nội từ thuở lập đô, trở thành biểu tượng của sự thanh cao, thuần khiết...
    `,
    region: 'bac',
    productId: 'bac-sen',
    image: '/blog/sen-tayho.jpg',
    createdAt: '2026-01-15'
  },
  {
    id: 'post-quat-hungyen',
    title: 'Quất Hưng Yên - Vị Tết Cổ Truyền',
    excerpt: 'Câu chuyện về loại quả vàng óng mang đến may mắn trong những ngày Xuân.',
    content: `
# Quất Hưng Yên - Vị Tết Cổ Truyền

Hưng Yên - vùng đất nhãn lồng nổi tiếng còn có một đặc sản khác: quất vàng óng...
    `,
    region: 'bac',
    productId: 'bac-quat',
    image: '/blog/quat-hungyen.jpg',
    createdAt: '2026-01-14'
  },
  {
    id: 'post-gung-hue',
    title: 'Gừng Huế - Hơi Ấm Cung Đình',
    excerpt: 'Khám phá bí quyết chế biến gừng của các nghệ nhân cung đình triều Nguyễn.',
    content: `
# Gừng Huế - Hơi Ấm Cung Đình

Huế - cố đô của triều Nguyễn, nơi nghệ thuật ẩm thực được nâng lên tầm cao mới...
    `,
    region: 'trung',
    productId: 'trung-gung',
    image: '/blog/gung-hue.jpg',
    createdAt: '2026-01-13'
  },
  {
    id: 'post-me-danang',
    title: 'Me Đà Nẵng - Vị Chua Miền Nắng Gió',
    excerpt: 'Câu chuyện về loại quả gắn liền với tuổi thơ của người miền Trung.',
    content: `
# Me Đà Nẵng - Vị Chua Miền Nắng Gió

Đà Nẵng - thành phố biển xinh đẹp với những hàng me xanh mát...
    `,
    region: 'trung',
    productId: 'trung-me',
    image: '/blog/me-danang.jpg',
    createdAt: '2026-01-12'
  },
  {
    id: 'post-dua-bentre',
    title: 'Dừa Bến Tre - Hồn Quê Nam Bộ',
    excerpt: 'Khám phá xứ dừa Bến Tre và câu chuyện về loại mứt truyền thống.',
    content: `
# Dừa Bến Tre - Hồn Quê Nam Bộ

Bến Tre - xứ sở ngàn dừa, nơi cây dừa trở thành biểu tượng của đời sống Nam Bộ...
    `,
    region: 'nam',
    productId: 'nam-dua',
    image: '/blog/dua-bentre.jpg',
    createdAt: '2026-01-11'
  },
  {
    id: 'post-tac-cantho',
    title: 'Tắc Cần Thơ - Vị Ngọt Sông Nước',
    excerpt: 'Câu chuyện về loại quả nhỏ bé mang hương vị miệt vườn.',
    content: `
# Tắc Cần Thơ - Vị Ngọt Sông Nước

Cần Thơ - thủ phủ miền Tây, nơi sông nước mênh mông và vườn cây trĩu quả...
    `,
    region: 'nam',
    productId: 'nam-tac',
    image: '/blog/tac-cantho.jpg',
    createdAt: '2026-01-10'
  }
];

export const getPostByProductId = (productId: string): BlogPost | undefined => {
  return posts.find(p => p.productId === productId);
};
