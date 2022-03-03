import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
  static requiredForBagCategory(control: AbstractControl): ValidationErrors | null {
    if (control.get('category')?.value === 'Bag')
      return { required: true };
    return null;
  }

  static requiredForShoes(control: AbstractControl): ValidationErrors | null {
    if (control.get('category')?.value === 'Shoes')
      return { required: true };
    return null;
  }

}