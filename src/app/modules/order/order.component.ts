import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from './state/order.state';
import { Observable } from 'rxjs';
import { Order } from '../../data/model/order/order.interface';
import { ActionOrder } from './state/order.actions';
import { Constants } from '../../common/constants';
import { OrderProduct } from '../../data/model/order/order-product.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
  ) {}

  @Select(OrderState.order) order$!: Observable<Order>;
  @Select(OrderState.productsPrice) productsPrice$!: Observable<number>;
  @Select(OrderState.totalPrice) totalPrice$!: Observable<number>;

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.store.dispatch(
        ActionOrder.orderIdLoaded({ orderId: params['orderId'] }),
      ),
    );
  }

  composeImagePath(orderProduct: OrderProduct): string {
    console.log(
      `${Constants.API_URL}/${orderProduct.product.primaryImagePath}`,
    );
    return `${Constants.API_URL}/${orderProduct.product.primaryImagePath}`;
  }

  onDeletePressed() {
    this.store.dispatch(ActionOrder.deletePressed());
  }
}
