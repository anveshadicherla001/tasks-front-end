import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean;
  title = 'tasks-front-end';

  constructor(private _commonService: CommonService) {
    let user = this._commonService.getUser();
    this.loggedIn = user ? true : false;
    this._commonService.getProfileObs().subscribe(profile => {
      if (profile && profile != null) {
        setTimeout(() => {
          this.loggedIn = true;
        }, 0);
      }
      else
        setTimeout(() => {
          this.loggedIn = false;
        }, 0);
    });
  }

}
