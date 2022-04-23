import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ActionSignIn } from './state/sign-in.actions';
import { FormHelper } from '../core/util/form.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly formHelper: FormHelper,
  ) {}

  form!: FormGroup;
  passwordVisible = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(512)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(512),
        ],
      ],
      rememberMe: false,
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.formHelper.markFormGroupDirty(this.form);
      return;
    }

    this.store.dispatch(
      ActionSignIn.signInPressed({
        email: this.form.value.email,
        password: this.form.value.password,
      }),
    );
  }
}
