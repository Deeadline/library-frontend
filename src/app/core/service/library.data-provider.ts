import {Injectable} from '@angular/core';
import {LibraryService} from "../../api/rest/library.service";
import {CommentInterface} from "../../api/model/comment.interface";

@Injectable()
export class LibraryDataProvider {

  constructor(
    private libraryService: LibraryService
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
}
