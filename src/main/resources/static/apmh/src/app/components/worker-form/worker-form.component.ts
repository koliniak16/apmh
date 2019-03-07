import { Globals } from './../../classes/globals';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from '../../shared-service/worker.service';
import { WorkerRole } from 'src/app/classes/worker-role';
import { LoginServiceService } from 'src/app/shared-service/login.service';
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.css']
})
@Injectable()
export class WorkerFormComponent implements OnInit {

  public workerRole: WorkerRole;
  public name = '';
  public surname = '';
  public username = '';
  public password = '';
  public position = '';
  public phoneNumber = '';
  public errorPopup: string;


  constructor(private _workerService: WorkerService, private _router: Router, public _globals: Globals,
     private _loginService: LoginServiceService, private popup: Popup) {
    console.log(this._globals.router_worker_form_add);
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Kierownik') {
      this._loginService.logOut();
    }

    this.workerRole = this._globals.workerRole;
    if (this.workerRole.worker.name) {
      this.name = this.workerRole.worker.name;
      this.surname = this.workerRole.worker.surname;
      this.username = this.workerRole.worker.username;
      this.password = this.workerRole.worker.password;
      this.phoneNumber = this.workerRole.worker.phoneNumber;
      this.position = this.workerRole.role.position;
    }

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

  cancel() {
    localStorage.setItem('route', 'worker_list');
    this._router.navigate(['/worker-list']);
  }

  processForm() {
    if (this.name) {this.workerRole.worker.name = this.name; }
    if (this.surname) {this.workerRole.worker.surname = this.surname; }
    if (this.username) {this.workerRole.worker.username = this.username; }
    if (this.password) {this.workerRole.worker.password = this.password; }
    if (this.phoneNumber) {this.workerRole.worker.phoneNumber = this.phoneNumber; }
    if (this.position) {this.workerRole.role.position = this.position; }
    if (this.workerRole.worker.id === undefined) {
      this._workerService.createWorker(this.workerRole).subscribe((worker) => {
        console.log(worker);
        localStorage.setItem('route', 'worker_list');
        this._router.navigate(['/worker-list']);
      }, (error) => {
        this.errorPopup = 'Podczas aktualizacji pracownika wystąpił błąd';
        this.popup.show(this.popup.options);
        console.log(error);
      });
    } else {
        this._workerService.updateWorker(this.workerRole).subscribe((worker) => {
          console.log(worker);
          localStorage.setItem('route', 'worker_list');
          this._router.navigate(['/worker-list']);
        }, (error) => {
          this.errorPopup = 'Podczas aktualizacji pracownika wystąpił błąd';
      this.popup.show(this.popup.options);
          console.log(error);
        });
      }
    }


  }

