import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiModule} from "../api/api.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guard/auth.guard";
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {CoreComponent} from './core.component';
import {SharedModule} from "../shared/shared.module";
import {AuthDataProvider} from "./service/auth.data-provider";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "./interceptor/request.interceptor";
import {JwtTokenInterceptor} from "./interceptor/jwt-token.interceptor";
import {ResponseInterceptor} from "./interceptor/response.interceptor";
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('../features/auth/auth.module').then(f => f.AuthModule)
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'book',
        loadChildren: () => import('../features/book/book.module').then(f => f.BookModule)
      },
      {
        path: 'myBooks',
        loadChildren: () => import('../features/library/library.module').then(f => f.LibraryModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent,
    CoreComponent
  ],
  imports: [
    CommonModule,
    ApiModule.forRoot(),
    SharedModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: true
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    RouterModule,
    CoreComponent
  ],
  providers: [AuthDataProvider]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthDataProvider,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtTokenInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseInterceptor,
          multi: true
        },
      ],
    };
  }
}
