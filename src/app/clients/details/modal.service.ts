import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;

  private _notificationUpload = new EventEmitter<any>();

  constructor() {
  }

  get notificationUpload(): EventEmitter<any> {
    return this._notificationUpload;
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
