import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInterface} from "../model/category.interface";

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>('/api/categories');
  }
}
