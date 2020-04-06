import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInterface} from "../model/category.interface";
import {shareReplay} from "rxjs/operators";

@Injectable()
export class CategoryService {

  public cache$: Observable<CategoryInterface[]>;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<CategoryInterface[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<CategoryInterface[]>('/api/categories')
        .pipe(
          shareReplay(1)
        );
    }
    return this.cache$;
  }
}
