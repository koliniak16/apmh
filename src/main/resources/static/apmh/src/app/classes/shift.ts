import { Attraction } from 'src/app/classes/attraction';
import { Worker } from 'src/app/classes/worker';

export class Shift {
  id: Number;
  date;
  worker: Worker;
  attraction: Attraction;
  taken_seats: Number;
}
