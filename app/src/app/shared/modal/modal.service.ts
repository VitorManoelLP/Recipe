import { ModalData } from './modal-data';
import { ModalComponent } from './modal.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ModalActionsService {

  constructor(private _dialogRef: MatDialog) { }

  public openModal(title: string, message: string, type: 'error' | 'info' | 'success') {
    this._dialogRef.open(ModalComponent, {
      data: {
        title: title,
        message: message,
        type: type
      } as ModalData
    });
  }

}
