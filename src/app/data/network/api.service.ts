import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignInBody } from '../model/authentication/sign-in.body';
import { CreateCategoryBody } from '../model/category/create-category.body';
import { Category } from '../model/category/category.interface';
import { PageOptions } from '../model/common/page-options.interface';
import { DataPage } from '../model/common/data-page.interface';
import { UpdateCategoryBody } from '../model/category/update-category.body';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly client: HttpClient) {}

  signIn(body: SignInBody): Observable<void> {
    return this.client.post<void>(`${API_URL}/authentication/sign-in`, body);
  }

  signOut(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/sign-out`,
      undefined,
    );
  }

  getAuthenticationStatus(): Observable<void> {
    return this.client.get<void>(`${API_URL}/authentication/status`);
  }

  refreshToken(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/refresh`,
      undefined,
    );
  }

  createCategory(body: CreateCategoryBody): Observable<Category> {
    return this.client.post<Category>(`${API_URL}/categories`, body);
  }

  getCategories(pageOptions: PageOptions): Observable<DataPage<Category>> {
    const params = new HttpParams()
      .set('page', pageOptions.page)
      .set('pageSize', pageOptions.pageSize);

    return this.client.get<DataPage<Category>>(`${API_URL}/categories`, {
      params,
    });
  }

  getCategory(categoryId: number): Observable<Category> {
    return this.client.get<Category>(`${API_URL}/categories/${categoryId}`);
  }

  updateCategory(
    categoryId: number,
    body: UpdateCategoryBody,
  ): Observable<Category> {
    return this.client.patch<Category>(
      `${API_URL}/categories/${categoryId}`,
      body,
    );
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.client.delete<void>(`${API_URL}/categories/${categoryId}`);
  }
}
