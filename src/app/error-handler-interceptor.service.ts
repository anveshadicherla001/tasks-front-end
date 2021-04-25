import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
 } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor  {

  constructor(private router: Router,
    private _commonService: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      tap(evt => {
          if (evt instanceof HttpResponse) {
            //console.log(evt);
          }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Unauthorized !',
            text: 'Unauthorized request',
            icon: 'error',
            confirmButtonText: 'Login Again!',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this._commonService.logout();
            }
          })
        }
        return throwError(error);
      })
    );
  }
  
  
}
