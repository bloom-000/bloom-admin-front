export interface CreateProductBody {
  name: string;
  categoryId: number;
  description?: string;
  price: number;
  oldPrice?: number;
  stockQuantity: number;
  images: { file: File; order: number }[];
}
