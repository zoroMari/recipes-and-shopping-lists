import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModalService {
  public modalDisplay = 'none';
  public deleteData = new Subject<boolean>();

  public openModal() {
    this.modalDisplay = 'block';
  }

  public confirmModal() {
    this.modalDisplay = 'none';
    this.deleteData.next(true);
  }

  public cancelModal() {
    this.modalDisplay = 'none';
    this.deleteData.next(false);
  }

}
