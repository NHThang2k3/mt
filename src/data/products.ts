export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  region: 'bac' | 'trung' | 'nam';
  regionName: string;
  image: string;
  description: string;
  story: string;
}

export const products: Product[] = [
  // Miền Bắc
  {
    id: 'bac-sen',
    name: 'Mứt Sen Tây Hồ',
    nameEn: 'West Lake Lotus Jam',
    price: 150000,
    region: 'bac',
    regionName: 'Miền Bắc',
    image: '/products/mut-sen.jpg',
    description: 'Mứt sen thơm ngọt từ Tây Hồ, Hà Nội',
    story: 'Hạt sen Tây Hồ nổi tiếng từ ngàn đời, được người Hà thành nâng niu chế biến thành món mứt thanh nhã, đậm đà hương vị kinh kỳ.'
  },
  {
    id: 'bac-quat',
    name: 'Mứt Quất Hưng Yên',
    nameEn: 'Hung Yen Kumquat Jam',
    price: 120000,
    region: 'bac',
    regionName: 'Miền Bắc',
    image: '/products/mut-quat.jpg',
    description: 'Mứt quất chua ngọt hài hòa từ Hưng Yên',
    story: 'Quất Hưng Yên với vị chua thanh, được kết tinh thành những miếng mứt vàng óng, mang hương vị Tết cổ truyền Bắc Bộ.'
  },
  // Miền Trung
  {
    id: 'trung-gung',
    name: 'Mứt Gừng Huế',
    nameEn: 'Hue Ginger Jam',
    price: 130000,
    region: 'trung',
    regionName: 'Miền Trung',
    image: '/products/mut-gung.jpg',
    description: 'Mứt gừng cay nồng đặc trưng xứ Huế',
    story: 'Gừng Huế được các nghệ nhân cung đình chế biến theo công thức bí truyền, tạo nên vị cay ấm đặc trưng của đất Thần Kinh.'
  },
  {
    id: 'trung-me',
    name: 'Mứt Me Đà Nẵng',
    nameEn: 'Da Nang Tamarind Jam',
    price: 110000,
    region: 'trung',
    regionName: 'Miền Trung',
    image: '/products/mut-me.jpg',
    description: 'Mứt me chua ngọt đậm đà miền Trung',
    story: 'Me chín vàng ruộm dưới nắng gió miền Trung, được chế biến thành món mứt chua ngọt hài hòa, đậm chất biển cả.'
  },
  // Miền Nam
  {
    id: 'nam-dua',
    name: 'Mứt Dừa Bến Tre',
    nameEn: 'Ben Tre Coconut Jam',
    price: 140000,
    region: 'nam',
    regionName: 'Miền Nam',
    image: '/products/mut-dua.jpg',
    description: 'Mứt dừa béo ngọt từ xứ dừa Bến Tre',
    story: 'Dừa Bến Tre - xứ sở ngàn dừa, được chế biến thành những sợi mứt trắng ngần, béo ngọt đậm đà hương vị phương Nam.'
  },
  {
    id: 'nam-tac',
    name: 'Mứt Tắc Cần Thơ',
    nameEn: 'Can Tho Calamansi Jam',
    price: 115000,
    region: 'nam',
    regionName: 'Miền Nam',
    image: '/products/mut-tac.jpg',
    description: 'Mứt tắc thanh mát từ miệt vườn Cần Thơ',
    story: 'Tắc miệt vườn sông nước Cần Thơ, được người dân Nam Bộ khéo léo chế biến thành món mứt thanh mát, ngọt dịu.'
  }
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

export const getProductsByRegion = (region: 'bac' | 'trung' | 'nam'): Product[] => {
  return products.filter(p => p.region === region);
};
