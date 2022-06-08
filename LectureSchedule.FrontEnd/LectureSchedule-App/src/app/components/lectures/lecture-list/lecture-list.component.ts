import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Lecture } from '@app/models/Lecture';
import { LectureService } from '@app/services/lecture.service';

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
  public hideImage = true;
  private listFilterString = '';
  public modalRef?: BsModalRef;

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
    const observer = {
      next: (lectures: Lecture[]) => {
        this.lectures = lectures;
        this.filteredLectures = lectures;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('An error has occurred.', 'Ops!');
      },
      complete: () => this.spinner.hide()
    };
    this.lectureService.getLectures().subscribe(observer);
  }

  public openDeleteModal(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template);
  }

  public confirmDelete(): void{
    this.toastr.warning('Lecture has been deleted.', 'Sucess!');
    this.modalRef?.hide();
  }

  public cancelDelete(): void{
    this.modalRef?.hide();
  }

  public details(id: number): void{
    this.router.navigate([`lectures/details/${id}`]);
  }
}
