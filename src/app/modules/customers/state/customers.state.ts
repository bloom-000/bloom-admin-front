import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataPage } from '../../../data/model/common/data-page.interface';
import {
  CustomersInitialLoadRequested,
  CustomersPageChanged,
  CustomersPageSizeChanged,
} from './customers.actions';
import { User } from '../../../data/model/user/user.interface';
import { UserService } from '../../../data/services/user.service';

interface CustomersStateModel {
  customers: DataPage<User>;
  pageSize: number;
}

const CUSTOMERS_STATE_TOKEN = new StateToken<CustomersStateModel>('customers');

@State<CustomersStateModel>({
  name: CUSTOMERS_STATE_TOKEN,
  defaults: {
    customers: { data: [], total: 0 },
    pageSize: 10,
  },
})
@Injectable()
export class CustomersState {
  constructor(private readonly userService: UserService) {}

  private currentPage = 1;

  @Selector([CUSTOMERS_STATE_TOKEN])
  static customers(state: CustomersStateModel) {
    return state.customers;
  }

  @Selector([CUSTOMERS_STATE_TOKEN])
  static pageSize(state: CustomersStateModel) {
    return state.pageSize;
  }

  @Action(CustomersInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<CustomersStateModel>) {
    this.currentPage = 1;

    this.userService
      .getUsers(this.currentPage, ctx.getState().pageSize)
      .subscribe((res) => ctx?.patchState({ customers: res }));
  }

  @Action(CustomersPageSizeChanged)
  async pageSizeChanged(
    ctx: StateContext<CustomersStateModel>,
    action: CustomersPageSizeChanged,
  ) {
    this.currentPage = 1;

    this.userService
      .getUsers(1, action.payload.pageSize)
      .subscribe((res) =>
        ctx?.patchState({ customers: res, pageSize: action.payload.pageSize }),
      );
  }

  @Action(CustomersPageChanged)
  async pageChanged(
    ctx: StateContext<CustomersStateModel>,
    action: CustomersPageChanged,
  ) {
    this.userService
      .getUsers(action.payload.page, ctx.getState().pageSize)
      .subscribe((res) => {
        this.currentPage = action.payload.page;
        ctx?.patchState({ customers: res });
      });
  }
}
