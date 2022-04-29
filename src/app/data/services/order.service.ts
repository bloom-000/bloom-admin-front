import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { DataPage } from '../model/common/data-page.interface';
import { Order } from '../model/order/order.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly apiService: ApiService) {}

  getOrders(page: number, pageSize: number): Observable<DataPage<Order>> {
    return this.apiService.getOrders({ page, pageSize });
  }
}
