import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _refreshNeeded$ = new Subject<void>();
  error: any;
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  private url = 'https://localhost:44395/api/customer';
  constructor(private http: HttpClient
  ) { }

  /** GET Customeres from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<any>(this.url,)
      .pipe(
        tap(_ => this.log('fetched Customers')),
        catchError(this.handleError)
      );
  }

  findCustomerByIdAsync(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`,)
    .pipe(
      tap(() => {
      
      }),

      catchError(this.handleError)
    );
      
  }
  saveCustommerAsync(customer: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, (customer),
    {
      // headers: {
      //   "Content-Type": "application/json;charset=UTF-8",
      // },
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
  updateCustomerAsync(customer: Customer): Observable<any> {
    return this.http.put<any>(`${this.url}`, JSON.stringify(customer),
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
  deleteCustomerAsync(id: number): Observable<any> {
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
          this._refreshNeeded$.next();
        }),

        catchError(this.handleError)
      );
  }

  upload(file: any): Observable<any> {
    return this.http.post<any>(`${this.url}/Upload`, (file),
    {
      // headers: {
      //   "Content-Type": "application/json;charset=UTF-8",
      // },
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



