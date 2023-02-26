import { GlobalExceptionHandler } from './exception-handler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalActionsService } from '../modal/modal.service';

@Component({
  selector: 'global-exception-handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.css']
})
export class GlobalExceptionHandlerComponent {

  errorOccurence: boolean = false;
  errorMessage: string = '';

  constructor(public dialogRef: MatDialog, private _exceptionHandler: GlobalExceptionHandler, private modalActions: ModalActionsService) {
    this.listenErrors();
  }

  private listenErrors(): void {
    this._exceptionHandler.listenEvent().subscribe(this.openModalWithExceptionValues);
  }

  private openModalWithExceptionValues = (errorMessage: string) => this.modalActions.openModal('Oops, algo deu errado!', errorMessage, 'error');
}
