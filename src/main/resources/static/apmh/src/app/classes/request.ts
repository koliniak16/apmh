import { Shift } from 'src/app/classes/shift';
import { Attraction } from './attraction';
import { Worker } from './worker';
export class Request {
  id: Number;
  is_closed: Boolean;
  opening_date;
  worker = new Worker();
  attraction = new Attraction();
  shift = new Shift();
}
