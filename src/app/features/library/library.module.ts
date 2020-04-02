import {NgModule} from '@angular/core';

import {LibraryRoutingModule} from './library-routing.module';
import {BookListComponent} from './page/book-list/book-list.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [BookListComponent],
  imports: [
    SharedModule,
    LibraryRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class LibraryModule {
}
