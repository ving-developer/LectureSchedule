import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorsFields {
  static MustMatch(controlName: string, matchingString: string) : any{
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingString];

      if(!matchingControl.errors){
        if (control.value !== matchingControl.value){
          matchingControl.setErrors({mustMatch : true})
        } else {
          matchingControl.setErrors(null);
        }
      }
      return null;
    };
  }
}
