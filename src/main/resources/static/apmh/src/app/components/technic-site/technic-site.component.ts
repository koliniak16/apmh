import { Notification } from './../../classes/notification';
import { Router } from '@angular/router';
import { Globals } from './../../classes/globals';
import { LoginServiceService } from './../../shared-service/login.service';
import { DatePipe } from '@angular/common';
import { AttractionService } from './../../shared-service/attraction.service';
import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/shared-service/worker.service';
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-technic-site',
  templateUrl: './technic-site.component.html',
  styleUrls: ['./technic-site.component.css']
})
export class TechnicSiteComponent implements OnInit {

  public notifications = new Array<Notification>();
  public errorPopup: string;

  constructor(private _attractionService: AttractionService, private _router: Router, public _globals: Globals,
    private _workerService: WorkerService, public datepipe: DatePipe, private _loginService: LoginServiceService,
    private popup: Popup) {

     }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Technik') {
      this._loginService.logOut();
    }

    this._loginService.checkUser();

    this._attractionService.getNotifications(+localStorage.getItem('id_t')).subscribe((notifications) => {
      this.notifications = notifications;
      console.log(notifications);
    }, (error) => {
      this.errorPopup = 'Podczas wczytywania listy usterek wystąpił błąd';
      this.popup.show(this.popup.options);
      console.log(error);
    });

    this.popup.options = {
      header: 'Uwaga!',
      color: 'yellow',
      widthProsentage: 20,
      animationDuration: 1,
      showButtons: true,
      cancleBtnContent: 'Wstecz',
      confirmBtnContent: '',
      confirmBtnClass: 'hidden',
      cancleBtnClass: 'btn btn-default',
      animation: 'fadeInDown'
  };
  }


  repair(notification: Notification) {
    notification.closure_date = new Date();
    notification.closure_date = this.datepipe.transform(notification.closure_date, 'yyyy-MM-dd');
    notification.is_closed = true;
    notification.attraction.is_out_of_order = 0;
    this.notifications.splice(this.notifications.indexOf(notification), 1);
    this._attractionService.updateRepair(notification).subscribe((notification_d) => {
      console.log(notification_d);
    }, (error) => {
      this.errorPopup = 'Podczas aktualizacji usterki wystąpił błąd';
      this.popup.show(this.popup.options);
      console.log(error);
    });
  }

}
