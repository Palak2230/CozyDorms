import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USER__URL, USER_LOGIN_URL, USER_PROFILE_URL, USER_REGISTER_URL, USER_UPDATE_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

import { JsonPipe } from '@angular/common';
import { Pg } from '../shared/models/pg';
import { IUser } from '../shared/interfaces/IUser';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
      next: (user) => {
        console.log(user);
        this.setuserToLocalStorage(user);
        this.userSubject.next(user);

        this.toastrService.success(`Welcome back to CozyDorms ${user.name}`,
          "Login successful !"
        )
        window.location.reload();
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          "Login failed !")
      }
    }))
  }
  logout() {
    // this.userSubject.next(new User());
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
 
  getPgsOfUser(user: IUser): Observable<Pg[]> {
    return this.http.post<Pg[]>(USER_UPDATE_URL, user).pipe(tap({
      next: (user) => {
        // this.setuserToLocalStorage(user);
        // this.userSubject.next(user);
        this.toastrService.success(`got pg successfully !`

        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          "shit error !")
      }
    }))
  }
  updateUser(image: string, name: string, email: string, contact: string,): Observable<User> {
    return this.http.post<User>(USER_PROFILE_URL, { image, name, email, contact }).pipe(tap({
      next: (user) => {
        // this.setuserToLocalStorage(user);
        // this.userSubject.next(user);
        console.log(user);
        this.setuserToLocalStorage(user);
        this.toastrService.success(`got updated successfully !`

        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          "shit error !")
      }
    }))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }

  private setuserToLocalStorage(user: User) {
    console.log(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // localStorage.setItem('Wishlist', JSON.stringify([]));
    console.log(localStorage.getItem(USER_KEY));
    window.location.reload();
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USER__URL).pipe(
      catchError(this.handleError)
    );
  }

}
