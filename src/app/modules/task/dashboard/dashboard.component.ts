import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Observable } from 'rxjs';
import { debounce } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ViewTaskComponent } from '../view-task/view-task.component'; 
import * as moment from 'moment';

import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public moment: any = moment;
  public tasksList: any = [];
  pageEvent: PageEvent;
  results$: Observable<any>;
  subject = new Subject();
  public pageEventObj: any = {
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 10,
    length: 100
  };
  public userName: any = '';
  public currentDate = `${moment().format('LL')}, ${moment().format('dddd')}`
  public searchText: any = '';
  public userData: any;
  public dataLoaded: boolean = false;

  constructor(
    private _api: ApiService,
    public _dialog: MatDialog,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.userData = this._commonService.getUser();
    this.userName = `Hello, ${this.userData.name}`;
    this.search = debounce(this.search, 500);
    this.search('');
  }

  search(event) {
    const searchText = event ? event.target.value : '';
    this.taskCount(searchText);
    let apiParams = { service: 'SEARCH_TASK', data: `key=${searchText}&user_id=${this.userData.id}&limit=${this.pageEventObj.pageSize}&offset=${this.pageEventObj.pageIndex}` };
    this._api.getData(apiParams).subscribe(data => {
      this.tasksList = data;
      this.dataLoaded = true;
    }, err => {
      this.dataLoaded = true;
      console.error(err);
    });
  }

  taskCount(searchText) {
    let apiParams = { service: 'TASK_COUNT', data: `key=${searchText}&user_id=${this.userData.id}` };
    this._api.getData(apiParams).subscribe(data => {
      this.pageEventObj.length = data.total_count;
    }, err => {
      console.error(err);
    });
  }

  pageChange(event) {
    this.pageEventObj = {...event};
    this.search(this.searchText);
  }

  viewTask(data) {
    const dialogRef = this._dialog.open(ViewTaskComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
