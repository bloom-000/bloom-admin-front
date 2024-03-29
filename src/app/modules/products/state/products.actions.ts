import { Product } from '../../../data/model/product/product.interface';

export class ActionProducts {
  static initialLoadRequested() {
    return new ProductsInitialLoadRequested();
  }

  static deleteProductPressed(payload: Product) {
    return new ProductsDeletePressed(payload);
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

export class ProductsDeletePressed {
  static readonly type = '[products] delete pressed';

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
