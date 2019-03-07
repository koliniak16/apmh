import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { WorkerService } from 'src/app/shared-service/worker.service';

import { LoginServiceService } from '../../shared-service/login.service';
import { Body } from './../../classes/body';
import { Globals } from './../../classes/globals';
import { Token } from './../../classes/token';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
@Injectable()
export class LoginFormComponent implements OnInit {

  public token: Token;
  public body = new Body();
  public errorPopup: string;

  constructor(private _loginService: LoginServiceService, private _router: Router, private _globals: Globals,
    private _workerService: WorkerService, private popup: Popup) {
    _globals.router_log = 1;
    _globals.router_worker_list = 0;
    _globals.router_attraction_list = 0;
    _globals.router_shift_management = 0;
   }

  ngOnInit() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined ) {
      const getToken = localStorage.getItem('token');
      this.token = JSON.parse(getToken);
    }
    if (localStorage.getItem('body') !== null && localStorage.getItem('body') !== undefined) {
      const getBody = localStorage.getItem('body');
      this.body = JSON.parse(getBody);
    }
    if (this.token !== undefined) {
      console.log('weszlo');
      localStorage.setItem('route', 'worker_list');
      this._router.navigate(['/worker-list']);
    }

    this.popup.options = {
      header: 'Uwaga!',
      color: 'red',
      widthProsentage: 20,
      animationDuration: 1,
      showButtons: true,
      confirmBtnContent: 'Usuń',
      cancleBtnContent: 'Wstecz',
      confirmBtnClass: 'btn btn-default',
      cancleBtnClass: 'btn btn-default',
      animation: 'fadeInDown'
  };
  }



  processLogin() {
    this._globals.body = this.body;
    localStorage.setItem('body', JSON.stringify(this.body));
    this._loginService.checkToken().subscribe((tokenGet) => {
      this._globals.token = tokenGet;
      localStorage.setItem('token', JSON.stringify(tokenGet));
      this._globals.is_logged_in = true;

      this._workerService.getUser(this._globals.body.username).subscribe((userGet) => {
        this._globals.userPosition = userGet.role.position;
        this._globals.id_t = userGet.worker.id;
        localStorage.setItem('userPosition', userGet.role.position);
        localStorage.setItem('id_t', userGet.worker.id);
        this._loginService.checkUser();
        console.log(this._globals.userPosition);
        if (localStorage.getItem('userPosition') === 'Kierownik') {
        localStorage.setItem('route', 'worker_list');
        this._router.navigate(['/worker-list']);
        } else if (localStorage.getItem('userPosition') === 'Technik') {
        localStorage.setItem('route', 'technic_site');
        this._router.navigate(['/technic-site']);
      } else {
        localStorage.setItem('route', 'taken_seats');
        this._router.navigate(['/taken-seats']);
      }
      }, (error) => {
        this._globals.is_logged_in = false;
        this.errorPopup = 'Podczas logowania wystąpił błąd. Sprobuj ponownie';
        this.popup.show(this.popup.options);
        console.log(error);
      });
    }, (error) => {
      this._globals.is_logged_in = false;
      this.errorPopup = 'Podczas logowania wystąpił błąd. Sprobuj ponownie';
        this.popup.show(this.popup.options);
      console.log(error);
    });
  }

}
