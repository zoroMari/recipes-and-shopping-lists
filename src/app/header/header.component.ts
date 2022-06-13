import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  private _userSub: Subscription;
  public isAuthenticated = false;

  constructor(
    private _authService: AuthService,
  ) {}

  ngOnInit() {
    this._userSub = this._authService.user.subscribe( user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
      this._userSub.unsubscribe();
  }
}
