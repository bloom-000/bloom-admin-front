import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../data/services/auth.service';
import { SignInState } from './state/sign-in.state';
import { SignInComponent } from './sign-in.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [SignInComponent],
  providers: [AuthService],
  imports: [
    NgxsModule.forFeature([SignInState]),
    CommonModule,
    HttpClientModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzNotificationModule,
  ],
})
export class SignInModule {}
