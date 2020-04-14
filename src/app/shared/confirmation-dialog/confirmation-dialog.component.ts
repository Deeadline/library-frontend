import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BookModel} from "../../core/model/book.model";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: BookModel
  ) {
  }

  ngOnInit(): void {
  }

}
