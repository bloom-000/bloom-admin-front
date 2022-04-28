import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActionNewCategory } from './state/new-category.actions';
import { ActivatedRoute } from '@angular/router';
import { NewCategoryState } from './state/new-category.state';
import { Observable } from 'rxjs';
import { Category } from '../../data/model/category/category.interface';
import { FormHelper } from '../core/util/form.helper';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly formHelper: FormHelper,
  ) {}

  @Select(NewCategoryState.initialCategory)
  initialCategory$!: Observable<Category>;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(512)]],
      description: [''],
    });

    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];

      this.store.dispatch(
        ActionNewCategory.initialCategoryIdLoaded({ categoryId }),
      );
    });

    this.initialCategory$.subscribe((initialCategory) =>
      this.form.patchValue({
        name: initialCategory?.name,
        description: initialCategory?.description,
      }),
    );
  }

  onSavePressed() {
    if (this.form.invalid) {
      this.formHelper.markFormGroupDirty(this.form);
      return;
    }

    this.store.dispatch(
      ActionNewCategory.savePressed({
        name: this.form.value.name,
        description: this.form.value.description,
      }),
    );
  }
}
