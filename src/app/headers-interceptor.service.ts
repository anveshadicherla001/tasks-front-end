import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './services/common.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

const APIURL = environment.API;

@Injectable({
  providedIn: 'root'
})

export class HeadersInterceptorService {

  public token: any;
  constructor(
    public _commonService: CommonService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this._commonService.getToken();

    let contentType = 'application/json'

    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': `${contentType}`,
        'Authorization': `Bearer ${this.token}`
      })
    });

    return next.handle(authReq);

  }
}
