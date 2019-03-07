import { Worker } from './worker';
import { Attraction } from 'src/app/classes/attraction';
export class Notification {
  id: Number;
  is_closed: Boolean;
  opening_date;
  closure_date;
  worker = new Worker();
  attraction = new Attraction();
}
