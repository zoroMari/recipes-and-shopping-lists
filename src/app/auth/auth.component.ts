import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponceData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;

  constructor (
    private _authService: AuthService,
    private _router: Router,
  ) {}

  public handleSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public handleSubmitForm(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponceData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this._router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  public handleCloseAlert() {
    this.error = null;
  }

}
