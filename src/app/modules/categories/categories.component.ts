import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActionCategories } from './state/categories.actions';
import { CategoriesState } from './state/categories.state';
import { Observable } from 'rxjs';
import { DataPage } from '../../data/model/common/data-page.interface';
import { Category } from '../../data/model/category/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(CategoriesState.categories) categories$!: Observable<
    DataPage<Category>
  >;
  @Select(CategoriesState.pageSize) pageSize$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(ActionCategories.initialLoadRequested());
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionCategories.pageChanged({ page }));
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionCategories.pageSizeChanged({ pageSize }));
  }

  onUpdateCategoryPressed(category: Category) {
    this.store.dispatch(ActionCategories.updatePressed(category));
  }

  onDeleteCategoryPressed(category: Category) {
    this.store.dispatch(ActionCategories.deletePressed(category));
  }
}
