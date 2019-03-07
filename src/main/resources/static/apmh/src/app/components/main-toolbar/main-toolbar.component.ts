import { Router } from '@angular/router';
import { Globals } from './../../classes/globals';
import { Component, OnInit, Injectable } from '@angular/core';
import { LoginServiceService } from './../../shared-service/login.service';
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
@Injectable()
export class MainToolbarComponent implements OnInit {


  constructor(public _globals: Globals, private _router: Router, private _loginService: LoginServiceService) {
    if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
      this._globals.is_logged_in = true;
      this._loginService.setRouter(localStorage.getItem('route'));
      this._loginService.checkUser();
   }
   }

   ngOnInit() {
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
   }


  logOut() {
    this._loginService.logOut();
  }

  worker_list() {
    localStorage.setItem('route', 'worker_list');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['worker-list']);
  }

  attraction_list() {
    localStorage.setItem('route', 'attraction_list');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['attraction-list']);
  }

  shift_management() {
    localStorage.setItem('route', 'shift_management');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['shift-management']);
  }

  technic_site() {
    localStorage.setItem('route', 'technic_site');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['technic-site']);
  }

  taken_seats() {
    localStorage.setItem('route', 'taken_seats');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['taken-seats']);
  }

  request_site() {
    localStorage.setItem('route', 'request_site');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['request-site']);
  }

  request_check() {
    localStorage.setItem('route', 'request_check');
    this._loginService.checkUser();
    this._loginService.setRouter(localStorage.getItem('route'));
    this._router.navigate(['request-check']);
  }

}
