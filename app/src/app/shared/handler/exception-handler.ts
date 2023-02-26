import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable()
export class GlobalExceptionHandler implements HttpInterceptor {

  private static emitErrorEvent: Subject<any> = new Subject<any>();

  public listenEvent():Observable<any> {
    return GlobalExceptionHandler.emitErrorEvent.asObservable();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((httpError: HttpErrorResponse) => {

        let errorMessage = '';

        httpError.error instanceof ErrorEvent ? errorMessage = `${httpError.error.message}` : errorMessage = `${httpError.message}`;

        GlobalExceptionHandler.emitErrorEvent.next(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    )
  }

}
