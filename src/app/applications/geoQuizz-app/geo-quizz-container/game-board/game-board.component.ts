import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Departement, DepartementSvg } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';
import { GeoNamesNumbersService } from '../../shared/services/geo-names-numbers.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, DoCheck{

  public current = 90;
  public max = 100;

  // public foundDepartements: DepartementSvg[] = [];
  public inputDepartementForm: FormGroup = new FormGroup({
    inputDepartements: new FormControl()
  });
  public codeDepartmentHover: number = 0;
  public nameDepartmentHover: string = '';
  public departmentHoverIsFound: boolean | undefined = false;

  public timeLeaving: Date = new Date();
  private startTimer: number = Date.now();
  private timer: number = 10 * 60 * 1000;
  private interval: ReturnType<typeof setInterval> | undefined;

  public showNotFound: boolean = false;

  public foundNumbersDepartements: number[] = [];

  constructor(
    private geoPolygonsService: GeoPolygonsService,
    private geoNamesNumbersService: GeoNamesNumbersService
  ){}

  ngOnInit(): void {
    // Pour eviter les partages de références sur les objets imbriqués (pose problème pour le reset)

    this.geoNamesNumbersService.showNotFound$.subscribe((showNotFound) => {
      this.showNotFound = showNotFound;
    })

    this.interval = setInterval(() => {
      this.timeLeaving = new Date(this.timer - (Date.now() - this.startTimer));

      // 101 pour rspecter le temps de rafréchissement qui est à 100
      if (this.timeLeaving.getTime() < 101) {
        this.timeLeaving.setMilliseconds(0);
        this.geoNamesNumbersService.showNotFound$.next(true);
        clearInterval(this.interval);
      }
    }, 100)
  }

  ngDoCheck(): void {
    let inputDepartementValue: string = this.inputDepartementForm.get('inputDepartements')?.value?.toUpperCase();
    this.pushFoundDepartment(inputDepartementValue);
  }

  public HoverDepartment(event: Departement){
    this.codeDepartmentHover = event.code;
    this.nameDepartmentHover = event.name;
    this.departmentHoverIsFound = event.found;
  }

  public stopGame(): void {
    this.geoNamesNumbersService.showNotFound$.next(true);
    clearInterval(this.interval);
  }

  private pushFoundDepartment(inputDepartementValue: string): void {
    let departmentNumber = this.geoNamesNumbersService.comparDepartementInput(inputDepartementValue);
    if(departmentNumber != 0 && !this.foundNumbersDepartements.includes(departmentNumber)){
      this.inputDepartementForm.reset();
      this.foundNumbersDepartements.push(departmentNumber);
      this.foundNumbersDepartements[0] = 1;
      this.geoNamesNumbersService.departementsNumberFoundList$.next(this.foundNumbersDepartements);
      // console.log(this.foundNumbersDepartements);
    };
  }

  public restartGame(): void {
    this.foundNumbersDepartements = [];
    this.geoNamesNumbersService.departementsNumberFoundList$.next(this.foundNumbersDepartements);
    this.geoNamesNumbersService.resetFoundDepatmentList();
    this.ngOnInit();
    this.geoNamesNumbersService.showNotFound$.next(false);
  }
}
