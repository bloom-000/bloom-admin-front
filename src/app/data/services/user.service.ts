import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Observable } from 'rxjs';
import { User } from '../model/user/user.interface';
import { DataPage } from '../model/common/data-page.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly apiService: ApiService) {}

  getUsers(page: number, pageSize: number): Observable<DataPage<User>> {
    return this.apiService.getUsers({ page, pageSize });
  }
}
