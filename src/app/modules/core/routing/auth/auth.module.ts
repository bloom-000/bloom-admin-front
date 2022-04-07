import { NgModule } from '@angular/core';
import { SignInModule } from '../../../sign-in/sign-in.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [SignInModule, AuthRoutingModule],
})
export class AuthModule {}
