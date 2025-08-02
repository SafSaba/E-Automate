
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  dataAiHint: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: any;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}
