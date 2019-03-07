import { Attraction } from './../classes/attraction';
import { Globals } from './../classes/globals';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { WorkerRole } from '../classes/worker-role';
import { Worker } from '../classes/worker';

@Injectable({
  providedIn: 'root'
})
export class SmsService {


  constructor(private _http: Http, private _globals: Globals) { }


  sendSMSToTechnic(worker: Worker, attraction: Attraction) {
    const uri = 'Od Kamil Koliński: Atrakcja ' + attraction.name + ' uległa awarii. Proszę o niezwłoczną naprawę. Pozdrawiam.';
    const encoded = encodeURI(uri);
    const url = 'https://api.gsmservice.pl/v5/send.php?login=kolin&pass=qweqwe&recipient=' +
    worker.phoneNumber + '&message=' +
    encoded + '&sender=apmh&msg_type=3&encoding=utf-8&unicode=0&sandbox=0';
    console.log(uri);
    console.log(encoded);
    console.log(url);
    return this._http.post(url, null)
    .pipe(map((response: Response) => response.json()))
    .pipe(catchError(this.errorHandler));
 }

 sendSMSRequestAccepted(date: string, worker: Worker) {
  const uri = 'Od Kamil Koliński: Prośba o zmianę obsady w terminie ' + date +
  ' została przyjęta. Proszę oczekiwać kolejnych informacji.';
  const encoded = encodeURI(uri);
  const url = 'https://api.gsmservice.pl/v5/send.php?login=kolin&pass=qweqwe&recipient=' +
  worker.phoneNumber + '&message=' +
  encoded + '&sender=apmh&msg_type=3&encoding=utf-8&unicode=0&sandbox=0';
  return this._http.post(url, null)
  .pipe(map((response: Response) => response.json()))
  .pipe(catchError(this.errorHandler));
 }

 sendSMSRequestRejected(date: string, worker: Worker) {
  const uri = 'Od Kamil Koliński: Prośba o zmianę obsady w terminie ' + date +
  ' została odrzucona. Pozdrawiam.';
  const encoded = encodeURI(uri);
  const url = 'https://api.gsmservice.pl/v5/send.php?login=kolin&pass=qweqwe&recipient=' +
  worker.phoneNumber + '&message=' +
  encoded + '&sender=apmh&msg_type=3&encoding=utf-8&unicode=0&sandbox=0';
  return this._http.post(url, null)
  .pipe(map((response: Response) => response.json()))
  .pipe(catchError(this.errorHandler));
 }

 sendSMSShift(date: string, worker: Worker, attraction: Attraction) {
  const uri = 'Od Kamil Koliński: Zaktualizowano obsadę na dzień ' + date + '. Proszę stawić się na stanowisku ' +
  attraction.name + '. Pozdrawiam.';
  const encoded = encodeURI(uri);
  const url = 'https://api.gsmservice.pl/v5/send.php?login=kolin&pass=qweqwe&recipient=' +
  worker.phoneNumber + '&message=' +
  encoded + '&sender=apmh&msg_type=3&encoding=utf-8&unicode=0&sandbox=0';
  return this._http.post(url, null)
  .pipe(map((response: Response) => response.json()))
  .pipe(catchError(this.errorHandler));
 }

 errorHandler(error: Response) {
   return Observable.throw(error || 'SERVER ERROR');
 }
}
