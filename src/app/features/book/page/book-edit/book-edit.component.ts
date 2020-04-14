import {Component, OnInit} from '@angular/core';
import {BookDataProvider} from "../../service/book-data-provider";
import {ActivatedRoute, Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {BookInterface} from "../../../../api/model/book.interface";
import {CategoryModel} from "../../../../core/model/category.model";
import {BookModel} from "../../../../core/model/book.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  public loading = true;
  public model: BookModel = {} as BookModel;
  public categories: CategoryModel[] = [];

  constructor(
    private dataProvider: BookDataProvider,
    private route: ActivatedRoute,
    private router: Router,
    private sb: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      forkJoin([
        this.dataProvider.findById(+id),
        this.dataProvider.getCategories()
      ]).subscribe(([model, categories]) => {
        this.model = model;
        this.categories = categories;
        this.loading = false;
      })
    }
  }

  onSubmit(book: BookInterface) {
    this.loading = true;
    this.dataProvider
      .update(book)
      .subscribe(
        () => {
        },
        (e: HttpErrorResponse) => {
          this.loading = false;
          this.sb.open(e.error, null, {verticalPosition: 'top', duration: 5000});
        },
        () => {
          this.loading = false;
          this.sb.open('Book successfully modified', null, {verticalPosition: 'top', duration: 5000});
          this.router.navigate(['/app/book'])
        })
  }

}
