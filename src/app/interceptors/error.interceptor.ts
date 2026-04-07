import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'An unexpected error occurred';

        if (error.status === 0) {
          message = 'Unable to connect to the server';
        } else if (error.status === 400) {
          message = error.error?.message || 'Bad request';
        } else if (error.status === 404) {
          message = error.error?.message || 'Resource not found';
        } else if (error.status === 500) {
          message = 'Internal server error';
        } else if (error.status !== 401 && error.status !== 403) {
          message = error.error?.message || `Error ${error.status}`;
        }

        if (error.status !== 401 && error.status !== 403) {
          this.toastService.error(message);
        }

        return throwError(() => error);
      })
    );
  }
}
