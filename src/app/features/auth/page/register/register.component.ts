import {Component, OnInit} from '@angular/core';
import {AuthDataProvider} from "../../../../core/service/auth.data-provider";
import {RegisterInterface} from "../../../../api/model/register.interface";
import {Router} from "@angular/router";
import {RxFormBuilder, RxFormGroup, RxwebValidators} from "@rxweb/reactive-form-validators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: RxFormGroup;
  public loading: boolean = false;

  constructor(
    private fb: RxFormBuilder,
    private authDataProvider: AuthDataProvider,
    private router: Router,
    private sb: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.registerForm = <RxFormGroup>this.fb.group({
      username: [null, RxwebValidators.required()],
      password: [null, [RxwebValidators.required(), RxwebValidators.password({
        validation: {
          minLength: 6,
          maxLength: 30,
          digit: true,
          specialCharacter: true
        }
      })]],
      repeatPassword: [null, [RxwebValidators.required(), RxwebValidators.compare({fieldName: 'password'})]],
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = false;
      this.authDataProvider.register(this.registerForm.value as RegisterInterface)
        .subscribe(
          () => {
          },
          (e: HttpErrorResponse) => {
            this.loading = false;
            this.sb.open(e.error, null, {verticalPosition: 'top', duration: 5000});
          },
          () => {
            this.router.navigate(['/app/book'])
          }
        )
    }
  }
}
