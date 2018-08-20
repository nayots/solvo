import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public snackBar: MatSnackBar, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this.snackBar.open(err.error.message, "⚠", {
              duration: 3000
            });
            break;
          case 400:
            this.snackBar.open(err.error.message, "⚠", {
              duration: 3000
            });
            break;
        }

        return throwError(err);
      })
    );
  }
}
