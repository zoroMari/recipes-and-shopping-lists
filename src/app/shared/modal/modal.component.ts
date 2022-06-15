import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  @Input() title: string;
  @Input() message: string;
  @Output() deleteData = new EventEmitter<boolean>();

  public handleConfirmModal() {
    this.deleteData.emit(true);
  }

  public handleCancelModal() {
    this.deleteData.emit(false);
  }
}
