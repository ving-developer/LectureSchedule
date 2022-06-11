import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsFields } from '@app/helpers/ValidatorsFields';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public dontAgree = true;
  form?: FormGroup;
  get fcontrols() : any { return this.form?.controls;}


  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.validate();
  }

  public validate(){
    const formOptions : AbstractControlOptions = {
      validators: ValidatorsFields.MustMatch('password','confirmPassword')
    };

    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      formOptions);
    }

    public controlAgreement(): void{
      this.dontAgree = !this.dontAgree;
    }
  }
