import { RequestService } from './../../shared-service/request.service';
import { Request } from './../../classes/request';
import { Attraction } from './../../classes/attraction';
import { Popup } from 'ng2-opd-popup';
import { AttractionService } from './../../shared-service/attraction.service';
import { ShiftService } from './../../shared-service/shift.service';
import { Globals } from './../../classes/globals';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Shift } from 'src/app/classes/shift';
import { DatePipe } from '@angular/common';
import { WorkerService } from 'src/app/shared-service/worker.service';
import { WorkerRole } from 'src/app/classes/worker-role';
import { Worker } from 'src/app/classes/worker';
import { LoginServiceService } from 'src/app/shared-service/login.service';

@Component({
  selector: 'app-request-site',
  templateUrl: './request-site.component.html',
  styleUrls: ['./request-site.component.css']
})
export class RequestSiteComponent implements OnInit {

  minDate: Date;
  public shifts = new Array<Shift>();
  public attraction = new Attraction();
  public attractions = new Array<Attraction>();
  public requests = new Array<Request>();
  public fullname = '';
  public flag = 0;
  private shiftDate: Date;
  public errorPopup: string;
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;

  constructor( private _router: Router, private _globals: Globals, private _shiftService: ShiftService, public datepipe: DatePipe,
    private _attractionService: AttractionService, private _loginService: LoginServiceService,
    private _requestService: RequestService) {
    this._loginService.checkUser();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Pracownik') {
      this._loginService.logOut();
    }

    this._attractionService.getAttractions().subscribe((attractions) => {
      this.attractions = attractions;
    }, (error) => {
      this.errorPopup = 'Podczas wczytywania atrakcji wystąpił błąd.';
      this.popup1.show(this.popup1.options);
      console.log(error);
    });

    this._loginService.checkUser();
        this._globals.shift = new Shift();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ) {
      this._router.navigate(['/']);
    } else {
           }
           this.popup1.options = {
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
        this.popup2.options = {
          header: 'Uwaga!',
          color: 'green',
          widthProsentage: 20,
          animationDuration: 1,
          showButtons: true,
          cancleBtnContent: 'Wstecz',
          cancleBtnClass: 'btn btn-default',
          confirmBtnContent: '',
          confirmBtnClass: 'hidden',
          animation: 'fadeInDown'
      };
  }

  onAttractionChange(attr: String, index) {
      this.attraction = this.attractions.find(x => x.name === attr);
      console.log(this.attraction);
  }

  whenChange(date: Date) {
    console.log('whenChange!!');
    this.shiftDate = date;
    console.log(this.datepipe.transform(date, 'yyyy-MM-dd'));
    this._shiftService.getShiftPracownik(this.datepipe.transform(date, 'yyyy-MM-dd'),
    +localStorage.getItem('id_t')).subscribe((shifts) => {
      this.shifts = shifts;
      console.log(this.shifts);
    }, (error) => {
      this.errorPopup = 'Podczas wczytywania obsady wystąpił błąd';
      this.popup1.show(this.popup1.options);
      console.log(error);
    });
  }


  noUpdate() {
    console.log('no process!');
  }

  processUpdate() {
    for (let i = 0; i < this.shifts.length; i++) {
      if (!this.shifts[i].worker.id) {
        this.shifts.splice(i, 1);
        i--;
      }
    }
    this.requests[0] = new Request();
    this.requests[0].attraction = this.attraction;
    this.requests[0].worker = this.shifts[0].worker;
    this.requests[0].is_closed = false;
    this.requests[0].opening_date = this.datepipe.transform(this.shiftDate, 'yyyy-MM-dd');
    this.requests[0].shift = this.shifts[0];
    console.log('process!');
    this._requestService.updateRequests(this.requests).subscribe((requests) => {
      console.log(requests);
      this.popup2.show(this.popup2.options);
    }, (error) => {
      this.errorPopup = 'Podczas aktualizacji prośby wystąpił błąd';
      this.popup1.show(this.popup1.options);
      console.log(error);
    });

  }

}

