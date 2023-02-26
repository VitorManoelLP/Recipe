import { Component, AfterViewInit, Injector } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: '[formFieldValidation]',
  template: '{{ error }}',
})
export class FormFieldValidationDirective implements AfterViewInit {
  public error: string = '';
  private inputRef: MatFormFieldControl<MatInput>;
  private lastError: string = '';

  constructor(private injector: Injector) {}

  public ngAfterViewInit(): void {
    const container = this.injector.get(MatFormField);
    this.inputRef = container._control;
    this.inputRef?.ngControl?.statusChanges?.subscribe(this.updateErrors);
  }

  private updateErrors = (state: FormControlStatus): void => {
    if (state === 'INVALID') {
      const controlErrors = this.inputRef?.ngControl?.errors || {};
      const firstError = Object.keys(controlErrors)[0];
      const newError = VALIDATION_MESSAGES[firstError] || '';

      if (this.lastError !== this.error || this.lastError === '') {
        this.error = newError;
      }

    }
  };
}

export const VALIDATION_MESSAGES: Record<string, string> = {
  required: 'Campo obrigatório',
  email: 'E-mail inválido',
  maxlength: 'Limite máximo de caracteres atingido',
  pattern: 'Padrão inválido',
};
