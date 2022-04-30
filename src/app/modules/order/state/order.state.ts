import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Order } from '../../../data/model/order/order.interface';
import {
  GetOrderFailure,
  OrderService,
} from '../../../data/services/order.service';
import { OrderDeletePressed, OrderOrderIdLoaded } from './order.actions';
import { OrderProduct } from '../../../data/model/order/order-product.interface';

interface OrderStateModel {
  order?: Order;
  productsPrice: number;
  totalPrice: number;
}

const ORDER_STATE_TOKEN = new StateToken<OrderStateModel>('order');

@State({
  name: ORDER_STATE_TOKEN,
  defaults: {
    order: undefined,
    productsPrice: 0,
    totalPrice: 0,
  },
})
@Injectable()
export class OrderState {
  constructor(
    private readonly orderService: OrderService,
    private readonly store: Store,
    private readonly notificationService: NzNotificationService,
  ) {}

  @Selector([ORDER_STATE_TOKEN])
  static order(state: OrderStateModel) {
    return state.order;
  }

  @Selector([ORDER_STATE_TOKEN])
  static productsPrice(state: OrderStateModel) {
    return state.productsPrice;
  }

  @Selector([ORDER_STATE_TOKEN])
  static totalPrice(state: OrderStateModel) {
    return state.totalPrice;
  }

  @Action(OrderDeletePressed)
  async orderDeletePressed() {
    // action: OrderDeletePressed, // ctx: StateContext<OrderStateModel>,
    return;
  }

  @Action(OrderOrderIdLoaded)
  async orderIdLoaded(
    ctx: StateContext<OrderStateModel>,
    action: OrderOrderIdLoaded,
  ) {
    if (!action.payload.orderId) {
      return;
    }

    this.orderService.getOrderDetails(action.payload.orderId).subscribe({
      next: (res: Order) => {
        const productsPrice = res.products.reduce(
          (prev: number, curr: OrderProduct) =>
            prev + curr.product.price * curr.quantity,
          0,
        );
        ctx.patchState({
          order: res,
          totalPrice: productsPrice + res.deliveryFee,
          productsPrice,
        });
      },
      error: (err: GetOrderFailure) => {
        switch (err) {
          case 'ORDER_NOT_FOUND':
            this.notificationService.error('Error', 'Order not found');
            break;
          default:
            this.notificationService.error('Error', 'Unknown error occurred');
            break;
        }
      },
    });
  }
}
