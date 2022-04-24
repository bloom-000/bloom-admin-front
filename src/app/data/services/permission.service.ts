import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Observable } from 'rxjs';
import { Permission } from '../model/role/permission.interface';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private readonly apiService: ApiService) {}

  getPermissions(): Observable<Permission[]> {
    return this.apiService.getPermissions();
  }
}
