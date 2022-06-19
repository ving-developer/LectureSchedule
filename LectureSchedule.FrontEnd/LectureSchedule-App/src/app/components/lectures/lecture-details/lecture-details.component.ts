import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl,
         FormArray,
         FormBuilder,
         FormControl,
         FormGroup,
         Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecture } from '@app/models/Lecture';
import { TicketLot } from '@app/models/TicketLot';
import { LectureService } from '@app/services/lecture.service';
import { TicketlotService } from '@app/services/ticketlot.service';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lecture-details',
  templateUrl: './lecture-details.component.html',
  styleUrls: ['./lecture-details.component.scss']
})
export class LectureDetailsComponent implements OnInit {
  modalRef?: BsModalRef;
  form?: FormGroup;
  lecture = {} as Lecture;
  saveState = 'post';
  lectureId = 0;
  currentTicketLot = { id: 0, name: '', index: 0};
  imageUrl = 'assets/upload-image.png';
  file!: File;

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

  get bsConfigTicketLots(): any{
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-green'
    };
  }

  get ticketLots(): FormArray {
    return this.form?.get('ticketLots') as FormArray;
  }

  constructor(
    private builder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private lectureService: LectureService,
    private ticketLotService: TicketlotService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadLecture();
    this.validation();
  }

  validation(): void {
    this.form = this.builder.group({
      theme : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      date : ['', Validators.required],
      maxPeopleSupported : ['', [Validators.required, Validators.max(120000)]],
      adress : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phone : ['', Validators.required],
      ticketLots: this.builder.array([])
    });
  }

  addTicketLot(): void {
    this.ticketLots.push(this.createTicketLot({id: 0} as TicketLot));
  }

  createTicketLot(ticketLot: TicketLot): FormGroup {
    return this.builder.group({
      id:  [ticketLot.id],
      name: [ticketLot.name, Validators.required],
      price: [ticketLot.price, Validators.required],
      startDate: [ticketLot.startDate, Validators.required],
      endDate: [ticketLot.endDate, Validators.required],
      quantity: [ticketLot.quantity, Validators.required],
    })
  }

  resetForm(){
    this.form?.reset();
  }

  cssInvalidClass(prop: FormControl | AbstractControl): any {
    return { 'is-invalid': prop.errors && prop.touched };
  }

  loadLecture(): void {
    this.lectureId = +this.activatedRouter.snapshot.paramMap.get('id')!;
    if(this.lectureId){
      this.saveState = 'put';
      this.spinner.show();
      this.lectureService.getLectureById(this.lectureId).subscribe({
        next: (lecture: Lecture) => {
          this.lecture = {...lecture};
          this.form?.patchValue(this.lecture);
          if(this.lecture.imageUrl){
            this.imageUrl = environment.apiURL + '/resources/images/' + this.lecture.imageUrl;
          }
          this.loadTicketLots();
        },
        error: () => {
          this.toastr.error('Can\'t find this lecture.', 'Oh no!');
        }
      }).add(() => this.spinner.hide());
    }
  }

  getDateValue(newDate: Date){
    console.log('data:' + newDate);
  }

  saveLectureChanges(): void{
    this.spinner.show();
    if(this.form?.valid){
      if(this.saveState == 'post'){
        this.lecture = {... this.form.value }
        this.lectureService.post(this.lecture).subscribe({
          next: (lecture: Lecture) => {
            this.router.navigate([`lectures/details/${lecture.id}`]);
            this.toastr.success('Lecture has been created','Success!');
          },
          error: (error: any) => {
            console.log(error);
            this.toastr.error('Error when creating lecture.','Oh no!');
          }
        }).add(() => this.spinner.hide());
      } else {
        this.lecture = {id: this.lecture.id, ... this.form.value }
        this.lectureService.put(this.lecture).subscribe({
          next: () => this.toastr.info('Lecture has been saved','Success!'),
          error: (error: any) => {
            console.log(error);
            this.toastr.error('Error when saving lecture.','Oh no!');
          }
        }).add(() => this.spinner.hide());
      }

    }
  }

  saveTicketLotsChanges(){
    this.spinner.show();
    if(this.form?.controls['ticketLots'].valid){
      this.ticketLotService.put(this.lectureId, this.form?.value.ticketLots)
      .subscribe({
        next: () => {
          this.toastr.success('Ticket lot has been saved','Success!');
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Error when saving ticket lot.','Oh no!');
        }
      }).add(() => this.spinner.hide());
    }
  }

  loadTicketLots(){
    this.ticketLotService.getTicketLotByLectureId(this.lectureId).subscribe({
      next: (ticketLots: TicketLot[]) => {
        ticketLots.forEach(
          ticketLot => {
            this.ticketLots.push(this.createTicketLot(ticketLot));
          }
        );
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Same error has ocurred.','Opsss!');
      }
    }).add(() => this.spinner.hide());
  }

  removeTicketLot(template: TemplateRef<any>, index: number){
    this.currentTicketLot.id = this.ticketLots.get(index + '.id')?.value;
    this.currentTicketLot.name = this.ticketLots.get(index + '.name')?.value;
    this.currentTicketLot.index = index;
    this.modalRef = this.modalService.show(template);
  }

  cancelDeleteTicketLot(){
    this.modalRef?.hide();
  }

  confirmDeleteTicketLot(){
    this.modalRef?.hide();
    this.spinner.show();
    if(this.currentTicketLot.id > 0){
      this.ticketLotService.delete(this.lectureId,this.currentTicketLot.id)
      .subscribe({
        next: ()  => {
          this.toastr.warning('Ticket lot has been deleted.','Success!');
          this.ticketLots.removeAt(this.currentTicketLot.index);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Failed to delete ticket lot.','Oh no!');
        }
      }).add(() => this.spinner.hide());
    }else{
      this.ticketLots.removeAt(this.currentTicketLot.index);
      this.spinner.hide();
      this.toastr.warning('Ticket lot has been deleted.','Success!');
    }
  }

  getTicketLotName(index: number): string{
    return this.ticketLots.get(index+'.name')?.value ? this.ticketLots.get(index+'.name')?.value : 'New Ticket Lot'
  }

  onFileChange(event: any){
    const reader = new FileReader();
    reader.onload = (event: any) => this.imageUrl = event.target.result;
    this.file = event.target.files[0];
    reader.readAsDataURL(this.file);
    this.uploadImage();
  }

  uploadImage(){
    this.spinner.show();
    this.lectureService.postUpload(this.lectureId,this.file).subscribe({
      next: () => {
        this.loadLecture();
        this.toastr.success("Profile picture has been updated with success","Success!");
      },
      error: (error) => {
        console.error(error);
        this.toastr.error("Same error has ocurred while updating your profile picture","Oh no!");
      },
    }).add(() => this.spinner.hide());
  }
}
