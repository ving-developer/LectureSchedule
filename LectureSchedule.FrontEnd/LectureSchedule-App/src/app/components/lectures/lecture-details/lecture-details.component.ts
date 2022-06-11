import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lecture-details',
  templateUrl: './lecture-details.component.html',
  styleUrls: ['./lecture-details.component.scss']
})
export class LectureDetailsComponent implements OnInit {
  form?: FormGroup

  get f(): any{
    return this.form?.controls
  }

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = this.builder.group({
      theme : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      date : ['', Validators.required],
      maxPeopleSupported : ['', [Validators.required, Validators.max(120000)]],
      adress : ['', Validators.required],
      imageUrl : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phone : ['', Validators.required],
    });
  }

  public resetForm(){
    this.form?.reset();
  }

  cssInvalidClass(prop: FormControl): any {
    return { 'is-invalid': prop.errors && prop.touched };
  }
}
