import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookInterface} from "../model/book.interface";
import {Observable} from "rxjs";

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {
  }

  public create(request: BookInterface): Observable<BookInterface> {
    return this.http.post<BookInterface>('/api/books', request);
  }

  public update(id: number, request: BookInterface): Observable<BookInterface> {
    return this.http.put<BookInterface>(`/api/books/${id}`, request);
  }

  public delete(id: number): Observable<{}> {
    return this.http.delete(`/api/books/${id}`);
  }

  public getAll(queryParams): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>('/api/books', {params: queryParams})
  }

  public getById(id: number): Observable<BookInterface> {
    return this.http.get<BookInterface>(`/api/books/${id}`);
  }
}
