export class ActionNewProduct {
  static savePressed(payload: NewProductSavePressedPayload) {
    return new NewProductSavePressed(payload);
  }

  static init(payload: { productId: string }) {
    return new NewProductInit(payload);
  }
}

export class NewProductInit {
  static readonly type = '[new-product] init';

  constructor(public readonly payload: { productId: string }) {}
}

interface NewProductSavePressedPayload {
  name: string;
  categoryId: string;
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
