import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlProviderService } from '../url-provider-service/url-provider.service';

@Injectable()
export class SupportedLibrariesService {

  constructor(private http: HttpClient,
     private urlProvider: UrlProviderService) {}

  getSupportedLibraries(): Observable<Array<string>> {

    const supportedLibrariesUrl = this.urlProvider.getUrl() + '/chart/libraries';
    return this.http.get<Array<string>>(supportedLibrariesUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
