import {Component, OnInit} from '@angular/core';
import {BookModel} from "../../../../core/model/book.model";
import {BookDataProvider} from "../../service/book-data-provider";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../shared/dialog/dialog.component";
import {CategoryModel} from "../../../../core/model/category.model";
import {Subject} from "rxjs";
import {QueryParameterInterface} from "../../../../api/model/query-parameter.interface";
import {FormControl, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, withLatestFrom} from "rxjs/operators";
import {SelectItem} from "primeng/api";
import {ConfirmationDialogComponent} from "../../../../shared/confirmation-dialog/confirmation-dialog.component";
import {LibraryDataProvider} from "../../../../core/service/library.data-provider";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public books: BookModel[] = [];
  public categories: CategoryModel[] = [];
  selectedCategories: CategoryModel[];
  public queryParams = new Subject<QueryParameterInterface>();
  public qp: QueryParameterInterface = {};
  public textInput = new FormControl('', [Validators.minLength(3)]);
  public years: SelectItem[] = Array.from(Array(2020 - 1950), (v, i) => {
    return {
      value: '' + (1950 + i),
      label: '' + (1950 + i)
    }
  });
  public selectedYears: SelectItem[];

  constructor(
    private bookDataProvider: BookDataProvider,
    private libraryDataProvider: LibraryDataProvider,
    private dialog: MatDialog
  ) {

    this.findAll();
    const values = this.textInput.valueChanges;


    const validChange = this.textInput
      .statusChanges.pipe(filter(s => s === 'VALID'));

    const validValues = validChange.pipe(
      withLatestFrom(values),
      map(([valid, value]) => value),
      debounceTime(400),
      distinctUntilChanged()
    );

    validValues.subscribe((value) => {
      this.qp = {...this.qp, title: value, author: value};
      this.queryParams.next(this.qp);
    })
  }

  ngOnInit() {
    this.bookDataProvider.getCategories()
      .subscribe((y) => {
        this.categories = y;
      });
    this.queryParams.next(this.qp);
  }

  private findAll() {
    this.bookDataProvider.findAllFromSubject(this.queryParams)
      .subscribe(x => {
        this.books = x;
      });
  }

  delete(id: number) {
    this.bookDataProvider.delete(id).subscribe(
      () => {
        this.books = this.books.filter(b => b.id !== id)
      }
    )
  }

  onHide() {
    if (this.selectedCategories) {
      this.qp = {...this.qp, category: this.selectedCategories.map(sc => sc.name)};
      this.queryParams.next(this.qp);
    }
  }

  onYearHide() {
    if (this.selectedYears) {
      this.qp = {...this.qp, releaseDate: this.selectedYears.map(sy => sy.value)};
      this.queryParams.next(this.qp);
    }
  }

  loanBook(book: BookModel) {
    const confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: book
    });
    confirmationDialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
        this.libraryDataProvider.loanBook(book.id)
          .subscribe(x => {
            const indexOf = this.books.indexOf(book);
            this.books[indexOf].loaned = true;
          })
      }
    })
  }
}
