import { Product } from '../product/product.interface';

export interface OrderProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  orderId: string;
  product: Product;
  productId: string;
  quantity: number;
}
