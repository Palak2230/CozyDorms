
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pg } from '../shared/models/pg';
import { ToastrService } from 'ngx-toastr';
import { PGS_URL, PGS_BY_CITY_URL, PGS_BY_ID_URL, ADD_PG_URL, CITIES_URL, ADD_REVIEW_URL, EDIT_PG_URL } from '../shared/constants/urls';
import { IPg } from '../shared/interfaces/IPg';
import { Review } from '../shared/models/Review';
import { IReview } from '../shared/interfaces/IReview';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class PgService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  getAll(): Observable<Pg[]> {
    return this.http.get<Pg[]>(PGS_URL).pipe(
      catchError(this.handleError)
    );
  }

  getCities(): Observable<string[]> {
    console.log('');
    return this.http.get<string[]>(CITIES_URL).pipe(
      catchError(this.handleError)
    );
  }


  getAllBySearch(searchTerm: string): Observable<Pg[]> {
    return this.http.get<Pg[]>(`${PGS_BY_CITY_URL}${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }

  // getlocalitiesBySearch(searchTerm: string): Observable<string[]> {
  //   return this.http.get<string[]>(`${LOCALITIES_BY_CITY_URL}${searchTerm}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getPgById(searchTerm: string): Observable<Pg> {
    return this.http.get<Pg>(`${PGS_BY_ID_URL}${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }
  addpg(pgadd: IPg) {
    // console.log('hey');
    return this.http.post<Pg>(ADD_PG_URL, pgadd).pipe
      (tap({
        next: (pg) => {
          // this.setuserToLocalStorage(user);
          // this.userSubject.next(user);
          console.log(pg);
          this.toastrService.success(`Welcome to CozyDorms`,
            "Registration successful !"
          )
          // console.log('hey');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            "Registration failed !"); console.log('hey');
        }
      }))
  }
  editpg(pgadd: IPg, id: string) {
    // console.log('hey');
    return this.http.post<Pg>(EDIT_PG_URL, { pgadd, id }).pipe
      (tap({
        next: (pg) => {
          // this.setuserToLocalStorage(user);
          // this.userSubject.next(user);
          console.log(pg);
          this.toastrService.success(`Updating successful`,
            "Registration successful !"
          )
          // console.log('hey');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            "PG could not be updated !"); console.log('hey');
        }
      }))
  }

  addreview(review: Review): Observable<Review> {
    return this.http.post<Review>(ADD_REVIEW_URL, review).pipe(tap({
      next: (review) => {
        console.log(review);
        this.toastrService.success('Review added successfully!', 'Success');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
        console.log(errorResponse.error);
      }
    }));
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



  filter(pgs: Pg[], selectedTenantsValues: any, selectedRoomsValues: any, selectedRatingsValues: any): Pg[] {

    let pgsample = pgs;

    if (selectedTenantsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {

        for (let tenant of selectedTenantsValues) {

          if (item.tenantgender && item.tenantgender == tenant.type) {
            return true;
          }
        }
        return false;
      });
    }
    if (selectedRoomsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let room of selectedRoomsValues) {
          for (let i of item.rooms) {
            if (i.occupancy == room.value) {
              return true;
            }
            if (room.value == 'others' && i.occupancy > 3) return true;
          }
        }

        return false;
      });
    }
    if (selectedRatingsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let rating of selectedRatingsValues) {
          if (item.stars >= rating.type) {
            return true;
          }
        }
        return false;
      });
    }


    return pgsample;


  }
}
