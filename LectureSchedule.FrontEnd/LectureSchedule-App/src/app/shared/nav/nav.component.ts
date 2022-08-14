import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }

}
