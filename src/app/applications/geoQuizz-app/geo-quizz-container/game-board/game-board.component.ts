import { Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
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

  // a revoir avec un 3eme status
  // @Output() eventGameState: EventEmitter<boolean> = new EventEmitter<boolean>;

  public foundDepartements: DepartementSvg[] = [];
  public inputDepartementForm: FormGroup = new FormGroup({
    inputDepartements: new FormControl()
  });
  public codeDepartmentHover: number = 0;
  public nameDepartmentHover: string = '';

  private startTimer: number = Date.now();
  private timer: number = 10 * 60 * 1000 / 100;
  public timeLeaving: Date = new Date();
  public timerShow: string = "10:00:00";
  public interval: ReturnType<typeof setInterval> | undefined;

  private foundNumbersDepartements: number[] = [];
  private subsciption?: Subscription;

  constructor(
    private geoPolygonsService: GeoPolygonsService,
    private geoNamesNumbersService: GeoNamesNumbersService
  ){}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.timeLeaving = new Date(this.timer - (Date.now() - this.startTimer));

      // 101 pour rspecter le temps de rafréchissement qui est à 100
      if (this.timeLeaving.getTime() < 101) {
        this.timeLeaving.setMilliseconds(0);
        this.geoNamesNumbersService.showNotFound$.next(true);
        clearInterval(this.interval);
      }
    }, 100)

    // debug
    // this.subsciption = this.geoPolygonsService.getAllDepartements().subscribe((map) => {
    //   this.foundDepartements = map;
    // });
  }

  ngDoCheck(): void {
    let inputDepartementValue: string = this.inputDepartementForm.get('inputDepartements')?.value?.toUpperCase();
    let departementNumber = this.geoNamesNumbersService.comparDepartementInput(inputDepartementValue);

    if(departementNumber != 0 && !this.foundNumbersDepartements.includes(departementNumber)){
      this.inputDepartementForm.reset();
      this.foundNumbersDepartements.push(departementNumber);
      this.subsciption = this.geoPolygonsService.getDepartementsByIds(this.foundNumbersDepartements).subscribe((map) => {
        this.foundDepartements = map;
      });
      this.geoNamesNumbersService.departementsNumberFoundList$.next(this.foundNumbersDepartements);
    };
  }

  public HoverDepartment(event: Departement){
    this.codeDepartmentHover = event.code;
    this.nameDepartmentHover = event.name;
  }

  public stopGame(): void {
    this.geoNamesNumbersService.showNotFound$.next(true);
    clearInterval(this.interval);
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }
}
