import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { USER_SIGNUP_URL } from '../shared/constants/urls';
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
        if (user) {
          this.setuserLocalStorage(user);
          this.userSubject.next(user);

        }
      }
    })
    );
  }
  signup(userLogin: IUserLogin) {
    return this.http.post<User>(USER_SIGNUP_URL, userLogin).pipe(tap({
      next: (user) => {
        if (user) {
          // this.setuserLocalStorage(user);
          // this.userSubject.next(user);

        }
        else {
          this.setuserLocalStorage(user);
          this.userSubject.next(user);
        }
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
