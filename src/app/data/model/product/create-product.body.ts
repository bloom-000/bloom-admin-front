export interface CreateProductBody {
  name: string;
  categoryId: number;
  description?: string;
  price: number;
  oldPrice?: number;
  stockQuantity: number;
  imageOrder: { order: number; imageFilename: string }[];
  images: Blob[];
}
