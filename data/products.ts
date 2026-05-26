export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  sizes: string[];
  stockQty: number;
  image: string;
  description: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Racing Rider T-Shirt',
    price: 550,
    originalPrice: 899,
    category: 'Trending',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stockQty: 15,
    image: '/Product_4.jpeg',
    description: 'Bold racing-inspired design. Life becomes limitless.',
  },
  {
    id: 2,
    name: 'Urban Street Tee',
    price: 550,
    originalPrice: 899,
    category: 'Casual',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stockQty: 10,
    image: '/Product_1.jpeg',
    description: 'Urban graffiti art meets premium street fashion.',
  },
  {
    id: 5,
    name: 'Oversized Tee',
    price: 499,
    originalPrice: 899,
    category: 'Casual',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stockQty: 12,
    image: '/Product_2.jpeg',
    description: 'Only the Bold. Oversized fit for maximum comfort.',
  },
  {
    id: 6,
    name: 'Paisley Classic Tee',
    price: 499,
    originalPrice: 899,
    category: 'Casual',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stockQty: 3,
    image: '/Product_3.jpeg',
    description: 'Intricate paisley pattern for the discerning eye.',
  },
];
