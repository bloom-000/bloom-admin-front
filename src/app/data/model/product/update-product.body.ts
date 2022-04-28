import { CreateProductBody } from './create-product.body';

export type UpdateProductBody = Partial<CreateProductBody> & {
  keepImageIds?: string[];
};
