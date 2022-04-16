import { Action, State } from '@ngxs/store';
import { ActionContext } from '@ngxs/store/src/actions-stream';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  CategoryService,
  CreateCategoryFailure,
} from '../../../data/services/category.service';
import { NewCategorySavePressed } from './new-category.actions';

@State({ name: 'new_category' })
@Injectable()
export class NewCategoryState {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly notificationService: NzNotificationService,
  ) {}

  @Action(NewCategorySavePressed)
  async createCategory(ctx: ActionContext, action: NewCategorySavePressed) {
    this.categoryService.createCategory(action.payload).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: (err: CreateCategoryFailure) => {
        switch (err) {
          case 'CATEGORY_NAME_ALREADY_USED':
            this.notificationService.error(
              'Error',
              'Category name is already in use',
            );
            break;
        }
      },
    });
  }
}
