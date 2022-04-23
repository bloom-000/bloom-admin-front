export class ActionNewProduct {
  static savePressed(payload: NewProductSavePressedPayload) {
    return new NewProductSavePressed(payload);
  }

  static init(payload: { productId: number }) {
    return new NewProductInit(payload);
  }
}

export class NewProductInit {
  static readonly type = '[new-product] init';

  constructor(public readonly payload: { productId: number }) {}
}

interface NewProductSavePressedPayload {
  name: string;
  categoryId: number;
  description?: string;
  price: number;
  oldPrice?: number;
  stockQuantity: number;
  images: { file: File; order: number }[];
}
export class NewProductSavePressed {
  static readonly type = '[new-product] save pressed';

  constructor(public readonly payload: NewProductSavePressedPayload) {}
}
