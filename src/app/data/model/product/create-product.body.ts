export interface CreateProductBody {
  name: string;
  categoryId: string;
  description?: string;
  price: number;
  oldPrice?: number;
  stockQuantity: number;
  images: { file: File; order: number }[];
}
