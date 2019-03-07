import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { WorkerRole } from 'src/app/classes/worker-role';

import { WorkerService } from '../../shared-service/worker.service';
import { Globals } from './../../classes/globals';
import { Worker } from './../../classes/worker';
import { LoginServiceService } from './../../shared-service/login.service';

@Component({
  selector: 'app-list-worker',
  templateUrl: './list-worker.component.html',
  styleUrls: ['./list-worker.component.css']
})
@Injectable()
export class ListWorkerComponent implements OnInit {

  public workers = new Array<WorkerRole>();
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  public errorPopup: string;

  constructor(private _workerService: WorkerService, private _router: Router, public _globals: Globals,
    private _loginService: LoginServiceService) {
    this._loginService.checkUser();
    this._globals.workerRole = new WorkerRole();


   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Kierownik') {
      this._loginService.logOut();
    }

    this._loginService.checkUser();
    this._globals.router_worker_form_add = 0;
    this._globals.workerRole = new WorkerRole();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ) {
      this._router.navigate(['/']);
    } else {
    this._workerService.getWorkers().subscribe((workers) => {
      this.workers = workers;
    }, (error) => {
      console.log(error);
      this.errorPopup = 'Podczas ładowania pracownikow wystąpił błąd.';
      this.popup2.show(this.popup2.options);
    });
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
            color: 'red',
            widthProsentage: 20,
            animationDuration: 1,
            showButtons: true,
            cancleBtnContent: 'Wstecz',
            cancleBtnClass: 'btn btn-default',
            animation: 'fadeInDown',
            confirmBtnContent: '',
            confirmBtnClass: 'hidden'
        };
  }

  updateWorker(worker: WorkerRole) {
    this._globals.workerRole = worker;
    this._router.navigate(['/worker-form']);
  }

  newWorker() {
    const worker = new Worker();
    this._globals.router_worker_form_add = 1;
    this._router.navigate(['/worker-form']);
  }

  detailsWorker(worker: Worker) {
    console.log('Guzik działa');
    console.log(this._router.url);
  }

  processDelete() {
    this.workers.splice(this.workers.indexOf(this._globals.workerRole), 1);
    this._workerService.deleteWorker(this._globals.workerRole.worker.id).subscribe((data) => {
    }, (error) => {
      console.log(error);
      this.errorPopup = 'Podczas usuwania pracownika wystąpił błąd.';
      this.popup2.show(this.popup2.options);
    });
    this._globals.worker = new Worker();
    this.popup1.hide();
  }

  noDelete() {
    this._globals.worker = new Worker();
    this.popup1.hide();
  }

  askDelete(worker: WorkerRole) {
    this._globals.workerRole = worker;
    this.popup1.show();
  }


}
