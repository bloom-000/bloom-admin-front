export class ActionOrders {
  static initialLoadRequested() {
    return new OrdersInitialLoadRequested();
  }

  static pageChanged(payload: { page: number }) {
    return new OrdersPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new OrdersPageSizeChanged(payload);
  }
}

export class OrdersInitialLoadRequested {
  static readonly type = '[orders] initial load requested';
}

export class OrdersPageSizeChanged {
  static readonly type = '[orders] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}

export class OrdersPageChanged {
  static readonly type = '[orders] page changed';

  constructor(public readonly payload: { page: number }) {}
}
