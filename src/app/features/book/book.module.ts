import {NgModule} from '@angular/core';

import {BookRoutingModule} from './book-routing.module';
import {BookListComponent} from './page/book-list/book-list.component';
import {BookCreateComponent} from './page/book-create/book-create.component';
import {BookEditComponent} from './page/book-edit/book-edit.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {BookDataProvider} from "./service/book-data-provider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookFormComponent} from './component/book-form/book-form.component';
import {BookFormContainerComponent} from './container/book-form-container/book-form-container.component';


@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookEditComponent, BookFormComponent, BookFormContainerComponent],
  imports: [
    SharedModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    BookDataProvider
  ],
  exports: [
    RouterModule
  ]
})
export class BookModule {
}
