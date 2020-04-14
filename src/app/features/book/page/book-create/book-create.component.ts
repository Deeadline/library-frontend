import {Component, OnInit} from '@angular/core';
import {BookDataProvider} from "../../service/book-data-provider";
import {CategoryModel} from "../../../../core/model/category.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookInterface} from "../../../../api/model/book.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  public loading = true;
  public categories: CategoryModel[] = [];

  constructor(
    private dataProvider: BookDataProvider,
    private router: Router,
    private sb: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.dataProvider.getCategories()
      .subscribe(cat => {
        this.categories = cat;
        this.loading = false;
      })
  }

  onSubmit(book: BookInterface) {
    this.loading = true;
    this.dataProvider
      .create(book)
      .subscribe(
        () => {
        },
        (e: HttpErrorResponse) => {
          this.loading = false;
          this.sb.open(e.error, null, {verticalPosition: 'top', duration: 5000});
        },
        () => {
          this.loading = false;
          this.sb.open('Book successfully added', null, {verticalPosition: 'top', duration: 5000});
          this.router.navigate(['/app/book'])
        })
  }

}
