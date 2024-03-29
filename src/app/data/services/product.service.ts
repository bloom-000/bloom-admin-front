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
    categoryId: string;
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

  deleteProduct(productId: string): Observable<void> {
    return this.apiService
      .deleteProduct(productId)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  getProduct(productId: string): Observable<Product> {
    return this.apiService
      .getProduct(productId)
      .pipe(catchError((err) => throwError(err?.error?.message)));
  }

  updateProduct(
    productId: string,
    params: {
      name?: string;
      categoryId?: string;
      description?: string;
      price?: number;
      oldPrice?: number;
      stockQuantity?: number;
      images?: { file?: File; order: number; productImageId?: string }[];
    },
  ): Observable<Product> {
    const keepImageIds: string[] | undefined = params.images
      ?.filter((e) => e.productImageId && !e.file)
      ?.map((e) => e.productImageId!);

    const images: { file: File; order: number }[] | undefined = params.images
      ?.filter((e) => e.file)
      ?.map((e) => ({ file: e.file!, order: e.order }));

    return this.apiService
      .updateProduct(productId, {
        ...params,
        keepImageIds,
        images: images?.length ? images : undefined,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }
}
