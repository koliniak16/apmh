import { Popup } from 'ng2-opd-popup';
import { SmsService } from './../../shared-service/sms.service';
import { RequestService } from './../../shared-service/request.service';
import { Request } from './../../classes/request';
import { Attraction } from './../../classes/attraction';
import { AttractionService } from './../../shared-service/attraction.service';
import { ShiftService } from './../../shared-service/shift.service';
import { Globals } from './../../classes/globals';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/classes/shift';
import { DatePipe } from '@angular/common';
import { LoginServiceService } from 'src/app/shared-service/login.service';

@Component({
  selector: 'app-request-check',
  templateUrl: './request-check.component.html',
  styleUrls: ['./request-check.component.css']
})
export class RequestCheckComponent implements OnInit {

  public requests = new Array<Request>();
  public requestsBack = new Array<Request>();
  public shifts = new Array<Shift>();
  public attraction = new Attraction();
  public attractions = new Array<Attraction>();
  public fullname = '';
  public flag = 0;
  private shiftDate: Date;
  public errorPopup: string;

  constructor( private _router: Router, private _globals: Globals, private _shiftService: ShiftService, public datepipe: DatePipe,
    private _attractionService: AttractionService, private _loginService: LoginServiceService,
    private _requestService: RequestService, private _smsService: SmsService, private popup: Popup) {
    this._loginService.checkUser();
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Kierownik') {
      this._loginService.logOut();
    }

    this._requestService.getRequests().subscribe((requests) => {
      this.requests = requests;
    }, (error) => {
      this.errorPopup = 'Podczas ładowania prośb wystąpił błąd.';
      this.popup.show(this.popup.options);
      console.log(error);
    });

    this._loginService.checkUser();
        this._globals.shift = new Shift();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ) {
      this._router.navigate(['/']);
    } else {
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


  processUpdate(request: Request) {
    this._globals.request = request;
    for (let i = 0; i < this.shifts.length; i++) {
      if (!this.shifts[i].worker.id) {
        this.shifts.splice(i, 1);
        i--;
      }
    }
    this.requestsBack[0] = new Request();
    this.requestsBack[0] = request;
    this.requestsBack[0].is_closed = true;
    this._requestService.updateRequests(this.requestsBack).subscribe((requests) => {
      console.log(requests);
      this.requests.splice(this.requests.indexOf(this._globals.request));
    }, (error) => {
      this.errorPopup = 'Podczas aktualizacji prośby wystąpił błąd';
      this.popup.show(this.popup.options);
      console.log(error);
    });
    this._globals.request = this.requests[0];
  }

  forbid(request: Request) {
    this.processUpdate(request);
    this._smsService.sendSMSRequestRejected(this.datepipe.transform(this._globals.request.shift.date),
    this._globals.request.shift.worker).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  accept(request: Request) {
    this.processUpdate(request);
    this._smsService.sendSMSRequestAccepted(this.datepipe.transform(this._globals.request.shift.date),
    this._globals.request.shift.worker).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

}

