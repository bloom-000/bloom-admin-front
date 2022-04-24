import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { DataPage } from '../model/common/data-page.interface';
import { Role } from '../model/role/role.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private readonly apiService: ApiService) {}

  getRoles(page: number, pageSize: number): Observable<DataPage<Role>> {
    return this.apiService.getRoles({ page, pageSize });
  }

  createRole(params: {
    name: string;
    description: string;
    permissionIds: number[];
  }): Observable<Role> {
    return this.apiService
      .createRole(params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }
}
