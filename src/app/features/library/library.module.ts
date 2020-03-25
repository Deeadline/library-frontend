import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRoutingModule} from './library-routing.module';
import {BookListComponent} from './page/book-list/book-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [BookListComponent],
  imports: [
    SharedModule,
    LibraryRoutingModule,
  ]
})
export class LibraryModule {
}
