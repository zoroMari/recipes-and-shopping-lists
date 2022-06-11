import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AlertService {
  private _isActive: boolean = false;
  private _text: string;
  private _timer: any;

  public get isActive(): boolean { return this._isActive; }

  public get text(): string { return this._text; }

  public show(text = 'Your modal'): void {
    if (this._timer) clearTimeout(this._timer);

    this._isActive = true;
    this._text = text;

    this._timer = setTimeout(() => {
      this._isActive = false;
      this._text = undefined;
    }, 2000);
  }

}
