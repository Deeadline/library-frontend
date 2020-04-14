import {Injectable} from '@angular/core';
import {LibraryService} from "../../api/rest/library.service";
import {CommentInterface} from "../../api/model/comment.interface";
import {map} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";
import {CategoryService} from "../../api/rest/category.service";
import {BookModel} from "../model/book.model";

@Injectable()
export class LibraryDataProvider {

  constructor(
    private libraryService: LibraryService,
    private categoryService: CategoryService
  ) {
  }

  loanBook(id: number) {
    return this.libraryService
      .reserve(id);
  }

  addComment(request: CommentInterface) {
    return this.libraryService
      .commentBook(request);
  }

  findAll(): Observable<BookModel[]> {
    return forkJoin([
      this.libraryService.getMyBooks(),
      this.categoryService.getAll()
    ]).pipe(
      map(([books, categories]) => {
        return books.map(book => ({
          ...book,
          categories: categories.filter(c => book.categoryIds.includes(c.id))
        }))
      })
    )
  }

  returnBook(id: number) {
    return this.libraryService.returnBook(id);
  }
}
