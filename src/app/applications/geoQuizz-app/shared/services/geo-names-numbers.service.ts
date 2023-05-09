import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, first, map, Observable, of, tap } from 'rxjs';
import { DEP_DICTIONARY } from '../departementsDictionary';
import { Departement } from '../interfaces/departement.interface';
import { DictionaryDepartments } from '../interfaces/DictionaryDepartments.interface';


@Injectable({
  providedIn: 'root'
})
export class GeoNamesNumbersService {

  public departementsListDico: DictionaryDepartments = DEP_DICTIONARY;
  public departmentsList: Departement[] = []
  public departementsNumberFoundList$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public departementsFoundList$: BehaviorSubject<Departement[]> = new BehaviorSubject<Departement[]>([]);
  public showNotFound$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.resetFoundDepatmentList();
  }

  public getFoundDepartementList(): BehaviorSubject<Departement[]>{
    this.departementsNumberFoundList$.subscribe((numbersFound) => {
      numbersFound.forEach((number) => {
        this.departmentsList[number-1].found = true;
      });
      this.departementsFoundList$.next(this.departmentsList);
    });
    return this.departementsFoundList$
  };

  public getAllDepartmentList(): BehaviorSubject<Departement[]> {
    for (let key in this.departmentsList){
      this.departmentsList[key].found = true;
    }
    this.departementsFoundList$.next(this.departmentsList);
    return this.departementsFoundList$
  };

    /** Methode qui compart l'input département avec le disconaire de départements
   * -> retourne
   *    -> le numero de depatement si il y a match
   *    -> 0 sinon
   * -> puis vide l'input
   */
    public comparDepartementInput(input: string): number {
      let numberDepartement = 0;
      for (const key in this.departementsListDico) {
        // every a le même comportement de forEche mise a part que l'ont peut 'break' en renournant false
        this.departementsListDico[key].every((departementName: string) => {
          if(input === departementName.toUpperCase()){
            numberDepartement = +key;
            return false;
          }
          return true
        })
      }
      return numberDepartement;
    }

    public resetFoundDepatmentList(): void {
      this.departmentsList = []
      for (let key in this.departementsListDico){
        this.departmentsList.push({
          code: +key,
          name: this.departementsListDico[key][0],
          found: false
        })
      }
      this.departementsFoundList$.next(this.departmentsList)
    }
};
