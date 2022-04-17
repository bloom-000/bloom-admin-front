import { Product } from '../../../data/model/product/product.interface';

export class ActionProducts {
  static initialLoadRequested() {
    return new ProductsInitialLoadRequested();
  }

  static showProductDetailsPressed(payload: Product) {
    return new ProductsShowDetailsPressed(payload);
  }

  static deleteProductPressed(payload: Product) {
    return new ProductsDeletePressed(payload);
  }

  static updateProductPressed(payload: Product) {
    return new ProductsUpdatePressed(payload);
  }

  static pageChanged(payload: { page: number }) {
    return new ProductsPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new ProductsPageSizeChanged(payload);
  }
}

export class ProductsInitialLoadRequested {
  static readonly type = '[products] initial load requested';
}

export class ProductsShowDetailsPressed {
  static readonly type = '[products] show details pressed';

  constructor(public readonly payload: Product) {}
}

export class ProductsDeletePressed {
  static readonly type = '[products] delete pressed';

  constructor(public readonly payload: Product) {}
}

export class ProductsUpdatePressed {
  static readonly type = '[products] update pressed';

  constructor(public readonly payload: Product) {}
}

export class ProductsPageChanged {
  static readonly type = '[products] page changed';

  constructor(public readonly payload: { page: number }) {}
}

export class ProductsPageSizeChanged {
  static readonly type = '[products] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}
