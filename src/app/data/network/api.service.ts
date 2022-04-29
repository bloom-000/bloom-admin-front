import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignInBody } from '../model/authentication/sign-in.body';
import { CreateCategoryBody } from '../model/category/create-category.body';
import { Category } from '../model/category/category.interface';
import { PageOptions } from '../model/common/page-options.interface';
import { DataPage } from '../model/common/data-page.interface';
import { UpdateCategoryBody } from '../model/category/update-category.body';
import { CreateProductBody } from '../model/product/create-product.body';
import { Product } from '../model/product/product.interface';
import { UpdateProductBody } from '../model/product/update-product.body';
import { v4 as uuidV4 } from 'uuid';
import { Role } from '../model/role/role.interface';
import { CreateRoleBody } from '../model/role/create-role.body';
import { UpdateRoleBody } from '../model/role/update-role.body';
import { Permission } from '../model/role/permission.interface';
import { Order } from '../model/order/order.interface';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly client: HttpClient) {}

  signIn(body: SignInBody): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/admin/sign-in`,
      body,
    );
  }

  signOut(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/admin/sign-out`,
      undefined,
    );
  }

  getAuthenticationStatus(): Observable<void> {
    return this.client.get<void>(`${API_URL}/authentication/admin/status`);
  }

  refreshToken(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/authentication/admin/refresh`,
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

  getCategory(categoryId: string): Observable<Category> {
    return this.client.get<Category>(`${API_URL}/categories/${categoryId}`);
  }

  updateCategory(
    categoryId: string,
    body: UpdateCategoryBody,
  ): Observable<Category> {
    return this.client.patch<Category>(
      `${API_URL}/categories/${categoryId}`,
      body,
    );
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.client.delete<void>(`${API_URL}/categories/${categoryId}`);
  }

  createProduct(body: CreateProductBody): Observable<Product> {
    const formData = new FormData();

    // noinspection DuplicatedCode
    const imageOrder: { order: number; imageFilename: string }[] = [];
    for (const image of body.images) {
      if (!image.file) {
        continue;
      }
      const filename = uuidV4();
      formData.append('images', image.file, filename);
      imageOrder.push({ order: image.order, imageFilename: filename });
    }
    formData.set('imageOrder', JSON.stringify(imageOrder));

    formData.set('name', body.name);
    formData.set('categoryId', body.categoryId.toString());
    if (body.description) formData.set('description', body.description);
    formData.set('price', body.price.toString());
    if (body.oldPrice) formData.set('oldPrice', body.oldPrice.toString());
    formData.set('stockQuantity', body.stockQuantity.toString());

    return this.client.post<Product>(`${API_URL}/products`, formData);
  }

  getProducts(pageOptions: PageOptions): Observable<DataPage<Product>> {
    const params = new HttpParams()
      .set('page', pageOptions.page)
      .set('pageSize', pageOptions.pageSize);

    return this.client.get<DataPage<Product>>(`${API_URL}/products`, {
      params,
    });
  }

  deleteProduct(productId: string): Observable<void> {
    return this.client.delete<void>(`${API_URL}/products/${productId}`);
  }

  getProduct(productId: string) {
    return this.client.get<Product>(`${API_URL}/products/${productId}`);
  }

  getAllCategories() {
    return this.client.get<Category[]>(`${API_URL}/categories/all`);
  }

  updateProduct(
    productId: string,
    body: UpdateProductBody,
  ): Observable<Product> {
    const formData = new FormData();

    if (body.images) {
      // noinspection DuplicatedCode
      const imageOrder: { order: number; imageFilename: string }[] = [];
      for (const image of body.images) {
        if (!image.file) {
          continue;
        }
        const filename = uuidV4();
        formData.append('images', image.file, filename);
        imageOrder.push({ order: image.order, imageFilename: filename });
      }
      formData.set('imageOrder', JSON.stringify(imageOrder));
    }

    if (body.name) formData.set('name', body.name);
    if (body.categoryId) formData.set('categoryId', body.categoryId.toString());
    if (body.description) formData.set('description', body.description);
    if (body.price) formData.set('price', body.price.toString());
    if (body.oldPrice) formData.set('oldPrice', body.oldPrice.toString());
    if (body.stockQuantity)
      formData.set('stockQuantity', body.stockQuantity.toString());
    if (body.keepImageIds)
      body.keepImageIds.forEach((e) =>
        formData.append('keepImageIds', e.toString()),
      );

    return this.client.patch<Product>(
      `${API_URL}/products/${productId}`,
      formData,
    );
  }

  getRoles(pageOptions: PageOptions): Observable<DataPage<Role>> {
    const params = new HttpParams()
      .set('page', pageOptions.page)
      .set('pageSize', pageOptions.pageSize);

    return this.client.get<DataPage<Role>>(`${API_URL}/roles`, { params });
  }

  createRole(body: CreateRoleBody): Observable<Role> {
    return this.client.post<Role>(`${API_URL}/roles`, body);
  }

  updateRole(roleId: string, body: UpdateRoleBody): Observable<Role> {
    return this.client.patch<Role>(`${API_URL}/roles/${roleId}`, body);
  }

  getRole(roleId: string): Observable<Role> {
    return this.client.get<Role>(`${API_URL}/roles/${roleId}`);
  }

  getPermissions(): Observable<Permission[]> {
    return this.client.get<Permission[]>(`${API_URL}/permissions`);
  }

  getOrders(param: PageOptions): Observable<DataPage<Order>> {
    const params = new HttpParams()
      .set('page', param.page)
      .set('pageSize', param.pageSize);

    return this.client.get<DataPage<Order>>(`${API_URL}/orders`, { params });
  }
}
