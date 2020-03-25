import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {RouterModule, Routes} from "@angular/router";
import {AppLayoutComponent} from "./core/layout/app-layout/app-layout.component";
import {NotFoundComponent} from "./core/page/not-found/not-found.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '**',
    component: AppLayoutComponent,
    children: [
      {
        component: NotFoundComponent,
        path: ''
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes, {useHash: true}),
    CoreModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
