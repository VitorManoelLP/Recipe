import { ModalData } from './modal-data';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private _dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: ModalData) {}

  public onClose(): void {
    this._dialogRef.closeAll();
  }

}
