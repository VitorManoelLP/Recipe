import { Component, AfterViewInit, Injector } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: '[formFieldValidation]',
  template: '{{ error }}',
})
export class FormFieldValidationDirective implements AfterViewInit {
  public error = '';
  private inputRef: MatFormFieldControl<MatInput>;

  constructor(private _inj: Injector) {}

  public ngAfterViewInit(): void {
    const container = this._inj.get(MatFormField);
    this.inputRef = container._control;
    this.inputRef?.ngControl?.statusChanges?.subscribe(this.updateErrors);
  }

  private updateErrors = (state: 'VALID' | 'INVALID'): void => {
    if (state === 'INVALID') {
      const controlErrors = this.inputRef?.ngControl?.errors || [];
      const firstError = Object.keys(controlErrors)[0];
      this.error = VALIDATION_MESSAGES[firstError] || '';
    }
  };
}

export const VALIDATION_MESSAGES: any = {
  required: 'Campo obrigatório',
  email: 'E-mail inválido',
  maxlength: 'Limite máximo de caracteres atingido',
  pattern: 'Padrão inválido',
};
