import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  RolesInitialLoadRequested,
  RolesPageChanged,
  RolesPageSizeChanged,
} from './roles.actions';
import { DataPage } from '../../../data/model/common/data-page.interface';
import { Role } from '../../../data/model/role/role.interface';
import { RoleService } from '../../../data/services/role.service';

interface RolesStateModel {
  roles: DataPage<Role>;
  pageSize: number;
}

const ROLES_STATE_TOKEN = new StateToken<RolesStateModel>('roles');

@State<RolesStateModel>({
  name: ROLES_STATE_TOKEN,
  defaults: {
    roles: { data: [], total: 0 },
    pageSize: 10,
  },
})
@Injectable()
export class RolesState {
  constructor(private readonly rolesService: RoleService) {}

  private currentPage = 1;

  @Selector([ROLES_STATE_TOKEN])
  static roles(state: RolesStateModel) {
    return state.roles;
  }

  @Selector([ROLES_STATE_TOKEN])
  static pageSize(state: RolesStateModel) {
    return state.pageSize;
  }

  @Action(RolesInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<RolesStateModel>) {
    this.currentPage = 1;

    this.rolesService
      .getRoles(this.currentPage, ctx.getState().pageSize)
      .subscribe((res) => ctx?.patchState({ roles: res }));
  }

  @Action(RolesPageSizeChanged)
  async pageSizeChanged(
    ctx: StateContext<RolesStateModel>,
    action: RolesPageSizeChanged,
  ) {
    this.currentPage = 1;

    this.rolesService
      .getRoles(1, action.payload.pageSize)
      .subscribe((res) =>
        ctx?.patchState({ roles: res, pageSize: action.payload.pageSize }),
      );
  }

  @Action(RolesPageChanged)
  async pageChanged(
    ctx: StateContext<RolesStateModel>,
    action: RolesPageChanged,
  ) {
    this.rolesService
      .getRoles(action.payload.page, ctx.getState().pageSize)
      .subscribe((res) => {
        this.currentPage = action.payload.page;
        ctx?.patchState({ roles: res });
      });
  }
}
