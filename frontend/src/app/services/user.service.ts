import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL, USER_UPDATE_URL } from '../shared/constants/urls';
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
        this.setuserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(`Welcome back to CozyDorms ${user.name}`,
          "Login successful !"
        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          "Login failed !")
      }
    }))
  }
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  register(userRegister: IUserRegister) {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe
      (tap({
        next: (user) => {
          this.setuserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to CozyDorms ${user.name}`,
            "Registration successful !"
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            "Registration failed !")
        }
      }))
  }
  update(userUpdate: IUserLogin) {
    return this.http.post<User>(USER_UPDATE_URL, userUpdate).pipe
      (tap({
        next: (user) => {
          this.setuserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Password changed successfully !`

          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            "No such user exist !")
        }
      }))
  }




  private setuserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
