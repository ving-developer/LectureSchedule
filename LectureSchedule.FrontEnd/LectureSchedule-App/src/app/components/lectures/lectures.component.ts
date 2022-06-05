//angular imports
import { Component, OnInit, TemplateRef } from '@angular/core';
//installing packages imports
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
//internal imports
import { Lecture } from '../../models/Lecture';
import { LectureService } from '../../services/lecture.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
  // providers: [LectureService] one way of receiving LectureService by dependency injection. The best approach is including in module.ts
})
export class LecturesComponent implements OnInit {
  ngOnInit(): void {

  }
}
