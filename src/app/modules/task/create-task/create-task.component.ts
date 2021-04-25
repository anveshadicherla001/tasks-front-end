import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { debounce } from 'lodash';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTaskComponent implements OnInit {

  userCtrl = new FormControl('', Validators.required);
  filteredOptions: any = [];
  createTaskForm: FormGroup;
  minDate: Date = new Date();
  maxDate: any;
  profile: any;
  selectedUser: any;

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _commonService: CommonService,
    private _router: Router
  ) { 
    this.maxDate = moment(new Date()).add(1, 'M').format();
    this.profile = this._commonService.getUser();
    this.searchUsers = debounce(this.searchUsers, 500);
  }

  ngOnInit(): void {
    this.createTaskForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^(?![0-9!"#$%&'()*+,-.:;<=>?@[\\\]^_`{|}~]+$)(?:[a-zA-Z0-9][\/a-zA-Z0-9 @&.,"'9*;:^_@.#()\-–&+$=<>?\s]*)?$/)]],
      description: ['', [Validators.required, Validators.pattern(/^\S/)]],
      due_date: ['', [Validators.required]],
      created_by: [this.profile.id]
    });
  }

  goBack() {
    this._location.back();
  }

  saveTask() {
    this.createTaskForm.value.due_date = moment(this.createTaskForm.value.due_date).format('YYYY-MM-DD HH:mm:ss')
    this.createTaskForm.value.user = this.selectedUser.id;
    let params = { service: 'CREATE_TASK', data: this.createTaskForm.value };
    this._api.post(params).subscribe(data => {
      if(data.error) {
        this._commonService.openSnackBar(data.error, 'OK');
      }
      else {
        this._commonService.openSnackBar(`Task has been created successfully !`, 'OK');
        this._router.navigateByUrl('/task/dashboard');
      }
    }, err => {
      console.error(err);
    });
  }

  searchUsers(event) {
    this.selectedUser = null;
    if (event.target.value.trim().length > 2) {
      let params = { service: 'SEARCH_USER', data: `key=${event.target.value}&id=${this.profile.id}` };
      this._api.getData(params).subscribe(data => {
        if(!data.error) {
          this.filteredOptions = data;
        }
      }, err => {
        console.error(err);
      });
    }
  }

  onUserSelection(user) {
    console.log(user);
    this.selectedUser = user;
  }

}
