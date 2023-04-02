import { Component } from '@angular/core';
import { DEP_DICTIONARY } from '../../../shared/departementsDictionary';
import { DicoDep } from '../../../shared/interfaces/dicoDep.interface';

@Component({
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html',
  styleUrls: ['./departements-list.component.scss']
})
export class DepartementsListComponent {

  public departementsList: DicoDep[] = DEP_DICTIONARY
  public foundDepartemets: number[] = [1, 2, 3, 4];

}
