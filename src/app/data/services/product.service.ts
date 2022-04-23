import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product/product.interface';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DataPage } from '../model/common/data-page.interface';

export type CreateProductFailure =
  | 'IMAGE_FILENAME_NOT_PRESENT'
  | 'CATEGORY_NOT_FOUND'
  | 'PRODUCT_NAME_ALREADY_USED';
export type DeleteProductFailure = 'PRODUCT_NOT_FOUND';
export type UpdateProductFailure =
  | 'CATEGORY_NOT_FOUND'
  | 'PRODUCT_NAME_ALREADY_USED'
  | 'PRODUCT_NOT_FOUND';
export type GetProductFailure = 'PRODUCT_NOT_FOUND';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly apiService: ApiService) {}

  createProduct(params: {
    name: string;
    categoryId: number;
    description?: string;
    price: number;
    oldPrice?: number;
    stockQuantity: number;
    images: { file: File; order: number }[];
  }): Observable<Product> {
    return this.apiService
      .createProduct(params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  getProducts(page: number, pageSize: number): Observable<DataPage<Product>> {
    return this.apiService.getProducts({ page, pageSize });
  }

  deleteProduct(productId: number): Observable<void> {
    return this.apiService
      .deleteProduct(productId)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  getProduct(productId: number): Observable<Product> {
    return this.apiService
      .getProduct(productId)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  updateProduct(
    productId: number,
    params: {
      name?: string;
      categoryId?: number;
      description?: string;
      price?: number;
      oldPrice?: number;
      stockQuantity?: number;
      images?: { file: File; order: number }[];
    },
  ): Observable<Product> {
    return this.apiService
      .updateProduct(productId, params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }
}
