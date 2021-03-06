import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AlertService } from './shared/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    public readonly alertService: AlertService,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this._authService.autoLogin();
  }



}
