import { Category } from '../../../data/model/category/category.interface';

export class ActionCategories {
  static initialLoadRequested() {
    return new CategoriesInitialLoadRequested();
  }

  static deletePressed(payload: Category) {
    return new CategoriesDeletePressed(payload);
  }

  static updatePressed(payload: Category) {
    return new CategoriesUpdatePressed(payload);
  }

  static pageChanged(payload: { page: number }) {
    return new CategoriesPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new CategoriesPageSizeChanged(payload);
  }
}

export class CategoriesInitialLoadRequested {
  static readonly type = '[categories] initial load requested';
}

export class CategoriesPageSizeChanged {
  static readonly type = '[categories] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}

export class CategoriesDeletePressed {
  static readonly type = '[categories] delete';

  constructor(public readonly payload: Category) {}
}

export class CategoriesUpdatePressed {
  static readonly type = '[categories] update';

  constructor(public readonly payload: Category) {}
}

export class CategoriesPageChanged {
  static readonly type = '[categories] page changed';

  constructor(public readonly payload: { page: number }) {}
}
