import { Action, State } from '@ngxs/store';
import {
  AuthService,
  SignInFailure,
} from '../../../data/services/auth.service';
import { ActionContext } from '@ngxs/store/src/actions-stream';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInSignInPressed } from './sign-in.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@State({
  name: 'sign_in',
})
@Injectable()
export class SignInState {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NzNotificationService,
  ) {}

  @Action(SignInSignInPressed)
  async signIn(ctx: ActionContext, action: SignInSignInPressed) {
    this.authService.signIn(action.payload).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: SignInFailure) => {
        switch (err) {
          case 'EMAIL_OR_PASSWORD_INVALID':
            this.notificationService.error(
              'Authentication Error',
              'Invalid email or password',
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
