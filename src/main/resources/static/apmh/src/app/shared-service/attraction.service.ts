import { Notification } from './../classes/notification';
import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Attraction } from '../classes/attraction';
import { Globals } from './../classes/globals';
import { Token } from './../classes/token';

@Injectable({
  providedIn: 'root'
})
export class AttractionService implements OnInit {

  private baseUrl: String = 'http://localhost:8080/api';
  private headers: Headers;
  private options: RequestOptions;
  private attraction = new Attraction();
  private token: Token;
  private openingDate: Date;

  constructor(private _http: Http, private _globals: Globals) { }

  ngOnInit() {
  }

  getAttractions() {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/attractions', this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  deleteAttraction(id: Number) {
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.delete(this.baseUrl + '/attraction/' + id, this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  createAttraction(attraction: Attraction) {
    attraction.active = 1;
    attraction.is_out_of_order = 0;
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.post(this.baseUrl + '/attraction/', JSON.stringify(attraction), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateAttraction(attraction: Attraction) {
    attraction.active = 1;
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.put(this.baseUrl + '/attraction/', JSON.stringify(attraction), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateBreakdown(notification: Notification) {
    console.log(notification);
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.post(this.baseUrl + '/notification/', JSON.stringify(notification), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateRepair(notification: Notification) {
    console.log(notification);
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.put(this.baseUrl + '/notification/', JSON.stringify(notification), this.options)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  getNotifications(id: Number) {
    console.log(id);
    const getToken = localStorage.getItem('token');
    this.token = JSON.parse(getToken);
    this.headers = new Headers({'Content-Type': 'application/json',
                                'Authorization': this.token.token_type + this.token.access_token});
    this.options = new RequestOptions({headers: this.headers});
    return this._http.get(this.baseUrl + '/notifications/' + id, this.options).pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }
}
