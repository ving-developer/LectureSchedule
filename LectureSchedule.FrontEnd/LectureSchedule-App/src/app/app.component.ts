import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LectureSchedule-App';
  constructor(private router: Router){}

  public showNav(): boolean{
    return !["/user/login"].includes(this.router.url);
  }
}
