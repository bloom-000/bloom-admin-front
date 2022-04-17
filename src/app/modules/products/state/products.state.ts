import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataPage } from '../../../data/model/common/data-page.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Navigate } from '@ngxs/router-plugin';
import { Product } from '../../../data/model/product/product.interface';
import {
  DeleteProductFailure,
  ProductService,
} from '../../../data/services/product.service';
import {
  ProductsDeletePressed,
  ProductsInitialLoadRequested,
  ProductsPageChanged,
  ProductsPageSizeChanged,
  ProductsShowDetailsPressed,
  ProductsUpdatePressed,
} from './products.actions';

interface ProductsStateModel {
  products: DataPage<Product>;
  pageSize: number;
}

const PRODUCT_STATE_TOKEN = new StateToken<ProductsStateModel>('products');

@State<ProductsStateModel>({
  name: PRODUCT_STATE_TOKEN,
  defaults: {
    products: { data: [], total: 0 },
    pageSize: 10,
  },
})
@Injectable()
export class ProductsState {
  constructor(
    private readonly productService: ProductService,
    private readonly store: Store,
    private readonly notificationService: NzNotificationService,
  ) {}

  private currentPage = 1;

  @Selector([PRODUCT_STATE_TOKEN])
  static products(state: ProductsStateModel) {
    return state.products;
  }

  @Selector([PRODUCT_STATE_TOKEN])
  static pageSize(state: ProductsStateModel) {
    return state.pageSize;
  }

  @Action(ProductsInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<ProductsStateModel>) {
    this.productService
      .getProducts(this.currentPage, ctx.getState().pageSize)
      .subscribe((res) => ctx?.patchState({ products: res }));
  }

  @Action(ProductsPageSizeChanged)
  async pageSizeChanged(
    ctx: StateContext<ProductsStateModel>,
    action: ProductsPageSizeChanged,
  ) {
    this.currentPage = 1;

    this.productService
      .getProducts(1, action.payload.pageSize)
      .subscribe((res) =>
        ctx?.patchState({ products: res, pageSize: action.payload.pageSize }),
      );
  }

  @Action(ProductsShowDetailsPressed)
  async productShowDetails(
    ctx: StateContext<ProductsStateModel>,
    action: ProductsShowDetailsPressed,
  ) {
    this.store.dispatch(new Navigate([`/products/${action.payload.id}`]));
  }

  @Action(ProductsUpdatePressed)
  async productUpdatePressed(
    ctx: StateContext<ProductsStateModel>,
    action: ProductsUpdatePressed,
  ) {
    this.store.dispatch(
      new Navigate(['/products/new'], { productId: action.payload.id }),
    );
  }

  @Action(ProductsDeletePressed)
  async productDeletePressed(
    ctx: StateContext<ProductsStateModel>,
    action: ProductsDeletePressed,
  ) {
    this.productService.deleteProduct(action.payload.id).subscribe({
      next: () => {
        const products = ctx.getState().products;
        const newProducts = products.data.filter(
          (e) => e.id !== action.payload.id,
        );

        ctx?.patchState({
          products: {
            data: newProducts,
            total: products.total - 1,
          },
        });
      },
      error: (err: DeleteProductFailure) => {
        switch (err) {
          case 'PRODUCT_NOT_FOUND':
            this.notificationService.error('Error', 'Product not found');
            break;
        }
      },
    });
  }

  @Action(ProductsPageChanged)
  async pageChanged(
    ctx: StateContext<ProductsStateModel>,
    action: ProductsPageChanged,
  ) {
    this.productService
      .getProducts(action.payload.page, ctx.getState().pageSize)
      .subscribe((res) => {
        this.currentPage = action.payload.page;
        ctx?.patchState({ products: res });
      });
  }
}
