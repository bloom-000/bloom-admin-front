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
import {
  NewRoleInitialRoleIdLoaded,
  NewRoleSavePressed,
} from './new-role.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Role } from '../../../data/model/role/role.interface';
import {
  CreateRoleFailure,
  GetRoleFailure,
  RoleService,
  UpdateRoleFailure,
} from '../../../data/services/role.service';
import { Permission } from '../../../data/model/role/permission.interface';
import { PermissionService } from '../../../data/services/permission.service';

interface NewRoleStateModel {
  initialRole?: Role;
  permissions: Permission[];
}

const NEW_ROLE_STATE_TOKEN = new StateToken<NewRoleStateModel>('new_role');

@State({
  name: NEW_ROLE_STATE_TOKEN,
  defaults: {
    permissions: [],
  },
})
@Injectable()
export class NewRoleState {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly store: Store,
    private readonly notificationService: NzNotificationService,
  ) {}

  @Selector([NEW_ROLE_STATE_TOKEN])
  static initialRole(state: NewRoleStateModel) {
    return state.initialRole;
  }

  @Selector([NEW_ROLE_STATE_TOKEN])
  static permissions(state: NewRoleStateModel) {
    return state.permissions;
  }

  @Action(NewRoleSavePressed)
  async createRole(
    ctx: StateContext<NewRoleStateModel>,
    action: NewRoleSavePressed,
  ) {
    const initialRole = ctx.getState().initialRole;

    if (initialRole) {
      this.roleService.updateRole(initialRole.id, action.payload).subscribe({
        next: () => this.store.dispatch(new Navigate(['/roles'])),
        error: (err: UpdateRoleFailure) => {
          switch (err) {
            case 'ROLE_NOT_FOUND':
              this.notificationService.error('Error', 'Role not found');
              break;
            case 'PERMISSION_NOT_FOUND':
              this.notificationService.error('Error', 'Permission not found');
              break;
            case 'ROLE_ALREADY_EXISTS':
              this.notificationService.error('Error', 'Role already exists');
              break;
            default:
              this.notificationService.error('Error', 'Unknown error occurred');
              break;
          }
        },
      });
    } else {
      this.roleService.createRole(action.payload).subscribe({
        next: () => this.store.dispatch(new Navigate(['/roles'])),
        error: (err: CreateRoleFailure) => {
          switch (err) {
            case 'PERMISSION_NOT_FOUND':
              this.notificationService.error('Error', 'Permission not found');
              break;
            case 'ROLE_ALREADY_EXISTS':
              this.notificationService.error('Error', 'Role already exists');
              break;
            default:
              this.notificationService.error('Error', 'Unknown error occurred');
              break;
          }
        },
      });
    }
  }

  @Action(NewRoleInitialRoleIdLoaded)
  async initialRoleIdLoaded(
    ctx: StateContext<NewRoleStateModel>,
    action: NewRoleInitialRoleIdLoaded,
  ) {
    ctx.patchState({ initialRole: undefined });

    if (action.payload.roleId) {
      this.roleService.getRole(action.payload.roleId).subscribe({
        next: (res: Role) => ctx.patchState({ initialRole: res }),
        error: (err: GetRoleFailure) => {
          switch (err) {
            case 'ROLE_NOT_FOUND':
              this.notificationService.error('Error', 'Role not found');
              break;
            default:
              this.notificationService.error('Error', 'Unknown error occurred');
              break;
          }
        },
      });
    }

    this.permissionService
      .getPermissions()
      .subscribe((res) => ctx.patchState({ permissions: res }));
  }
}
