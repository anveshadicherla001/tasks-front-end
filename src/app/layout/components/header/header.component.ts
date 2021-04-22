import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public userName: any = '∞';

  constructor(
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    let user = this._commonService.getUser();
    this.userName = user ? user.name : '∞';
  }

  logout() {
    this._commonService.logout();
  }

}
