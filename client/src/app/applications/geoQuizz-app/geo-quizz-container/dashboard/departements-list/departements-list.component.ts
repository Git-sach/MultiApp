import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Departement } from '../../../shared/interfaces/departement.interface';
import { DictionaryDepartments } from '../../../shared/interfaces/DictionaryDepartments.interface';
import { GeoNamesNumbersService } from '../../../shared/services/geo-names-numbers.service';

@Component({
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html',
  styleUrls: ['./departements-list.component.scss']
})
export class DepartementsListComponent implements OnInit, OnDestroy{

  public showNotFound = true;
  public departementsList: Departement[] = [];
  public numberOfDepartmentsFound: number = 0;
  private subsciption?: Subscription;

  constructor( private geoNamesNumbersService: GeoNamesNumbersService){}

  ngOnInit(): void {
    // gérer l'unsubscribe
    this.geoNamesNumbersService.showNotFound$.subscribe((showNotFound) => {
      this.showNotFound = showNotFound;
    });
    this.subsciption = this.geoNamesNumbersService.getFoundDepartementList()
    .subscribe((foundDepartementList) => {
      this.departementsList = foundDepartementList
      this.numberOfDepartmentsFound = 0;
      for (let key in foundDepartementList) {
        if (foundDepartementList[key].found) {
          this.numberOfDepartmentsFound++;
        }
      }
    });

    //debug
    // this.geoNamesNumbersService.getAllDepartmentList().subscribe((foundDepartementList) => {
    //   this.departementsList = foundDepartementList
    // });
   }

   ngOnDestroy(): void {
    this.subsciption?.unsubscribe();
   }
}
