import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { DEP_DICTIONARY } from '../../../shared/departementsDictionary';
import { DicoDep } from '../../../shared/interfaces/dicoDep.interface';

@Component({
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html',
  styleUrls: ['./departements-list.component.scss']
})
export class DepartementsListComponent implements DoCheck{

  @Input() public foundNumbersDepartements: number[] = [];
  public departementsList: DicoDep[] = []

  ngDoCheck(): void {
    this.getFoundDepartementList();
  }

  public getFoundDepartementList(): void{
    const allDepartements = DEP_DICTIONARY;
    this.departementsList = allDepartements.filter((departement) => {
      return this.foundNumbersDepartements.includes(departement.number)
    });
  }

}
