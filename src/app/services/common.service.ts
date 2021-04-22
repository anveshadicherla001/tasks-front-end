import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _cookieService: CookieService,
  ) {
    let user = this.getUser();
    this.setProfileObs(user);
  }

  private profileObs$: BehaviorSubject<any> = new BehaviorSubject(null);
  unsubscribe$: Subject<boolean> = new Subject();

  getProfileObs(): Observable<any> {
    return this.profileObs$.asObservable();
  }

  setProfileObs(profile) {
    this.profileObs$.next(profile);
  }

  setUpUser(userObj) {

    if (userObj.token) {
      this._cookieService.set('Authorization', userObj.token, undefined, "/");
    };

    sessionStorage.setItem('logged_user', JSON.stringify(userObj));

    setTimeout(() => {
      this.setProfileObs(userObj);
    }, 200);

  }

  getUser(fieldName?: string) {

    let user = sessionStorage.getItem('logged_user');

    if (!user) {
      return false
    }
    if (fieldName) {
      return JSON.parse(user)[fieldName]
    }
    else {
      return JSON.parse(user)
    }

  }

  logout() {
    sessionStorage.removeItem('logged_user');
    this.setProfileObs(null);
    this._router.navigate(['/authentication/signin']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  getToken() {
    return this._cookieService.get('Authorization');
  }

}
