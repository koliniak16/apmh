import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { Attraction } from 'src/app/classes/attraction';

import { Globals } from './../../classes/globals';
import { AttractionService } from './../../shared-service/attraction.service';
import { LoginServiceService } from './../../shared-service/login.service';

@Component({
  selector: 'app-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.css']
})
@Injectable()
export class AttractionFormComponent implements OnInit {

  public attraction: Attraction;
  public name = '';
  public maxSeats: Number = 0;
  public errorPopup: string;

  constructor(private _attractionService: AttractionService, private _router: Router, public _globals: Globals,
    private _loginService: LoginServiceService, private popup: Popup) {
      this.popup.options = {
        header: 'Uwaga!',
        color: 'red',
        widthProsentage: 20,
        animationDuration: 1,
        showButtons: true,
        cancleBtnContent: 'Wstecz',
        cancleBtnClass: 'btn btn-default',
        animation: 'fadeInDown'
    };
   }

  ngOnInit() {

    if (localStorage.getItem('userPosition') !== 'Kierownik') {
      this._loginService.logOut();
    }

    this.attraction = this._globals.attraction;
    this.name = this.attraction.name.toString();
    this.maxSeats = this.attraction.maxSeats;
  }

  cancel() {
    this._router.navigate(['/attraction-list']);
  }

  processForm() {
    if (this.name) {this.attraction.name = this.name; }
    if (this.maxSeats) {this.attraction.maxSeats = this.maxSeats; }
    if (this.attraction.id === undefined) {
      this._attractionService.createAttraction(this.attraction).subscribe((attraction) => {
        console.log(attraction);
        localStorage.setItem('route', 'attraction_list');
        this._router.navigate(['/attraction-list']);
      }, (error) => {
        console.log(error);
        this.errorPopup = 'Podczas aktualizacji wystąpił błąd. Sprawdz czy dane zostały uzupełnione poprawnie i sprobuj ponownie.';
        this.popup.show(this.popup.options);
      });
    } else {
        this._attractionService.updateAttraction(this.attraction).subscribe((attraction) => {
          console.log(attraction);
          localStorage.setItem('route', 'attraction_list');
          this._router.navigate(['/attraction-list']);
        }, (error) => {
          console.log(error);
          this.errorPopup = 'Podczas aktualizacji wystąpił błąd. Sprawdz czy dane zostały uzupełnione poprawnie i sprobuj ponownie.';
          this.popup.show(this.popup.options);
        });
      }
    }

}
