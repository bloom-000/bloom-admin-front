import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RolesState } from './state/roles.state';
import { Observable } from 'rxjs';
import { DataPage } from '../../data/model/common/data-page.interface';
import { Navigate } from '@ngxs/router-plugin';
import { Role } from '../../data/model/role/role.interface';
import { ActionRoles } from './state/roles.actions';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(RolesState.roles) roles$!: Observable<DataPage<Role>>;
  @Select(RolesState.pageSize) pageSize$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(ActionRoles.initialLoadRequested());
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionRoles.pageChanged({ page }));
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionRoles.pageSizeChanged({ pageSize }));
  }

  onUpdateRolePressed(role: Role) {
    this.store.dispatch(new Navigate(['/roles/new'], { roleId: role.id }));
  }
}
