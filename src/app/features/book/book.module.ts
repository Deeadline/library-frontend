import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookRoutingModule} from './book-routing.module';
import {BookListComponent} from './page/book-list/book-list.component';
import {BookCreateComponent} from './page/book-create/book-create.component';
import {BookEditComponent} from './page/book-edit/book-edit.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookEditComponent],
  imports: [
    SharedModule,
    BookRoutingModule,
  ]
})
export class BookModule {
}
