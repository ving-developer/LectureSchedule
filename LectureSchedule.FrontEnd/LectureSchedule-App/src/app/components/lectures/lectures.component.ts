//angular imports
import { Component, OnInit, TemplateRef } from '@angular/core';

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
