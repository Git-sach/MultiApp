import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryGame } from '../interfaces/historyGames.interface';

const HISTORY: HistoryGame[] = [
  {
    date: new Date('2022-07-15T12:30:00.000Z'),
    time: new Date('1970-01-01T00:05:00.000Z'),
    percentage: 1,
    departmentsFound: [5]
  },
  {
    date: new Date('2022-12-28T16:45:00.000Z'),
    time: new Date('1970-01-01T00:08:00.000Z'),
    percentage: 78,
    departmentsFound: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,19,36, 58, 11, 73, 92, 40, 88, 9, 65, 21, 50, 82, 26]
  },
  {
    date: new Date('2022-08-03T20:15:00.000Z'),
    time: new Date('1970-01-01T00:01:00.000Z'),
    percentage: 3,
    departmentsFound: [30, 97, 46, 72, 20]
  },
  {
    date: new Date('2022-11-02T07:20:00.000Z'),
    time: new Date('1970-01-01T00:03:00.000Z'),
    percentage: 7,
    departmentsFound: [32, 75, 5, 58, 66, 81, 17, 69, 89, 49]
  },
  {
    date: new Date('2022-09-18T03:50:00.000Z'),
    time: new Date('1970-01-01T00:09:00.000Z'),
    percentage: 1,
    departmentsFound: [57]
  },
  {
    date: new Date('2022-10-05T09:35:00.000Z'),
    time: new Date('1970-01-01T00:06:00.000Z'),
    percentage: 4,
    departmentsFound: [12, 34, 67, 41]
  },
  {
    date: new Date('2022-12-12T21:55:00.000Z'),
    time: new Date('1970-01-01T00:07:00.000Z'),
    percentage: 6,
    departmentsFound: [76, 14, 53, 43, 29, 90, 15]
  },
  {
    date: new Date('2022-09-26T17:10:00.000Z'),
    time: new Date('1970-01-01T00:03:00.000Z'),
    percentage: 10,
    departmentsFound: [37, 3, 8, 28, 71, 86, 47, 77, 61, 24]
  },
  {
    date: new Date('2022-09-03T22:25:00.000Z'),
    time: new Date('1970-01-01T00:08:00.000Z'),
    percentage: 6,
    departmentsFound: [54, 31, 10, 59, 25, 33]
  },
  {
    date: new Date('2022-10-17T05:40:00.000Z'),
    time: new Date('1970-01-01T00:06:00.000Z'),
    percentage: 3,
    departmentsFound: [83, 45, 13]
  },
  {
    date: new Date('2022-11-23T11:50:00.000Z'),
    time: new Date('1970-01-01T00:05:00.000Z'),
    percentage: 1,
    departmentsFound: [93]
  },
  {
    date: new Date('2022-10-30T14:15:00.000Z'),
    time: new Date('1970-01-01T00:02:00.000Z'),
    percentage: 7,
    departmentsFound: [38, 16, 79, 27, 18, 42, 60, 80, 74, 51]
  },
  {
    date: new Date('2022-12-08T18:30:00.000Z'),
    time: new Date('1970-01-01T00:10:00.000Z'),
    percentage: 5,
    departmentsFound: [63, 95, 56, 7, 68]
  },
  {
    date: new Date('2022-08-26T00:55:00.000Z'),
    time: new Date('1970-01-01T00:06:00.000Z'),
    percentage: 9,
    departmentsFound: [39, 91, 2, 64, 85, 4, 70, 78, 22]
  },
  {
    date: new Date('2022-12-19T07:20:00.000Z'),
    time: new Date('1970-01-01T00:01:00.000Z'),
    percentage: 4,
    departmentsFound: [52, 44, 35, 96]
  },
  {
    date: new Date('2022-10-14T03:50:00.000Z'),
    time: new Date('1970-01-01T00:04:00.000Z'),
    percentage: 2,
    departmentsFound: [98, 6]
  },
  {
    date: new Date('2022-08-21T08:05:00.000Z'),
    time: new Date('1970-01-01T00:01:00.000Z'),
    percentage: 10,
    departmentsFound: [76, 13, 91, 32, 26, 3, 60, 75, 11, 89]
  },
  {
    date: new Date('2022-10-27T10:20:00.000Z'),
    time: new Date('1970-01-01T00:04:00.000Z'),
    percentage: 3,
    departmentsFound: [56, 92, 70]
  },
  {
    date: new Date('2022-09-09T14:35:00.000Z'),
    time: new Date('1970-01-01T00:02:00.000Z'),
    percentage: 9,
    departmentsFound: [68, 51, 43, 32, 84, 76, 59, 26, 74]
  }
]

@Injectable({
  providedIn: 'root'
})
export class GeoHistoryGamesService {

  public historyGames$: BehaviorSubject<HistoryGame[]> = new BehaviorSubject<HistoryGame[]>(HISTORY);
  public historyGameSelected$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor() {}
}
