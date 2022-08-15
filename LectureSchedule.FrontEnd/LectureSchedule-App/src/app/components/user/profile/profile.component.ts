import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsFields } from '@app/helpers/ValidatorsFields';
import { UserUpdate } from '@app/models/Identity/UserUpdate';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userUpdate = {} as UserUpdate;
  form?: FormGroup;
  get fcontrols() : any { return this.form?.controls;}

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.validate();
    this.loadUser();
  }

  private loadUser(): void {
    this.userService.getUser().subscribe(
      (userResponse: UserUpdate) => {
        console.log(userResponse);
        this.userUpdate = userResponse;
        this.form.patchValue(this.userUpdate);
        this.toaster.success('User has been loaded', 'Oh yeeeeah');
      },
      (error: any) => {
        console.error(error);
        this.toaster.error('Unable to load user','Oh no!');
        this.router.navigateByUrl('/dashboard');
      }
    ).add(() => this.spinner.hide());
  }

  onSubmit() {
    this.updateUser();
  }

  updateUser(): void{
    this.userUpdate = { ...this.form.value };
    this.spinner.show();
    this.userService.updateUser(this.userUpdate).subscribe(
      () => this.toaster.success('User has been updated', 'Success!'),
      (error: any) => {
        this.toaster.error(error.error);
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  validate(): void{
    const formOptions : AbstractControlOptions = {
      validators: ValidatorsFields.MustMatch('password','confirmPassword')
    };

    this.form = this.fb.group(
      {
        userName:[''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        graduation: ['None', Validators.required],
        userFunction: ['Undefined', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
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
