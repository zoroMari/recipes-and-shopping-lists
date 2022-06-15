import { Component, ComponentFactoryResolver, Input, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { ViewContainerDirective } from "../shared/view-container.directive";
import { AuthResponceData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnDestroy{
  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;
  private _closeSub: Subscription;
  @ViewChild(ViewContainerDirective, { static: false }) alertHost: ViewContainerDirective;

  constructor (
    private _authService: AuthService,
    private _router: Router,
    private _componentFactoryResolver: ComponentFactoryResolver,
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
        this._showErrorModal(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  public handleCloseAlert() {
    this.error = null;
  }

  private _showErrorModal(message: string) {
    const alertCompFactory = this._componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewCOntainerRef = this.alertHost.viewContainerRef;
    hostViewCOntainerRef.clear();

    const componentRef = hostViewCOntainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = message;
    this._closeSub = componentRef.instance.onCloseAlert.subscribe(
      () => {
        this._closeSub.unsubscribe();
        hostViewCOntainerRef.clear();
      }
    )
  }

  ngOnDestroy(): void {
      this._closeSub.unsubscribe();
  }
}
