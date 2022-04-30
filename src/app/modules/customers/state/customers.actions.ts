export class ActionCustomers {
  static initialLoadRequested() {
    return new CustomersInitialLoadRequested();
  }

  static pageChanged(payload: { page: number }) {
    return new CustomersPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new CustomersPageSizeChanged(payload);
  }
}

export class CustomersInitialLoadRequested {
  static readonly type = '[customers] initial load requested';
}

export class CustomersPageSizeChanged {
  static readonly type = '[customers] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}

export class CustomersPageChanged {
  static readonly type = '[customers] page changed';

  constructor(public readonly payload: { page: number }) {}
}
