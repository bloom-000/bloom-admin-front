import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CategoriesState } from '../categories/state/categories.state';
import { Observable } from 'rxjs';
import { DataPage } from '../../data/model/common/data-page.interface';
import { CustomersState } from './state/customers.state';
import { User } from '../../data/model/user/user.interface';
import { ActionCustomers } from './state/customers.actions';
import { Constants } from '../../common/constants';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(CustomersState.customers) customers$!: Observable<DataPage<User>>;
  @Select(CategoriesState.pageSize) pageSize$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(ActionCustomers.initialLoadRequested());
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionCustomers.pageChanged({ page }));
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionCustomers.pageSizeChanged({ pageSize }));
  }

  onShowCustomerDetailsPressed(user: User): void {
    this.store.dispatch(new Navigate([`/users/${user.id}`]));
  }

  // noinspection JSUnusedGlobalSymbols
  composeImageUrl(path: string): string {
    return `${Constants.API_URL}/${path}`;
  }
}
