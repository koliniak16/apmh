import { LoginServiceService } from './../../shared-service/login.service';
import { DatePipe } from '@angular/common';
import { Notification } from './../../classes/notification';
import { Worker } from './../../classes/worker';
import { Globals } from './../../classes/globals';
import { Router } from '@angular/router';
import { AttractionService } from './../../shared-service/attraction.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Attraction } from 'src/app/classes/attraction';
import { Popup } from 'ng2-opd-popup';
import { WorkerService } from 'src/app/shared-service/worker.service';
import { WorkerRole } from 'src/app/classes/worker-role';
import { SmsService } from 'src/app/shared-service/sms.service';

@Component({
  selector: 'app-list-attraction',
  templateUrl: './list-attraction.component.html',
  styleUrls: ['./list-attraction.component.css']
})
export class ListAttractionComponent implements OnInit {

  public attractions = new Array<Attraction>();
  public workers = new Array<WorkerRole>();
  public worker = new Worker();
  public notification = new Notification();
  public errorPopup: string;
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;

  constructor(private _attractionService: AttractionService, private _router: Router, public _globals: Globals,
    private _workerService: WorkerService, public datepipe: DatePipe, private _loginService: LoginServiceService,
    private _smsService: SmsService) {
    this._loginService.checkUser();
    this._globals.attraction = new Attraction();
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Kierownik') {
      this._loginService.logOut();
    }


    this._loginService.checkUser();
    this._globals.attraction = new Attraction();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ) {
      this._router.navigate(['/']);
    } else {
    this._attractionService.getAttractions().subscribe((attractions) => {
      this.attractions = attractions;
    }, (error) => {
      console.log(error);
    });
           }

           this.popup3.options = {
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
  }

  updateAttraction(attraction: Attraction) {
    this._globals.attraction = attraction;
    this._router.navigate(['/attraction-form']);
  }

  newAttraction() {
    const attraction = new Attraction();
    this._router.navigate(['/attraction-form']);
  }

  processDelete() {
    console.log(this.attractions.splice(this.attractions.indexOf(this._globals.attraction), 1));
     this._attractionService.deleteAttraction(this._globals.attraction.id).subscribe((data) => {
     }, (error) => {
       console.log(error);
       this.errorPopup = 'Podczas usuwania pracownika wystąpił błąd.';
       this.popup3.show(this.popup3.options);
     });
    this._globals.attraction = new Attraction();
    this.popup1.hide();
    console.log(this.attractions);
  }

  noDelete() {
    this._globals.attraction = new Attraction();
    this.popup1.hide();
  }

  askDelete(attraction: Attraction) {
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
    this._globals.attraction = attraction;
    this.popup1.show(this.popup1.options);
  }

  processBreakdown() {
    this.notification.attraction = this._globals.attraction;
    this.notification.worker = this._globals.worker;
    this.notification.opening_date = new Date();
    this.notification.opening_date = this.datepipe.transform(this.notification.opening_date, 'yyyy-MM-dd');
    this.notification.is_closed = false;
    this.notification.attraction.is_out_of_order = 1;
    this._attractionService.updateBreakdown(this.notification).subscribe((notification) => {
      console.log(notification);
    }, (error) => {
      console.log(error);
      this.errorPopup = 'Podczas zgłaszania usterki wystąpił błąd.';
      this.popup3.show(this.popup3.options);
    });
    this._smsService.sendSMSToTechnic(this._globals.worker, this._globals.attraction).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    this.popup2.hide();
  }

  noBreakdown() {
    this._globals.attraction = new Attraction();
    this._globals.worker = new Worker();
    this.popup2.hide();
  }

  breakdownAttraction(attraction: Attraction) {
    this._globals.attraction = attraction;
    this._workerService.getTechnics().subscribe((workers) => {
      this.workers = workers;
    }, (error) => {
      this.errorPopup = 'Podczas wczytywania listy pracownikow nastąpił błąd.';
      this.popup3.show(this.popup3.options);
      console.log(error);
    });
    this.popup2.options = {
      header: '',
      color: 'gray',
      widthProsentage: 20,
      animationDuration: 1,
      showButtons: true,
      confirmBtnContent: 'Zgłoś',
      cancleBtnContent: 'Wstecz',
      confirmBtnClass: 'btn btn-default',
      cancleBtnClass: 'btn btn-default',
      animation: 'fadeInDown'
  };
  this.popup2.show(this.popup2.options);
  }

  onWorkerChange(fullname: string) {
    this._globals.worker = this.workers.find(x => x.worker.fullname === fullname).worker;
    console.log(this._globals.worker);
  }

}
