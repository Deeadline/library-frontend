import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./rest/auth.service";
import {BookService} from "./rest/book.service";
import {CategoryService} from "./rest/category.service";
import {LibraryService} from "./rest/library.service";


@NgModule({
  declarations: [],
  providers: [
    AuthService,
    BookService,
    CategoryService,
    LibraryService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ApiModule {
  constructor(@Optional() @SkipSelf() parentModule: ApiModule) {
    if (parentModule) {
      throw new Error('Api module is already loaded!');
    }
  }

  public static forRoot(): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        AuthService,
        BookService,
        CategoryService,
        LibraryService
      ]
    }
  }
}
