import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
  ],
})
export class AuthModule {}
