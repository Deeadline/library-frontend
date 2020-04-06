import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from "./page/book-list/book-list.component";


const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    data: {
      roles: ['ROLE_ADMINISTRATOR', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {
}
