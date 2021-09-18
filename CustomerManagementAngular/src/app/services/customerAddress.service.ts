import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerAddress } from '../models/customerAddress';


@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  private _refreshNeeded$ = new Subject<void>();
  error: any;
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  private url = 'https://localhost:44395/api/customerAddress';
  constructor(private http: HttpClient
  ) { }

  /** GET CustomerAddresses from the server */
  getCustomerAddresss(): Observable< CustomerAddress[]> {
    return this.http.get<any>(this.url,)
      .pipe(
        tap(_ => this.log('fetched CustomerAddresss')),
        catchError(this.handleError)
      );
  }

  findCustomerAddressByIdAsync(id: number): Observable< CustomerAddress> {
    return this.http.get< CustomerAddress>(`${this.url}/${id}`,)
    .pipe(
      tap(() => {
      
      }),

      catchError(this.handleError)
    );
      
  }
  saveCustommerAddressAsync(customerAddress: CustomerAddress): Observable<any> {
    return this.http.post<any>(`${this.url}`, JSON.stringify(customerAddress),
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      tap(() => {
          this._refreshNeeded$.next();
      }),

      catchError(this.handleError)
    );
  }
  updateCustomerAddressAsync(customerAddress:  CustomerAddress): Observable<any> {
    return this.http.put<any>(`${this.url}`, JSON.stringify(customerAddress),
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      tap(() => {
          this._refreshNeeded$.next();
      }),

      catchError(this.handleError)
    );
  }
  deleteCustomerAddressAsync(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        tap(() => {
            //this._refreshNeeded$.next();
        }),

        catchError(this.handleError)
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }



  public handleError(err: HttpErrorResponse) {


    this.error.status = err.status;
    this.error.message = "Something Wrong!";

    //return throwError(err);
    return throwError(this.error);
  }
}



