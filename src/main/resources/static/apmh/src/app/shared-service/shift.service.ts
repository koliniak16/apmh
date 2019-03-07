import { Request } from './../classes/request';
import { Shift } from './../classes/shift';
import { Attraction } from 'src/app/classes/attraction';
import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Globals } from './../classes/globals';
import { Token } from './../classes/token';

@Injectable({
  providedIn: 'root'
})
export class ShiftService implements OnInit {

  private baseUrl: String = 'http://localhost:8080/api';
  private headers: Headers;
  private options: RequestOptions;
  private attraction = new Attraction();
  private token: Token;

  constructor(private _http: Http, private _globals: Globals) { }

  ngOnInit() {
  }

  getShift(date: String) {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/shifts/' + date, this.options).
    pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  getShiftPracownik(date: String, id_p: Number) {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/shifts/' + date + '/' + id_p, this.options).
    pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateShifts(shifts: Array<Shift>) {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.put(this.baseUrl + '/shift/', JSON.stringify(shifts), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateRequests(requests: Array<Request>) {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.put(this.baseUrl + '/request/', JSON.stringify(requests), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }

}
