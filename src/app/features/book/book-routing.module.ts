import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from "./page/book-list/book-list.component";
import {BookCreateComponent} from "./page/book-create/book-create.component";
import {BookEditComponent} from "./page/book-edit/book-edit.component";
import {BookDetailComponent} from "./page/book-detail/book-detail.component";


const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    data: {
      roles: ['ROLE_ADMINISTRATOR', 'ROLE_USER']
    }
  },
  {
    path: 'create',
    component: BookCreateComponent,
    data: {
      roles: ['ROLE_ADMINISTRATOR']
    }
  },
  {
    path: 'edit/:id',
    component: BookEditComponent,
    data: {
      roles: ['ROLE_ADMINISTRATOR']
    }
  },
  {
    path: 'detail/:id',
    component: BookDetailComponent,
    data: {
      roles: ['ROLE_ADMINISTRATOR', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
