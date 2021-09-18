import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Country } from '../models/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  private url = 'https://localhost:44395/api/Country';
  constructor(private http: HttpClient
  ) { }

  /** GET Countryes from the server */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched Countrys')),
        catchError(this.handleError<Country[]>('getCountrys', []))
      );
  }

  // findCountryByIdAsync(id: number): Observable<any> {
  //   return this.http.get<Country>(`${this.url}/${id}`)
  //     .pipe(
  //       tap(_ => this.log('fetched Country')),
  //       catchError(this.handleError<Country>(`FindCountryByIdAsync/${id}`))
  //     );
  // }
  // saveCustommerAsync(Country: any): Observable<any> {
  //   console.log(Country);
  //   return this.http.post<any>(`${this.url}`, JSON.stringify(Country),
  //     {
  //       headers: {
  //         "Content-Type": "application/json;charset=UTF-8",

  //       },
  //     }
  //   )
  //     .pipe(
  //       tap(() => {
  //         this.log('fetched Country')
  //         this._refreshNeeded$.next()
  //       })
  //       ,
  //       catchError(this.handleError<any>(`dd}`))
  //     );
  // }

  // saveMockAsync(): Observable<any> {
  //   return this.http.post<any>(`${this.url}`, {
  //     "CountryName": "rrr Alam",
  //     "fatherName": "Xyz",
  //     "CountryId": 1
  //   },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .pipe(
  //       tap(_ => this.log('fetched Country')),
  //       catchError(this.handleError<any>(`dd}`))
  //     );
  // }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}



