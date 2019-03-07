import { Router } from '@angular/router';
import { Globals } from '../classes/globals';
import { Token } from '../classes/token';
import { Body } from '../classes/body';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestOptions, Http, Headers, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { SwitchView } from '@angular/common/src/directives/ng_switch';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private baseUrl = 'http://localhost:8080/oauth/token';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded',
                                 'Authorization': 'Basic dGVzdDp0ZXN0'});
  private options = new RequestOptions({headers: this.headers, method: 'POST'});
  private body = new Body();
  private token: Token;


  constructor(private _http: Http, private _globals: Globals, private _router: Router) { }


  checkToken() {
    this.token = this._globals.token;
    this.body = this._globals.body;
    const body2 = `grant_type=${this.body.grant_type}&username=${this.body.username}&password=${this.body.password}`;
    return this._http.post(this.baseUrl, body2, this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }

  logOut() {
    localStorage.clear();
    this._globals.is_logged_in = false;
    this.checkUser();
    this.setRouter(' ');
    this._router.navigate(['/']);
  }

  checkUser() {
    this._globals.userPosition = localStorage.getItem('userPosition');
    switch (localStorage.getItem('userPosition')) {
      case 'Kierownik': {
        this._globals.user_kierownik = 1;
        this._globals.user_pracownik = 0;
        this._globals.user_technik = 0;
        break;
      }
      case 'Pracownik': {
        this._globals.user_kierownik = 0;
        this._globals.user_pracownik = 1;
        this._globals.user_technik = 0;
        break;
      }
      case 'Technik': {
        this._globals.user_kierownik = 0;
        this._globals.user_pracownik = 0;
        this._globals.user_technik = 1;
        break;
      }
      default: {
        this._globals.user_kierownik = 0;
        this._globals.user_pracownik = 0;
        this._globals.user_technik = 0;
      }
    }
  }

  setRouter(routename: String) {
    switch (routename) {
      case 'worker_list': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 1;
        this._globals.router_shift_management = 0;
        this._globals.router_attraction_list = 0;
        this._globals.router_technic_site = 0;
        this._globals.router_taken_seats = 0;
        this._globals.router_request_site = 0;
        this._globals.router_request_check = 0;
        break;
      }
      case 'shift_management': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 0;
        this._globals.router_shift_management = 1;
        this._globals.router_attraction_list = 0;
        this._globals.router_technic_site = 0;
        this._globals.router_taken_seats = 0;
        this._globals.router_request_site = 0;
        this._globals.router_request_check = 0;
        break;
      }
      case 'attraction_list': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 0;
        this._globals.router_shift_management = 0;
        this._globals.router_attraction_list = 1;
        this._globals.router_technic_site = 0;
        this._globals.router_taken_seats = 0;
        this._globals.router_request_site = 0;
        this._globals.router_request_check = 0;
        break;
      }
      case 'technic_site': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 0;
        this._globals.router_shift_management = 0;
        this._globals.router_attraction_list = 0;
        this._globals.router_technic_site = 1;
        this._globals.router_taken_seats = 0;
        this._globals.router_request_site = 0;
        this._globals.router_request_check = 0;
        break;
      }
      case 'taken_seats': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 0;
        this._globals.router_shift_management = 0;
        this._globals.router_attraction_list = 0;
        this._globals.router_technic_site = 0;
        this._globals.router_taken_seats = 1;
        this._globals.router_request_site = 0;
        this._globals.router_request_check = 0;
        break;
      }
      case 'request_site': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 0;
        this._globals.router_shift_management = 0;
        this._globals.router_attraction_list = 0;
        this._globals.router_technic_site = 0;
        this._globals.router_taken_seats = 0;
        this._globals.router_request_site = 1;
        this._globals.router_request_check = 0;
        break;
      }
      case 'request_check': {
        this._globals.router_log = 0;
        this._globals.router_worker_list = 0;
        this._globals.router_shift_management = 0;
        this._globals.router_attraction_list = 0;
        this._globals.router_technic_site = 0;
        this._globals.router_taken_seats = 0;
        this._globals.router_request_site = 0;
        this._globals.router_request_check = 1;
        break;
      }
    }
  }

}
