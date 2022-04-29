import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataPage } from '../../../data/model/common/data-page.interface';
import { Order } from '../../../data/model/order/order.interface';
import { OrderService } from '../../../data/services/order.service';
import {
  OrdersInitialLoadRequested,
  OrdersPageChanged,
  OrdersPageSizeChanged,
} from './orders.actions';

interface OrdersStateModel {
  orders: DataPage<Order>;
  pageSize: number;
}

const ORDERS_STATE_TOKEN = new StateToken<OrdersStateModel>('orders');

@State<OrdersStateModel>({
  name: ORDERS_STATE_TOKEN,
  defaults: {
    orders: { data: [], total: 0 },
    pageSize: 10,
  },
})
@Injectable()
export class OrdersState {
  constructor(private readonly orderService: OrderService) {}

  private currentPage = 1;

  @Selector([ORDERS_STATE_TOKEN])
  static orders(state: OrdersStateModel) {
    return state.orders;
  }

  @Selector([ORDERS_STATE_TOKEN])
  static pageSize(state: OrdersStateModel) {
    return state.pageSize;
  }

  @Action(OrdersInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<OrdersStateModel>) {
    this.currentPage = 1;

    this.orderService
      .getOrders(this.currentPage, ctx.getState().pageSize)
      .subscribe((res) => ctx?.patchState({ orders: res }));
  }

  @Action(OrdersPageSizeChanged)
  async pageSizeChanged(
    ctx: StateContext<OrdersStateModel>,
    action: OrdersPageSizeChanged,
  ) {
    this.currentPage = 1;

    this.orderService
      .getOrders(1, action.payload.pageSize)
      .subscribe((res) =>
        ctx?.patchState({ orders: res, pageSize: action.payload.pageSize }),
      );
  }

  @Action(OrdersPageChanged)
  async pageChanged(
    ctx: StateContext<OrdersStateModel>,
    action: OrdersPageChanged,
  ) {
    this.orderService
      .getOrders(action.payload.page, ctx.getState().pageSize)
      .subscribe((res) => {
        this.currentPage = action.payload.page;
        ctx?.patchState({ orders: res });
      });
  }
}
