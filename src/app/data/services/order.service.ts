import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { DataPage } from '../model/common/data-page.interface';
import { Order } from '../model/order/order.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export type GetOrderFailure = 'ORDER_NOT_FOUND';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly apiService: ApiService) {}

  getOrders(page: number, pageSize: number): Observable<DataPage<Order>> {
    return this.apiService.getOrders({ page, pageSize });
  }

  getOrderDetails(orderId: string): Observable<Order> {
    return this.apiService
      .getOrderDetails(orderId)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }
}
