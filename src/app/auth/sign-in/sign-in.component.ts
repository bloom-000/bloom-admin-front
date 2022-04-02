import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {}

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
    if (this.form.valid) {
      console.log('submit', this.form.value);
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
