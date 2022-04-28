import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../network/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../model/category/category.interface';
import { DataPage } from '../model/common/data-page.interface';

export type CreateCategoryFailure = 'CATEGORY_NAME_ALREADY_USED';
export type UpdateCategoryFailure = 'CATEGORY_NOT_FOUND';
export type DeleteCategoryFailure = 'CATEGORY_NOT_FOUND';
export type GetCategoryFailure = 'CATEGORY_NOT_FOUND';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private readonly apiService: ApiService) {}

  createCategory(payload: {
    name: string;
    description?: string;
  }): Observable<Category> {
    return this.apiService
      .createCategory({
        name: payload.name,
        description: payload.description ? payload.description : undefined,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  getCategories(
    page: number,
    pageSize: number,
  ): Observable<DataPage<Category>> {
    return this.apiService.getCategories({ page, pageSize });
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.apiService
      .getCategory(categoryId)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  updateCategory(
    categoryId: string,
    payload: {
      name?: string;
      description?: string;
    },
  ): Observable<Category> {
    return this.apiService
      .updateCategory(categoryId, payload)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.apiService
      .deleteCategory(categoryId)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  getAllCategories(): Observable<Category[]> {
    return this.apiService.getAllCategories();
  }
}
