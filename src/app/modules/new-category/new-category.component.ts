import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ActionNewCategory } from './state/new-category.actions';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(512)]],
      description: [''],
    });
  }

  onSavePressed() {
    if (this.form.valid) {
      this.store.dispatch(
        ActionNewCategory.savePressed({
          name: this.form.value.name,
          description: this.form.value.description,
        }),
      );
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
