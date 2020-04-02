import {Component, OnInit} from '@angular/core';
import {AuthDataProvider} from "../../../../core/service/auth.data-provider";
import {LoginInterface} from "../../../../api/model/login.interface";
import {Router} from "@angular/router";
import {RxFormBuilder, RxFormGroup, RxwebValidators} from "@rxweb/reactive-form-validators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: RxFormGroup;
  public loading: boolean = false;

  constructor(
    private fb: RxFormBuilder,
    private authDataProvider: AuthDataProvider,
    private router: Router,
    private sb: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.loginForm = <RxFormGroup>this.fb.group({
      email: [null, RxwebValidators.required()],
      password: [null, RxwebValidators.required()]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authDataProvider.login(this.loginForm.value as LoginInterface)
        .subscribe(
          () => {
          },
          () => {
            this.loading = false;
            this.sb.open('Authentication failed', null, {verticalPosition: 'top', duration: 5000});
          },
          () => {
            this.loading = false;
            this.router.navigate(['/app/book'])
          }
        )
    }
  }

  public register(): void {
    this.router.navigate(['/auth/register']);
  }
}
