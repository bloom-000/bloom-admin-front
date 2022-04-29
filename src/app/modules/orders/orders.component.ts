import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DataPage } from '../../data/model/common/data-page.interface';
import { Navigate } from '@ngxs/router-plugin';
import { OrdersState } from './state/orders.state';
import { Order } from '../../data/model/order/order.interface';
import { ActionOrders } from './state/orders.actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(OrdersState.orders) orders$!: Observable<DataPage<Order>>;
  @Select(OrdersState.pageSize) pageSize$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(ActionOrders.initialLoadRequested());
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionOrders.pageChanged({ page }));
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionOrders.pageSizeChanged({ pageSize }));
  }

  onShowOrderDetailsPressed(order: Order) {
    this.store.dispatch(new Navigate([`/orders/${order.id}`]));
  }
}
