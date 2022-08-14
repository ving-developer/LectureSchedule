import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toaster: ToastrService
  ){}

  canActivate(): boolean {
    if(localStorage.getItem('user') !== null) return true;
    this.toaster.info('User must be logged in');
    this.router.navigateByUrl('/user/login');
    return false;
  }

}
