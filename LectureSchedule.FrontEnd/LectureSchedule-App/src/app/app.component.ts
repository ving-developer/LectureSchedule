import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/Identity/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LectureSchedule-App';
  constructor(
    private router: Router,
    public userService: UserService
  ){}

  public ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    let user = (localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user')) : null) as User;
    this.userService.setCurrentUser(user);
  }

  public showNav(): boolean{
    return !["/user/login"].includes(this.router.url);
  }
}
