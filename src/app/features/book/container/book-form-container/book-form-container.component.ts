import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from "../../model/category.model";
import {BookInterface} from "../../../../api/model/book.interface";
import {BookModel} from "../../model/book.model";
import {MyErrorStateMatcher} from "../../../../core/utils/errors.helper";
import {NumericValueType, RxFormBuilder, RxFormGroup, RxwebValidators} from "@rxweb/reactive-form-validators";

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
    this._model = value;
  }

  private _model: BookModel;

  @Output() submitEvent = new EventEmitter<BookInterface>();

  public form: RxFormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private fb: RxFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = <RxFormGroup>this.fb.group({
      id: [null],
      title: [null, [RxwebValidators.required({message: 'Title is required'})]],
      isbn: [null, [
        RxwebValidators.required({message: 'Title is required'}),
        RxwebValidators.maxLength({value: 13, message: 'Maximum 13 characters'})
      ]],
      author: [null, [
        RxwebValidators.required({message: 'Author is required'}),
        RxwebValidators.maxLength({value: 13, message: 'Maximum 13 characters'})
      ]],
      publishingHouse: [null, [
        RxwebValidators.required({message: 'Publishing house is required'}),
        RxwebValidators.maxLength({value: 13, message: 'Maximum 13 characters'})
      ]],
      releaseDate: [null, [
        RxwebValidators.required({message: 'Release date is required'}),
        RxwebValidators.minLength({value: 4, message: 'Exactly 4 characters'}),
        RxwebValidators.maxLength({value: 4, message: 'Exactly 4 characters'}),
        RxwebValidators.numeric(
          {message: 'Release date should be number', acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})
      ]],
      categories: [null, [RxwebValidators.required({message: 'Category is required'}),]]
    });
    this.patchForm();
  }

  submit() {
    if (this.form.valid) {
      const model = this.form.value as BookModel;
      const parsedModel: BookInterface = {...model, categoryIds: model.categories.map(c => c.id)};
      this.submitEvent.emit(parsedModel);
    }
  }

  private patchForm() {
    if (this.form && this.model) {
      this.form.patchModelValue(this.model);
    }
  }

  isCategoriesSelectorChanged(control) {
    return control.dirty || control.touched;
  }

}
