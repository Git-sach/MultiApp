import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, first, map, Observable, of, tap } from 'rxjs';
import { DEP_DICTIONARY } from '../departementsDictionary';
import { Departement } from '../interfaces/departement.interface';
import { DictionaryDepartments } from '../interfaces/DictionaryDepartments.interface';


@Injectable({
  providedIn: 'root'
})
export class GeoNamesNumbersService {

  public departementsList: DictionaryDepartments = DEP_DICTIONARY;
  public departementsNumberFoundList$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public departementsFoundList$: BehaviorSubject<Departement[]> = new BehaviorSubject<Departement[]>([]);

  constructor() {
  }

  public getFoundDepartementList(): BehaviorSubject<Departement[]>{
    this.departementsNumberFoundList$.subscribe((numbersFound) => {
      console.log(numbersFound);

      let departementsFoundList: Departement[] = [];
      numbersFound.forEach((number) => {
        departementsFoundList.push({
          code: number,
          name: this.departementsList[number][0]
        });
      });
      this.departementsFoundList$.next(departementsFoundList);
    });
    return this.departementsFoundList$
  }
}
