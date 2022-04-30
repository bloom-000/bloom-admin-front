export class ActionOrder {
  static deletePressed() {
    return new OrderDeletePressed();
  }

  static orderIdLoaded(payload: { orderId: string }) {
    return new OrderOrderIdLoaded(payload);
  }
}

export class OrderDeletePressed {
  static readonly type = '[order] delete';
}

export class OrderOrderIdLoaded {
  static readonly type = '[order] order id loaded';

  constructor(public readonly payload: { orderId: string }) {}
}
