import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "./auth-routing.module";
import {CommonModule} from "@angular/common";
import {SignInComponent} from "./sign-in/sign-in.component";

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
})
export class AuthModule {}
