import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookInterface} from "../model/book.interface";
import {AvailableInterface} from "../model/available.interface";
import {CommentInterface} from "../model/comment.interface";

@Injectable()
export class LibraryService {

  constructor(private http: HttpClient) {
  }

  public getMyBooks(): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>('/api/library/myBooks');
  }

  public checkAvailability(bookId: number): Observable<AvailableInterface> {
    return this.http.get<AvailableInterface>(`/api/library/availability/${bookId}`);
  }

  public reserve(bookId: number): Observable<BookInterface> {
    return this.http.post<BookInterface>('/api/library/reserve', {bookId});
  }

  public returnBook(bookId: number): Observable<BookInterface> {
    return this.http.put<BookInterface>('/api/library/returnBook', {bookId});
  }

  public commentBook(request: CommentInterface): Observable<BookInterface> {
    return this.http.put<BookInterface>('/api/library/commentBook', request);
  }
}
