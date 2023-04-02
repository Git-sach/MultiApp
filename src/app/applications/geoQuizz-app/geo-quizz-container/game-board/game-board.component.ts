import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Departement } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';
import { DEP_DICTIONARY } from './departementsDictionary';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy, DoCheck{

  public foundDepartements: Departement[] = [];
  public inputDepartementForm: FormGroup = new FormGroup({
    inputDepartements: new FormControl()
  });

  private foundNumbersDepartements: number[] = [];
  private subsciption?: Subscription;

  constructor(private geoPolygonsService: GeoPolygonsService){}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    let departementNumber = this.comparDepartementInput();
    if(departementNumber != 0){
      this.foundNumbersDepartements.push(departementNumber);
      this.subsciption = this.geoPolygonsService.getDepartementsByIds(this.foundNumbersDepartements).subscribe((map) => {
        this.foundDepartements = map;
      });
    }
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }

  /** Methode qui compart l'input département avec le disconaire de départements
   * -> retourne
   *    -> le numero de depatement si il y a match
   *    -> 0 sinon
   * -> puis vide l'input
   */
  public comparDepartementInput(): number {
    let inputDepartementValue = this.inputDepartementForm.get('inputDepartements')?.value?.toUpperCase();
    let nameMatch = false;
    let numberDepartement = 0
    // every a le même comportement de forEche mise a part que l'ont peut 'break' en renournant false
    DEP_DICTIONARY.every((departement) => {
      departement.name.forEach((name) => {
        if(inputDepartementValue === name.toUpperCase()){
          nameMatch = true;
        }
      })
      if(nameMatch){
        numberDepartement = departement.number;
        this.inputDepartementForm.reset();
        return false;
      } else {
        return true;
      }
    })
    return numberDepartement;
  }
}
