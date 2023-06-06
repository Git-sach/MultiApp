import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, map } from 'rxjs';
import { Departement, DepartementFoView } from '../../../shared/interfaces/departement.interface';
import { GeoNamesNumbersService } from '../../../shared/services/geo-names-numbers.service';

@Component({
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html',
  styleUrls: ['./departements-list.component.scss']
})
export class DepartementsListComponent implements OnInit, OnDestroy{

  public showNotFound = true;
  public departementsList: DepartementFoView[] = [];
  public numberOfDepartmentsFound: number = 0;
  private subsciption?: Subscription;

  constructor( private geoNamesNumbersService: GeoNamesNumbersService){}

  ngOnInit(): void {
    // gérer l'unsubscribe
    this.geoNamesNumbersService.showNotFound$.subscribe((showNotFound) => {
      this.showNotFound = showNotFound;
    });
    this.subsciption = this.geoNamesNumbersService.getFoundDepartementList().pipe(
      // pipe pour transformer les nombre 20 et 96 de la corse, en 2A et 2B
      map((foundDepartment: DepartementFoView[]) => {
        return foundDepartment.map((foundDepartment: DepartementFoView) => {
          if (foundDepartment.code === 96) {
            return {
              code: '2A',
              name: foundDepartment.name,
              found: foundDepartment.found}
          }
          if (foundDepartment.code === 20) {
            return {
              code: '2B',
              name: foundDepartment.name,
              found: foundDepartment.found}
          }
          return foundDepartment
        })
      })
    )
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
