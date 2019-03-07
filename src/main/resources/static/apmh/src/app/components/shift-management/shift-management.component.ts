import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { Shift } from 'src/app/classes/shift';
import { Worker } from 'src/app/classes/worker';
import { WorkerRole } from 'src/app/classes/worker-role';
import { LoginServiceService } from 'src/app/shared-service/login.service';
import { SmsService } from 'src/app/shared-service/sms.service';
import { WorkerService } from 'src/app/shared-service/worker.service';

import { Globals } from './../../classes/globals';
import { ShiftService } from './../../shared-service/shift.service';

@Component({
  selector: 'app-shift-management',
  templateUrl: './shift-management.component.html',
  styleUrls: ['./shift-management.component.css']
})
export class ShiftManagementComponent implements OnInit {

  minDate: Date;
  initialDate = new Date();
  public shifts = new Array<Shift>();
  public workers = new Array<WorkerRole>();
  public worker = new WorkerRole();
  public fullname = '';
  public flag = 0;
  private shiftDate: Date;
  public errorPopup: string;
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;

  constructor( private _router: Router, private _globals: Globals, private _shiftService: ShiftService, public datepipe: DatePipe,
    private _workerService: WorkerService, private _loginService: LoginServiceService,
    private _smsService: SmsService ) {
    this._loginService.checkUser();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Kierownik') {
      this._loginService.logOut();
    }

    this._loginService.checkUser();
        this._globals.shift = new Shift();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ) {
      this._router.navigate(['/']);
    } else {
      this._workerService.getWorkers().subscribe((workers) => {
        this.workers = workers;
        console.log(workers);
      }, (error) => {
        this.errorPopup = 'Podczas wczytywania pracownikow wystąpił błąd';
        this.popup2.show(this.popup2.options);
        console.log(error);
      });
           }

           this.popup1.options = {
            header: 'Uwaga!',
            color: 'yellow',
            widthProsentage: 20,
            animationDuration: 1,
            showButtons: true,
            confirmBtnContent: 'Kontynuuj',
            cancleBtnContent: 'Wstecz',
            confirmBtnClass: 'btn btn-default',
            cancleBtnClass: 'btn btn-default',
            animation: 'fadeInDown'
        };
        this.popup2.options = {
          header: 'Uwaga!',
          color: 'red',
          widthProsentage: 20,
          animationDuration: 1,
          showButtons: true,
          cancleBtnContent: 'Wstecz',
          cancleBtnClass: 'btn btn-default',
          confirmBtnContent: '',
          confirmBtnClass: 'hidden',
          animation: 'fadeInDown'
      };
        this.popup3.options = {
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



  onWorkerChange(fullname, i) {
    this.shifts[i].worker = this.workers.find(x => x.worker.fullname === fullname).worker;
    if (this.shifts.filter(x => x.worker.fullname === fullname).length > 1) {
      if (this.shifts.findIndex(y => y.worker.fullname === fullname) < i) {
        this.shifts.filter(z => z.worker.fullname === fullname)[0].worker = new Worker();
      } else {
        this.shifts.filter(z => z.worker.fullname === fullname)[1].worker = new Worker();
      }
    }
    console.log(this.shifts);
  }


  whenChange(date: Date) {
    console.log('whenChange!!');
    this.worker = new WorkerRole();
    this.shiftDate = date;
    console.log(this.datepipe.transform(date, 'yyyy-MM-dd'));
    this._shiftService.getShift(this.datepipe.transform(date, 'yyyy-MM-dd')).subscribe((shifts) => {
      this.shifts = shifts;
      console.log(this.shifts);
    }, (error) => {
      this.errorPopup = 'Podczas wczytywania obsady wystąpił błąd';
      this.popup2.show(this.popup2.options);
      console.log(error);
    });
  }

  updateShifts() {
    this.flag = 0;
    for (let i = 0; i < this.shifts.length; i++) {
      if (!this.shifts[i].worker.id) {
        this.flag = 1;
      }
    }
    if (this.flag === 1) {
      this.popup1.show();
    } else {
    this.processUpdate(); }
  }

  noUpdate() {
    console.log('no process!');
    this.popup1.hide();
  }

  processUpdate() {
    for (let i = 0; i < this.shifts.length; i++) {
      if (!this.shifts[i].worker.id) {
        this.shifts.splice(i, 1);
        i--;
      } else {
      this.shifts[i].taken_seats = 0;
      this.shifts[i].date = this.datepipe.transform(this.shiftDate, 'yyyy-MM-dd'); }
      this._smsService.sendSMSShift(this.shifts[i].date, this.shifts[i].worker, this.shifts[i].attraction)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
    console.log('process!');
    this._shiftService.updateShifts(this.shifts).subscribe((shifts) => {
      console.log(shifts);
      this.popup3.show(this.popup3.options);
    }, (error) => {
      this.errorPopup = 'Podczas aktualizacji obsady wystąpił błąd';
      this.popup2.show(this.popup2.options);
      console.log(error);
    });
    this.popup1.hide();
  }

}
