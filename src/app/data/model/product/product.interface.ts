import { ProductImage } from './product-image.interface';
import { Category } from '../category/category.interface';

export interface Product {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  stockQuantity: number;
  images: ProductImage[];
  category: Category;
}
