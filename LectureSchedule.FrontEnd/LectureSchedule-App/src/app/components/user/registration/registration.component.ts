import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsFields } from '@app/helpers/ValidatorsFields';
import { User } from '@app/models/Identity/User';
import { UserService } from '@app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  dontAgree = true;
  form?: FormGroup;
  get fcontrols() : any { return this.form?.controls;}


  constructor(public fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toaster: ToastrService) { }

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

    cssInvalidClass(formControl: FormControl): any{
      return {'is-invalid': formControl.errors && formControl.touched};
    }

    public register(): void {
      this.user = { ... this.form.value };
      this.userService.register(this.user).subscribe(
        () => {
          this.router.navigateByUrl('/dashboard');
        },
        (error: any) => {
          this.toaster.error(error.error);
        }
      );
    }
  }
