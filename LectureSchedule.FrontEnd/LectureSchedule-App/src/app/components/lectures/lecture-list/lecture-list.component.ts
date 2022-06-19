import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Lecture } from '@app/models/Lecture';
import { LectureService } from '@app/services/lecture.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {
  public lectures: Lecture[] = [];
  public filteredLectures: Lecture[] = [];
  public imageWidth = 100;
  public imageMargin = 2;
  public hideImage = false;
  public modalRef?: BsModalRef;
  private listFilterString = '';
  private lectureId = 0;

  public get listFilter(): string{
    return this.listFilterString;
  }

  public set listFilter(value: string){
    this.listFilterString = value;
    this.filteredLectures = this.listFilter ? this.filterLectures(this.listFilterString) : this.lectures;
  }

  constructor(
    private lectureService: LectureService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router) { }

  filterLectures(filter: string): Lecture[]{
    filter = filter.toLowerCase();
    return this.lectures.filter(
      (lecture: Lecture) => lecture.theme.toLowerCase().indexOf(filter) !== -1 ||
            lecture.local.toLowerCase().indexOf(filter) !== -1
    );
  }

  public ngOnInit(): void {
    this.spinner.show();;
    this.loadLectures();
  }

  public controlImageVisibility(): void{
    this.hideImage = !this.hideImage;
  }

  public loadLectures() : void {
    this.lectureService.getLectures().subscribe({
      next: (lectures: Lecture[]) => {
        this.lectures = lectures;
        this.filteredLectures = lectures;
      },
      error: () => this.toastr.error('An error has occurred.', 'Ops!')
    }).add(() => this.spinner.hide());
  }

  public openDeleteModal(template: TemplateRef<any>, id: number): void{
    this.modalRef = this.modalService.show(template);
    this.lectureId = id;
  }

  public confirmDelete(): void{
    this.spinner.show();
    this.lectureService.delete(this.lectureId).subscribe({
        next: () => {
          this.toastr.warning('Lecture has been deleted.', 'Sucess!');
          this.loadLectures();
        },
        error: (error: any) => {
          this.toastr.error('Error when deleting lecture.', 'Failure!');
        }
    }).add(() => this.spinner.hide());

    this.modalRef?.hide();
  }

  public cancelDelete(): void{
    this.modalRef?.hide();
  }

  public details(id: number): void{
    this.router.navigate([`lectures/details/${id}`]);
  }

  public showImage(imageUrl: string): string {
    return imageUrl ?
      `${environment.apiURL}/resources/images/${imageUrl}` :
      'assets/no-profile-picture.jpg';
  }
}
