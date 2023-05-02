import { Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Departement, DepartementSvg } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';
import { GeoNamesNumbersService } from '../../shared/services/geo-names-numbers.service';
import { DictionaryDepartments } from '../../shared/interfaces/DictionaryDepartments.interface';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy, DoCheck{

  @Output() eventGameState: EventEmitter<boolean> = new EventEmitter<boolean>;

  public foundDepartements: DepartementSvg[] = [];
  public inputDepartementForm: FormGroup = new FormGroup({
    inputDepartements: new FormControl()
  });
  public codeDepartmentHover: number = 0;
  public nameDepartmentHover: string = '';

  private startTimer: number = Date.now();
  private timer: number = 10 * 60 * 1000 / 100;
  public timeLeaving: Date = new Date();
  public timerShow: string = "10:00:00"

  private foundNumbersDepartements: number[] = [];
  private subsciption?: Subscription;
  private departementList: DictionaryDepartments = {};

  constructor(
    private geoPolygonsService: GeoPolygonsService,
    private geoNamesNumbersService: GeoNamesNumbersService
  ){}

  ngOnInit(): void {
    this.departementList = this.geoNamesNumbersService.departementsList;

    const interval = setInterval(() => {
      this.timeLeaving = new Date(this.timer - (Date.now() - this.startTimer));

      // 101 pour rspecter le temps de rafréchissement qui est à 100
      if (this.timeLeaving.getTime() < 101) {
        this.timeLeaving.setMilliseconds(0);
        clearInterval(interval);
      }
    }, 100)

    // debug
    this.subsciption = this.geoPolygonsService.getAllDepartements().subscribe((map) => {
      this.foundDepartements = map;
    });
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

  public HoverDepartment(event: Departement){
    this.codeDepartmentHover = event.code;
    this.nameDepartmentHover = event.name;
  }

  public stopGame(): void {
    this.eventGameState.emit(true);
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }
}
