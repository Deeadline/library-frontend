import {Component, OnInit} from '@angular/core';
import {BookDataProvider} from "../../service/book-data-provider";
import {ActivatedRoute} from "@angular/router";
import {BookModel} from "../../../../core/model/book.model";
import {AuthDataProvider} from "../../../../core/service/auth.data-provider";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LibraryDataProvider} from "../../../../core/service/library.data-provider";
import {CommentInterface} from "../../../../api/model/comment.interface";
import {MyErrorStateMatcher} from "../../../../core/utils/errors.helper";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  public book: BookModel;
  public loading = true;
  public currentUserName: string;
  formGroup: FormGroup;
  stateMatcher = new MyErrorStateMatcher();

  constructor(
    private authDataProvider: AuthDataProvider,
    private dataProvider: BookDataProvider,
    private libraryDataProvider: LibraryDataProvider,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataProvider.findById(+id)
        .subscribe((book: BookModel) => {
          this.book = book;
          this.currentUserName = this.authDataProvider.currentUsername;
          this.loading = false;
          this.formGroup = this.formBuilder.group({
            bookId: [this.book.id],
            username: [this.currentUserName],
            comment: [null, [Validators.required, Validators.maxLength(200)]]
          });
        })
    }
  }

  public get isUserCommentedBook() {
    const userNames = this.comments.map(c => c.username);
    return userNames.includes(this.currentUserName);
  }

  addComment() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.libraryDataProvider.addComment(this.formGroup.value as CommentInterface)
        .subscribe(x => {
          this.book.comments = x.comments;
          this.loading = false;
        })
    }
  }

  get comments() {
    return this.book.comments.filter(c => c.comment !== null)
  }
}
