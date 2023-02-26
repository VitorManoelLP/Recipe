import { NgModule } from '@angular/core';
import { FormFieldValidationDirective } from './form-field-validation.directive';

@NgModule({
  declarations: [FormFieldValidationDirective],
  exports: [FormFieldValidationDirective],
})
export class FormFieldValidationModule {}
