import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent {
  @Input() message: string;
  @Output() onCloseAlert = new EventEmitter<void>();

  handleCloseAlert() {
    this.onCloseAlert.emit();
  }
}
