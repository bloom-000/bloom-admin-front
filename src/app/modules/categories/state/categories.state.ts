import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  CategoryService,
  DeleteCategoryFailure,
} from '../../../data/services/category.service';
import {
  CategoriesDeletePressed,
  CategoriesInitialLoadRequested,
  CategoriesPageChanged,
  CategoriesPageSizeChanged,
  CategoriesUpdatePressed,
} from './categories.actions';
import { DataPage } from '../../../data/model/common/data-page.interface';
import { Category } from '../../../data/model/category/category.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Navigate } from '@ngxs/router-plugin';

interface CategoriesStateModel {
  categories: DataPage<Category>;
  pageSize: number;
}

const CATEGORIES_STATE_TOKEN = new StateToken<CategoriesStateModel>(
  'categories',
);

@State<CategoriesStateModel>({
  name: CATEGORIES_STATE_TOKEN,
  defaults: {
    categories: { data: [], total: 0 },
    pageSize: 10,
  },
})
@Injectable()
export class CategoriesState {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly store: Store,
    private readonly notificationService: NzNotificationService,
  ) {}

  private currentPage = 1;

  @Selector([CATEGORIES_STATE_TOKEN])
  static categories(state: CategoriesStateModel) {
    return state.categories;
  }

  @Selector([CATEGORIES_STATE_TOKEN])
  static pageSize(state: CategoriesStateModel) {
    return state.pageSize;
  }

  @Action(CategoriesInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<CategoriesStateModel>) {
    this.categoryService
      .getCategories(this.currentPage, ctx.getState().pageSize)
      .subscribe((res) => ctx?.patchState({ categories: res }));
  }

  @Action(CategoriesPageSizeChanged)
  async pageSizeChanged(
    ctx: StateContext<CategoriesStateModel>,
    action: CategoriesPageSizeChanged,
  ) {
    this.currentPage = 1;

    this.categoryService
      .getCategories(1, action.payload.pageSize)
      .subscribe((res) =>
        ctx?.patchState({ categories: res, pageSize: action.payload.pageSize }),
      );
  }

  @Action(CategoriesUpdatePressed)
  async categoryUpdatePressed(
    ctx: StateContext<CategoriesStateModel>,
    action: CategoriesUpdatePressed,
  ) {
    this.store.dispatch(
      new Navigate(['/categories/new'], {
        categoryId: action.payload.id,
      }),
    );
  }

  @Action(CategoriesDeletePressed)
  async categoryDeletePressed(
    ctx: StateContext<CategoriesStateModel>,
    action: CategoriesDeletePressed,
  ) {
    this.categoryService.deleteCategory(action.payload.id).subscribe({
      next: () => {
        const categories = ctx.getState().categories;
        const newCategories = categories.data.filter(
          (e) => e.id !== action.payload.id,
        );

        ctx?.patchState({
          categories: {
            data: newCategories,
            total: categories.total - 1,
          },
        });
      },
      error: (err: DeleteCategoryFailure) => {
        switch (err) {
          case 'CATEGORY_NOT_FOUND':
            this.notificationService.error('Error', 'Category not found');
            break;
          default:
            this.notificationService.error('Error', 'Unknown error occurred');
            break;
        }
      },
    });
  }

  @Action(CategoriesPageChanged)
  async pageChanged(
    ctx: StateContext<CategoriesStateModel>,
    action: CategoriesPageChanged,
  ) {
    this.categoryService
      .getCategories(action.payload.page, ctx.getState().pageSize)
      .subscribe((res) => {
        this.currentPage = action.payload.page;
        ctx?.patchState({ categories: res });
      });
  }
}
