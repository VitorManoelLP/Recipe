import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sameValue(field: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlMatch = control.root.get(field);
    if (controlMatch && controlMatch.value !== control.value) {
      return { sameValue: true, message: 'Campo não correspondido' };
    }
    return null;
  };
}
