import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModalService {
  public modalDisplay = 'none';
  public deleteData = new Subject<boolean>();

  openModal() {
    this.modalDisplay = 'block';
  }

  confirmModal() {
    this.modalDisplay = 'none';
    this.deleteData.next(true);
  }

  cancelModal() {
    this.modalDisplay = 'none';
    this.deleteData.next(false);
  }

}
