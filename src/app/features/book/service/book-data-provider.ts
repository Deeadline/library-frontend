import {Injectable} from '@angular/core';
import {BookService} from "../../../api/rest/book.service";
import {CategoryService} from "../../../api/rest/category.service";
import {QueryParameterInterface} from "../../../api/model/query-parameter.interface";
import {forkJoin, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {BookModel} from "../model/book.model";
import {CategoryModel} from "../model/category.model";
import {BookInterface} from "../../../api/model/book.interface";

@Injectable()
export class BookDataProvider {

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
  ) {
  }

  public findAll(queryParameter?: QueryParameterInterface): Observable<BookModel[]> {
    return forkJoin([
      this.bookService
        .getAll(queryParameter),
      this.categoryService.getAll()
    ]).pipe(
      map(([books, categories]) => {
        return books.map(b => {
          const book: BookModel = {
            ...b,
            categories: categories.filter(c => b.categoryIds.includes(c.id))
          };
          return book;
        });
      })
    )
  }

  public findById(id: number): Observable<BookModel> {
    return forkJoin([
      this.bookService.getById(id),
      this.categoryService.getAll()
    ]).pipe(
      map(([book, categories]) => {
        return {...book, categories: categories.filter(c => book.categoryIds.includes(c.id))};
      })
    )
  }

  delete(id: number) {
    return this.bookService
      .delete(id);
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.categoryService
      .getAll()
      .pipe(
        map((values) => {
          return values.map(v => ({...v}))
        })
      )
  }

  findAllFromSubject(queryParams$: Subject<QueryParameterInterface>) {
    return queryParams$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((queryParams: QueryParameterInterface) => {
        return this.findAll(queryParams);
      })
    );
  }

  public create(book: BookInterface): Observable<BookInterface> {
    return this.bookService
      .create(book);
  }

  update(book: BookInterface) {
    return this.bookService
      .update(book.id, book);
  }
}
