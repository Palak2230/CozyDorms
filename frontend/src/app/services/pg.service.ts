
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pg } from '../shared/models/pg';
import { Locality } from '../shared/models/localities';
import { PGS_URL, LOCALITIES_URL, PGS_BY_CITY_URL, LOCALITIES_BY_CITY_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class PgService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pg[]> {
    return this.http.get<Pg[]>(PGS_URL).pipe(
      catchError(this.handleError)
    );
  }

  getLocalities(): Observable<Locality[]> {
    return this.http.get<Locality[]>(LOCALITIES_URL).pipe(
      catchError(this.handleError)
    );
  }

  getAllBySearch(searchTerm: string): Observable<Pg[]> {
    return this.http.get<Pg[]>(`${PGS_BY_CITY_URL}${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }

  getlocalitiesBySearch(searchTerm: string): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${LOCALITIES_BY_CITY_URL}${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }



  filter(pgs: Pg[], selectedTenantsValues: any, selectedRoomsValues: any, selectedRatingsValues: any, selectedLocalities: any): Pg[] {

    let pgsample = pgs;
    if (selectedLocalities.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let locality of selectedLocalities) {
          if (item.locality === locality) {
            return true;
          }
        }
        return false;
      });
    }
    if (selectedTenantsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {

        for (let tenant of selectedTenantsValues) {
          if (item.tags?.tenantType.includes(tenant.type)) {
            return true;
          }
        }
        return false;
      });
    }
    if (selectedRoomsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let room of selectedRoomsValues) {
          if (item.tags?.roomsOccupancy.includes(room.type)) {
            return true;
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
