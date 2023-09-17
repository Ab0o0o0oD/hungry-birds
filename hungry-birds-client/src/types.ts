export type Product = {
  id: number;
  cat: string;
  title: string;
  content: string;
  price: number;
  allergier: string;
  img: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
