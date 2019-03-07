import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Worker } from '../classes/worker';
import { Globals } from './../classes/globals';
import { Token } from './../classes/token';
import { LoginServiceService } from './login.service';
import { WorkerRole } from '../classes/worker-role';


@Injectable({
  providedIn: 'root'
})
export class WorkerService implements OnInit {

  private baseUrl: String = 'http://localhost:8080/api';
  private headers: Headers;
  private options: RequestOptions;
  private worker = new Worker();
  private token: Token;

  constructor(private _http: Http, private _loginService: LoginServiceService, private _globals: Globals) { }

  ngOnInit() {
  }

  getWorkers() {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/workers', this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  getTechnics() {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/technics', this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  getUser(username: string) {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/worker/' + username, this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  deleteWorker(id: Number) {
    console.log(id);
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.delete(this.baseUrl + '/worker/' + id, this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  createWorker(worker: WorkerRole) {
    worker.worker.active = 1;
    worker.worker.token = null;
    switch (worker.role.position) {
      case 'Kierownik': {
        worker.role.id = 1;
        break;
      }
      case 'Pracownik': {
        worker.role.id = 2;
        break;
      }
      case 'Technik': {
        worker.role.id = 3;
        break;
      }
    }
    console.log(worker);
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.post(this.baseUrl + '/worker/', JSON.stringify(worker), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateWorker(worker: WorkerRole) {
    worker.worker.active = 1;
    worker.worker.token = null;
    console.log(worker.role.position);
    switch (worker.role.position) {
      case 'Kierownik': {
        worker.role.id = 1;
        break;
      }
      case 'Pracownik': {
        worker.role.id = 2;
        break;
      }
      case 'Technik': {
        worker.role.id = 3;
        break;
      }
    }
    console.log(worker);
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.put(this.baseUrl + '/worker/', JSON.stringify(worker), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

 errorHandler(error: Response) {
   return Observable.throw(error || 'SERVER ERROR');
 }

}
