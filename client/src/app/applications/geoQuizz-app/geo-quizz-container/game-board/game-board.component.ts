import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Departement, DepartementFoView } from '../../shared/interfaces/departement.interface';
import { HistoryGame } from '../../shared/interfaces/historyGames.interface';
import { GeoHistoryGamesService } from '../../shared/services/geo-history-games.service';
import { GeoNamesNumbersService } from '../../shared/services/geo-names-numbers.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, DoCheck, OnDestroy{

  public inputDepartementForm: FormGroup = new FormGroup({
    inputDepartements: new FormControl()
  });
  public codeDepartmentHover: number | string = 0;
  public nameDepartmentHover: string = '';
  public departmentHoverIsFound: boolean | undefined = false;

  public showNotFound: boolean = false;

  public foundNumbersDepartements: number[] = [];

  public percentage: number = 0;

  public timeLeaving: Date = new Date();
  private startTimer: number = Date.now();
  private timer: number = 10 * 60 * 1000;
  private interval: ReturnType<typeof setInterval> | undefined;

  private historyGames: HistoryGame[] = [];
  private historyGameSubscription?: Subscription;

  constructor(
    private geoNamesNumbersService: GeoNamesNumbersService,
    private geoHistoryGamesService: GeoHistoryGamesService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.historyGameSubscription =  this.geoHistoryGamesService.historyGames$
    .subscribe((historyGames) => {
      this.historyGames = historyGames;
    })

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

  public HoverDepartment(event: DepartementFoView){
    this.codeDepartmentHover = event.code;
    this.nameDepartmentHover = event.name;
    this.departmentHoverIsFound = event.found;
  }

  public stopGame(): void {
    this.percentage = Math.ceil(this.foundNumbersDepartements.length-1/96*100)
    this.pushScorInHistoryGame();
    this.geoNamesNumbersService.showNotFound$.next(true);
    clearInterval(this.interval);
  }

  private pushFoundDepartment(inputDepartementValue: string): void {
    let departmentNumber = this.geoNamesNumbersService.comparDepartementInput(inputDepartementValue);
    if(departmentNumber != 0 && !this.foundNumbersDepartements.includes(departmentNumber)){
      this.inputDepartementForm.reset();
      this.foundNumbersDepartements.push(departmentNumber);
      this.foundNumbersDepartements = [...this.foundNumbersDepartements]; // obligé de faire ça, sinon le changement ne se déclanche pas
      this.geoNamesNumbersService.departementsNumberFoundList$.next(this.foundNumbersDepartements);
    };
  }

  public restartGame(): void {
    this.router.navigate(['geoquizz','list']);
    this.timeLeaving = new Date();
    this.startTimer = Date.now();
    this.percentage = 0;
    this.foundNumbersDepartements = [];
    this.geoNamesNumbersService.departementsNumberFoundList$.next(this.foundNumbersDepartements);
    this.geoNamesNumbersService.resetFoundDepatmentList();
    this.ngOnInit();
    this.geoNamesNumbersService.showNotFound$.next(false);
  }

  private pushScorInHistoryGame(): void {
    let historyGames: HistoryGame[] = this.historyGames;
    historyGames.push({
      date: new Date,
      time: this.timeLeaving, //temps restant a transformer en temps passé
      percentage: this.percentage,
      departmentsFound: this.foundNumbersDepartements
    })
    this.geoHistoryGamesService.historyGames$.next(historyGames);
  }

  ngOnDestroy(): void {
    this.historyGameSubscription?.unsubscribe();
  }
}
