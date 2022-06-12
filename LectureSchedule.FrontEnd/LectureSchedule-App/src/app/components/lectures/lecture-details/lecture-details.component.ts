import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Lecture } from '@app/models/Lecture';
import { LectureService } from '@app/services/lecture.service';
import { Constants } from '@app/utils/constants';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lecture-details',
  templateUrl: './lecture-details.component.html',
  styleUrls: ['./lecture-details.component.scss']
})
export class LectureDetailsComponent implements OnInit {
  form?: FormGroup
  lecture = {} as Lecture
  saveState = 'post'

  get f(): any{
    return this.form?.controls
  }

  get bsConfig(): any{
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm A',
      containerClass: 'theme-green'
    };
  }

  constructor(
    private builder: FormBuilder,
    private router: ActivatedRoute,
    private lectureService: LectureService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadLecture();
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

  loadLecture(): void {
    const lectureIdParam = this.router.snapshot.paramMap.get('id');
    if(lectureIdParam){
      this.saveState = 'put';
      this.spinner.show();
      this.lectureService.getLectureById(+lectureIdParam).subscribe({
        next: (lecture: Lecture) => {
          this.lecture = {...lecture};
          this.form?.patchValue(this.lecture);
        },
        error: () => {
          this.spinner.hide();
          this.toastr.error('Can\'t find this lecture.', 'Oh no!');
        },
        complete: () => this.spinner.hide(),
      });
    }
  }

  getDateValue(newDate: Date){
    console.log('data:' + newDate);
  }

  saveChanges(): void{
    this.spinner.show();
    if(this.form?.valid){
      if(this.saveState == 'post'){
        this.lecture = {... this.form.value }
        this.lectureService.post(this.lecture).subscribe({
          next: () => this.toastr.success('Lecture has been created','Success!'),
          error: (error: any) => {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Error when creating lecture.','Oh no!');
          },
          complete: () => this.spinner.hide()
        });
      } else {
        this.lecture = {id: this.lecture.id, ... this.form.value }
        this.lectureService.put(this.lecture).subscribe({
          next: () => this.toastr.info('Lecture has been saved','Success!'),
          error: (error: any) => {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Error when saving lecture.','Oh no!');
          },
          complete: () => this.spinner.hide()
        });
      }

    }
  }
}
