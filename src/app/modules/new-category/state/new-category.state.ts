import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  CategoryService,
  CreateCategoryFailure,
  GetCategoryFailure,
  UpdateCategoryFailure,
} from '../../../data/services/category.service';
import {
  NewCategoryInitialCategoryIdLoaded,
  NewCategorySavePressed,
} from './new-category.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Category } from '../../../data/model/category/category.interface';

interface NewCategoryStateModel {
  initialCategory?: Category;
}

const NEW_CATEGORY_STATE_TOKEN = new StateToken<NewCategoryStateModel>(
  'new_category',
);

@State({
  name: NEW_CATEGORY_STATE_TOKEN,
  defaults: {
    initialCategory: undefined,
  },
})
@Injectable()
export class NewCategoryState {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly store: Store,
    private readonly notificationService: NzNotificationService,
  ) {}

  @Selector([NEW_CATEGORY_STATE_TOKEN])
  static initialCategory(state: NewCategoryStateModel) {
    return state.initialCategory;
  }

  @Action(NewCategorySavePressed)
  async createCategory(
    ctx: StateContext<NewCategoryStateModel>,
    action: NewCategorySavePressed,
  ) {
    const initialCategory = ctx.getState().initialCategory;

    if (initialCategory) {
      this.categoryService
        .updateCategory(initialCategory.id, action.payload)
        .subscribe({
          next: () => this.store.dispatch(new Navigate(['/categories'])),
          error: (err: UpdateCategoryFailure) => {
            switch (err) {
              case 'CATEGORY_NOT_FOUND':
                this.notificationService.error('Error', 'Category not found');
                break;
              default:
                this.notificationService.error(
                  'Error',
                  'Unknown error occurred',
                );
                break;
            }
          },
        });
    } else {
      this.categoryService.createCategory(action.payload).subscribe({
        next: () => this.store.dispatch(new Navigate(['/categories'])),
        error: (err: CreateCategoryFailure) => {
          switch (err) {
            case 'CATEGORY_NAME_ALREADY_USED':
              this.notificationService.error(
                'Error',
                'Category name is already in use',
              );
              break;
            default:
              this.notificationService.error('Error', 'Unknown error occurred');
              break;
          }
        },
      });
    }
  }

  @Action(NewCategoryInitialCategoryIdLoaded)
  async initialCategoryIdLoaded(
    ctx: StateContext<NewCategoryStateModel>,
    action: NewCategoryInitialCategoryIdLoaded,
  ) {
    if (!action.payload.categoryId) {
      return;
    }

    this.categoryService.getCategory(action.payload.categoryId).subscribe({
      next: (res: Category) => ctx.patchState({ initialCategory: res }),
      error: (err: GetCategoryFailure) => {
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
}
