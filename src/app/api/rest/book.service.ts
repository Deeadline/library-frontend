import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BookInterface} from "../model/book.interface";
import {Observable} from "rxjs";
import {QueryParameterInterface} from "../model/query-parameter.interface";

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

  public getAll(queryParams?: QueryParameterInterface): Observable<BookInterface[]> {
    let params = new HttpParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === 'category' || key === 'releaseDate') {
          value.forEach(v => {
            params = params.append(key, v);
          })
        } else {
          params = params.append(key, value);
        }
      });
    }
    return this.http.get<BookInterface[]>('/api/books', {params});
  }

  public getById(id: number): Observable<BookInterface> {
    return this.http.get<BookInterface>(`/api/books/${id}`);
  }
}
