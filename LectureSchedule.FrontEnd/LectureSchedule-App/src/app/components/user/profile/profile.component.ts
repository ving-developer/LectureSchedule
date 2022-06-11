import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsFields } from '@app/helpers/ValidatorsFields';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form?: FormGroup;
  get fcontrols() : any { return this.form?.controls;}

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.validate();
  }

  onSubmit() {
    if(this.form?.invalid)
      return;
  }

  validate(): void{
    const formOptions : AbstractControlOptions = {
      validators: ValidatorsFields.MustMatch('password','confirmPassword')
    };

    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        title: ['', Validators.required],
        function: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        description: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, formOptions);
    }

    resetForm(event: any){
      event.preventDefault();
      this.form?.reset();
    }

    cssInvalidClass(formControl: FormControl): any{
      return {'is-invalid': formControl.errors && formControl.touched};
    }
  }
