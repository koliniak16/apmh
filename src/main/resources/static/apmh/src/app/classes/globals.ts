import { Shift } from './shift';
import { Attraction } from 'src/app/classes/attraction';
import { Worker } from './worker';
import { Body } from '../classes/body';
import { Injectable } from '@angular/core';
import { Token } from '../classes/token';
import { WorkerRole } from './worker-role';
import { Request } from './request';


@Injectable()
export class Globals {
  token: Token;
  body: Body;
  userPosition: String;
  user_kierownik = 0;
  user_technik = 0;
  user_pracownik = 0;
  router_log = 1;
  router_worker_list = 0;
  router_worker_form_add = 0;
  router_attraction_list = 0;
  router_shift_management = 0;
  router_technic_site = 0;
  router_taken_seats = 0;
  router_request_site = 0;
  router_request_check = 0;
  is_logged_in = false;
  worker = new Worker();
  workerRole = new WorkerRole();
  attraction = new Attraction();
  shift: Shift;
  id_t: Number;
  request: Request;
}
