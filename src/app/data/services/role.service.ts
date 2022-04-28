import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { DataPage } from '../model/common/data-page.interface';
import { Role } from '../model/role/role.interface';
import { HttpErrorResponse } from '@angular/common/http';

export type UpdateRoleFailure =
  | 'ROLE_NOT_FOUND'
  | 'PERMISSION_NOT_FOUND'
  | 'ROLE_ALREADY_EXISTS';
export type CreateRoleFailure = 'PERMISSION_NOT_FOUND' | 'ROLE_ALREADY_EXISTS';
export type GetRoleFailure = 'ROLE_NOT_FOUND';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private readonly apiService: ApiService) {}

  getRoles(page: number, pageSize: number): Observable<DataPage<Role>> {
    return this.apiService.getRoles({ page, pageSize });
  }

  createRole(params: {
    name: string;
    description: string;
    permissionIds: string[];
  }): Observable<Role> {
    return this.apiService
      .createRole(params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  updateRole(
    roleId: string,
    params: { name?: string; description?: string; permissionIds?: string[] },
  ) {
    return this.apiService
      .updateRole(roleId, params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  getRole(roleId: string): Observable<Role> {
    return this.apiService
      .getRole(roleId)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }
}
