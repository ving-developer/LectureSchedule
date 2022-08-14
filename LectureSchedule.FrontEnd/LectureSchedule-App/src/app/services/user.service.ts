import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/Identity/User';
import { environment } from '@environments/environment';
import { map, Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  baseUrl = environment.apiURL + '/User/';

  constructor(private httpClient: HttpClient) { }

  public login(model: any): Observable<void>{
    return this.httpClient.post<User>(this.baseUrl + 'login', model).pipe(
      take(1),
      map((response: User) =>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  public register(model: any): Observable<void>{
    return this.httpClient.post<User>(this.baseUrl + 'register', model).pipe(
      take(1),
      map((response: User) =>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();

  }

  public setCurrentUser(user: User): void{
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
