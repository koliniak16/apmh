import { Popup } from 'ng2-opd-popup';
import { ShiftService } from './../../shared-service/shift.service';
import { Globals } from './../../classes/globals';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Shift } from 'src/app/classes/shift';
import { DatePipe } from '@angular/common';
import { WorkerService } from 'src/app/shared-service/worker.service';
import { WorkerRole } from 'src/app/classes/worker-role';
import { LoginServiceService } from 'src/app/shared-service/login.service';

@Component({
  selector: 'app-taken-seats',
  templateUrl: './taken-seats.component.html',
  styleUrls: ['./taken-seats.component.css']
})
export class TakenSeatsComponent implements OnInit {

  maxDate: Date;
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
    private _workerService: WorkerService, private _loginService: LoginServiceService ) {
    this._loginService.checkUser();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Pracownik') {
      this._loginService.logOut();
    }

    this._loginService.checkUser();
        this._globals.shift = new Shift();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ) {
      this._router.navigate(['/']);
    } else {
           }

           this.popup1.options = {
            header: 'Uwaga!',
            color: 'yellow',
            widthProsentage: 20,
            animationDuration: 1,
            showButtons: true,
            cancleBtnContent: 'Ok',
            cancleBtnClass: 'btn btn-default',
            confirmBtnContent: '',
            confirmBtnClass: 'hidden',
            animation: 'fadeInDown'
        };
        this.popup2.options = {
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

  onSeatsChange(takenSeats: Number, index) {
    if (+takenSeats > this.shifts[index].attraction.maxSeats) {
      this.shifts[index].taken_seats = 0;
    }
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
      this.popup2.show(this.popup2.options);
      console.log(error);
    });
  }

  updateShifts() {
    this.flag = 0;
    for (let i = 0; i < this.shifts.length; i++) {
      if (!this.shifts[i].taken_seats) {
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
      }
    }
    console.log('process!');
    this._shiftService.updateShifts(this.shifts).subscribe((shifts) => {
      console.log(shifts);
      this.popup3.show(this.popup3.options);
    }, (error) => {
      this.errorPopup = 'Podczas aktualizacji frekwencji wystąpił błąd';
      this.popup2.show(this.popup2.options);
      console.log(error);
    });
    this.popup1.hide();
  }

}
