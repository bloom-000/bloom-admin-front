import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormHelper {
  markFormGroupDirty(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormArray) {
        this.markFormArrayDirty(control);
      } else if (control instanceof FormGroup) {
        this.markFormGroupDirty(control);
      } else {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
    });
  }

  markFormArrayDirty(formArray: FormArray): void {
    formArray.controls.forEach((control) => {
      if (control instanceof FormArray) {
        this.markFormArrayDirty(control);
      } else if (control instanceof FormGroup) {
        this.markFormGroupDirty(control);
      } else {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
    });
  }
}
