import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Departement, DepartementFoView } from '../../../shared/interfaces/departement.interface';
import { HistoryGame } from '../../../shared/interfaces/historyGames.interface';
import { GeoHistoryGamesService } from '../../../shared/services/geo-history-games.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy{

  public enebled: boolean = true

  public codeDepartmentHover: number | string = 0;
  public nameDepartmentHover: string = '';
  public departmentHoverIsFound: boolean | undefined = false;

  public historyGames: HistoryGame[] = [];
  public historyGamesSubscription?: Subscription

  public historySelected: number = -1;
  public historyGamesSelected?: Subscription;

  constructor(
    private geoHistoryGamesService: GeoHistoryGamesService,
    private changeDetectorRef: ChangeDetectorRef){
  };

  ngOnInit(): void {
    this.historyGamesSubscription = this.geoHistoryGamesService.historyGames$.pipe(
      map((historyGames) => historyGames.sort((a, b) => b.percentage - a.percentage))
    ).subscribe((historyGames) => {
      this.historyGames = historyGames;
    });

    this.historyGamesSelected = this.geoHistoryGamesService.historyGameSelected$
    .subscribe((historySelected) => {
      this.historySelected = historySelected;
    })
  }

  public HoverDepartment(event: DepartementFoView){
    this.codeDepartmentHover = event.code;
    this.nameDepartmentHover = event.name;
    this.departmentHoverIsFound = event.found;
  }

  public onClick(index: number){
    this.reloadMap();
    this.geoHistoryGamesService.historyGameSelected$.next(index);
  }

  public reloadMap() {
    this.enebled = false;
    this.changeDetectorRef.detectChanges();
    this.enebled = true
  }

  public closeDetail() {
    this.geoHistoryGamesService.historyGameSelected$.next(-1);
  }

  ngOnDestroy(): void {
    this.historyGamesSubscription?.unsubscribe();
    this.historyGamesSelected?.unsubscribe()
  }
}
