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

  public departementsList: Departement[] = [];
  private subsciption?: Subscription;

  constructor( private geoNamesNumbersService: GeoNamesNumbersService){}

  ngOnInit(): void {
    this.subsciption = this.geoNamesNumbersService.getFoundDepartementList()
    .subscribe((foundDepartementList) => {
      this.departementsList = foundDepartementList
    });
   }

   ngOnDestroy(): void {
    this.subsciption?.unsubscribe();
   }
}
