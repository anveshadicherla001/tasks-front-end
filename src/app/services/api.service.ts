import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private modelMapping: any = {};

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute) {
    this.setMapping();
  }

  setMapping() {

    this.modelMapping = {
      LOGIN: { baseUrl: 'API', endPoint: 'signin' },
      SEARCH_TASK: { baseUrl: 'API', endPoint: 'tasks/search' },
      CREATE_TASK: { baseUrl: 'API', endPoint: 'tasks' },
      SEARCH_USER: { baseUrl: 'API', endPoint: 'users/search' },
      TASK_COUNT:  { baseUrl: 'API', endPoint: 'tasks/count' }
    };

  }

  getApiUrl(action, id?: any) {
    return environment[this.modelMapping[action].baseUrl] + this.getEndPoint(action, id);
  }

  getEndPoint(action, id?: any) {

    if (id && id.length) {

      let end_point = this.modelMapping[action].endPoint;

      id.map((x, index) => {
        end_point = end_point.replace(`:id${index + 1}`, x);
      });

      return end_point;

    } else {
      return this.modelMapping[action].endPoint;
    }

  }

  get(params): Observable<any> {

    const URL = this.getApiUrl(params.service, params.idArray);

    return this.http.get(URL, params.data)
      .map(response => {
        return response;
      })
      .catch((error: any) => {
        return throwError(error);
      });

  }


  post(params): Observable<any> {

    const headers = { 'Content-Type': 'application/json' };

    const URL = this.getApiUrl(params.service, params.idArray);

    return this.http.post(URL, params.data, { headers: headers })
      .map(response => {
        return response;
      })
      .catch((error: any) => {
        return throwError(error);
      });
  }

  put(params): Observable<any> {

    const headers = { 'Content-Type': 'application/json' };

    const URL = this.getApiUrl(params.service, params.idArray);

    return this.http.put(URL, params.data, { headers: headers })
      .map(response => {
        return response;
      })
      .catch((error: any) => {
        return throwError(error);
      });

  }

  getData(params): Observable<any> {

    const URL = this.getApiUrl(params.service, params.idArray);

    return this.http.get(URL + '?' + params.data)
      .map(response => {
        return response;
      })
      .catch((error: any) => {
        console.log(error);
        return throwError(error);
      });
  }

}
