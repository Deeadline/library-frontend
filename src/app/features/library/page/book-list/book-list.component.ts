import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BookListDataSource, BookListItem} from './book-list-datasource';
import {LibraryDataProvider} from "../../../../core/service/library.data-provider";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(
    private libraryDataProvider: LibraryDataProvider
  ) {
  }

  ngOnInit() {
    this.libraryDataProvider.findAll()
      .subscribe(x => console.log(x))
  }
}
