import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  show: boolean = false;
  showProgress: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _commonService: CommonService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.showProgress = true;
    let loginParams = { service: 'LOGIN', data: this.loginForm.value };
    this._api.post(loginParams).subscribe(user => {
      user.user.token = user.token;
      this.showProgress = false;
      this._commonService.setUpUser(user.user);
      this._router.navigateByUrl('/task/dashboard');
    }, err => {
      console.error(err);
      this.showProgress = false;
    });
  }

}
