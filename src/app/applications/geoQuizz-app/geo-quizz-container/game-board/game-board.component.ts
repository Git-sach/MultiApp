import { Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DepartementSvg } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';
import { GeoNamesNumbersService } from '../../shared/services/geo-names-numbers.service';
import { DictionaryDepartments } from '../../shared/interfaces/DictionaryDepartments.interface';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy, DoCheck{

  public foundDepartements: DepartementSvg[] = [];
  public inputDepartementForm: FormGroup = new FormGroup({
    inputDepartements: new FormControl()
  });
  private foundNumbersDepartements: number[] = [];
  private subsciption?: Subscription;
  private departementList: DictionaryDepartments = {};

  constructor(
    private geoPolygonsService: GeoPolygonsService,
    private geoNamesNumbersService: GeoNamesNumbersService
  ){}

  ngOnInit(): void {
      this.departementList = this.geoNamesNumbersService.departementsList;
  }

  ngDoCheck(): void {
    let departementNumber = this.comparDepartementInput();

    if(departementNumber != 0 && !this.foundNumbersDepartements.includes(departementNumber)){
      this.foundNumbersDepartements.push(departementNumber);
      this.subsciption = this.geoPolygonsService.getDepartementsByIds(this.foundNumbersDepartements).subscribe((map) => {
        this.foundDepartements = map;
      });
      this.geoNamesNumbersService.departementsNumberFoundList$.next(this.foundNumbersDepartements);
    };
  }

  /** Methode qui compart l'input département avec le disconaire de départements
   * -> retourne
   *    -> le numero de depatement si il y a match
   *    -> 0 sinon
   * -> puis vide l'input
   */
  public comparDepartementInput(): number {
    let inputDepartementValue = this.inputDepartementForm.get('inputDepartements')?.value?.toUpperCase();
    let numberDepartement = 0;
    for (const key in this.departementList) {
      // every a le même comportement de forEche mise a part que l'ont peut 'break' en renournant false
      this.departementList[key].every((departementName: string) => {
        if(inputDepartementValue === departementName.toUpperCase()){
          numberDepartement = +key;
          this.inputDepartementForm.reset();
          return false;
        }
        return true
      })
    }
    return numberDepartement;
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }
}
