import {Component, OnInit} from '@angular/core';
import {LibraryDataProvider} from "../../../../core/service/library.data-provider";
import {BookModel} from "../../../../core/model/book.model";
import {ConfirmationDialogComponent} from "../../../../shared/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public columns = ['title', 'author', 'isbn', 'releaseDate', 'publishingHouse', 'categories', 'action'];
  public myBooks: BookModel[] = [];

  constructor(
    private libraryDataProvider: LibraryDataProvider,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.libraryDataProvider.findAll()
      .subscribe(myBooks => this.myBooks = myBooks);
  }

  returnBook(book: BookModel) {
    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: book
    });
    confirmationDialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
        this.libraryDataProvider.returnBook(book.id)
          .subscribe(x => {
            const indexOf = this.myBooks.indexOf(book);
            this.myBooks[indexOf].loaned = false;
          })
      }
    })
  }
}
