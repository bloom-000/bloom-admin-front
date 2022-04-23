import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Product } from '../../../data/model/product/product.interface';
import { NewProductInit, NewProductSavePressed } from './new-product.actions';
import {
  CreateProductFailure,
  GetProductFailure,
  ProductService,
  UpdateProductFailure,
} from '../../../data/services/product.service';
import { Navigate } from '@ngxs/router-plugin';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from '../../../data/services/category.service';
import { Category } from '../../../data/model/category/category.interface';
import { NzMessageService } from 'ng-zorro-antd/message';

interface NewProductStateModel {
  initialProduct?: Product;
  categories: Category[];
}

const NEW_PRODUCT_STATE_TOKEN = new StateToken<NewProductStateModel>(
  'new_product',
);

@State({
  name: NEW_PRODUCT_STATE_TOKEN,
  defaults: {
    initialProduct: undefined,
    categories: [],
  },
})
@Injectable()
export class NewProductState {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly store: Store,
    private readonly notificationService: NzNotificationService,
    private readonly messageService: NzMessageService,
  ) {}

  @Selector([NEW_PRODUCT_STATE_TOKEN])
  static initialProduct(state: NewProductStateModel) {
    return state.initialProduct;
  }

  @Selector([NEW_PRODUCT_STATE_TOKEN])
  static categories(state: NewProductStateModel) {
    return state.categories;
  }

  @Action(NewProductSavePressed)
  savePressed(
    ctx: StateContext<NewProductStateModel>,
    action: NewProductSavePressed,
  ) {
    const orderValues = action.payload.images.map((e) => e.order);
    if (new Set(orderValues).size !== orderValues.length) {
      this.messageService.warning(
        'Image order values must not contain duplicate integers',
      );
      return;
    }

    const initialProduct = ctx.getState().initialProduct;

    if (initialProduct) {
      this.productService
        .updateProduct(initialProduct.id, action.payload)
        .subscribe({
          next: () => this.store.dispatch(new Navigate(['products'])),
          error: (err: UpdateProductFailure) => {
            switch (err) {
              case 'CATEGORY_NOT_FOUND':
                this.notificationService.error('Error', 'Category not found');
                break;
              case 'PRODUCT_NAME_ALREADY_USED':
                this.notificationService.error(
                  'Error',
                  'Product name is already used',
                );
                break;
              case 'PRODUCT_NOT_FOUND':
                this.notificationService.error('Error', 'Product not found');
                break;
              default:
                this.notificationService.error('Error', 'Unknown error');
                break;
            }
          },
        });
    } else {
      this.productService.createProduct(action.payload).subscribe({
        next: () => this.store.dispatch(new Navigate(['products'])),
        error: (err: CreateProductFailure) => {
          switch (err) {
            case 'IMAGE_FILENAME_NOT_PRESENT':
              this.notificationService.error(
                'Error',
                'Image filename not present',
              );
              break;
            case 'CATEGORY_NOT_FOUND':
              this.notificationService.error(
                'Error',
                'Selected category not found',
              );
              break;
            case 'PRODUCT_NAME_ALREADY_USED':
              this.notificationService.error(
                'Error',
                'Product name is already used',
              );
              break;
            default:
              this.notificationService.error('Error', 'Unknown error');
              break;
          }
        },
      });
    }
  }

  @Action(NewProductInit)
  init(ctx: StateContext<NewProductStateModel>, action: NewProductInit) {
    ctx.patchState({ initialProduct: undefined });

    if (action.payload.productId) {
      this.productService.getProduct(action.payload.productId).subscribe({
        next: (res) => ctx.patchState({ initialProduct: res }),
        error: (error: GetProductFailure) => {
          switch (error) {
            case 'PRODUCT_NOT_FOUND':
              this.notificationService.error('Error', 'Product not found');
              break;
          }
        },
      });
    }

    this.categoryService
      .getAllCategories()
      .subscribe((res) => ctx.patchState({ categories: res }));
  }
}
