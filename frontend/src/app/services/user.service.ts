import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable?: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }
  login(userLogin: IUserLogin) {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
      next: (user) => {
        this.setuserLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(`Welcome back to CozyDorms ${user.name}`, 'Login Successful')
        
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.toastrService.error(errorResponse.error, 'Login failed');
      }
    })
    );
  }
  private setuserLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
