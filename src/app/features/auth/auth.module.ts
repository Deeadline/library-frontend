import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './page/login/login.component';
import {RegisterComponent} from './page/register/register.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule {
}
