import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalExceptionHandlerComponent } from './handler.component';
import { GlobalExceptionHandler } from './exception-handler';
import { ModalModule } from '../modal/modal.module';
import { ModalActionsService } from '../modal/modal.service';

@NgModule({
  declarations: [GlobalExceptionHandlerComponent],
  imports: [CommonModule, ModalModule],
  exports: [GlobalExceptionHandlerComponent],
  providers: [GlobalExceptionHandler, ModalActionsService]
})
export class HandlerModule { }
