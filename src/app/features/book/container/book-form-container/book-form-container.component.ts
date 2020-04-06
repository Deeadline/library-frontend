import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from "../../model/category.model";
import {BookInterface} from "../../../../api/model/book.interface";
import {BookModel} from "../../model/book.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-form-container',
  templateUrl: './book-form-container.component.html',
  styleUrls: ['./book-form-container.component.scss']
})
export class BookFormContainerComponent implements OnInit {

  @Input()
  get categories() {
    return this._categories;
  }

  set categories(value: CategoryModel[]) {
    this._categories = value;
  }

  private _categories: CategoryModel[] = [];

  @Input()
  get model() {
    return this._model;
  }

  set model(value: BookModel) {
    if (value) {
      this._model = value;
      this.patchForm();
    }
  }

  private _model: BookModel;

  @Output() submitEvent = new EventEmitter<BookInterface>();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: [null],
      title: [null, [Validators.required]],
      isbn: [null, [Validators.required, Validators.maxLength(13)]],
      author: [null, [Validators.required, Validators.maxLength(30)]],
      publishingHouse: [null, [Validators.required, Validators.maxLength(30)]],
      releaseDate: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      categories: [[], [Validators.required]]
    })
  }

  submit() {
    if (this.form.valid) {
      this.submitEvent.emit()
    }
  }

  private patchForm() {
    if (this.form) {
      this.form.patchValue(this.model);
    }
  }

}
