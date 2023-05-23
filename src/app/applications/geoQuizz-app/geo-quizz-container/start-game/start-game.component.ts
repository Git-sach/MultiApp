import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartementSvg } from '../../shared/interfaces/departement.interface';
import { GeoNamesNumbersService } from '../../shared/services/geo-names-numbers.service';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit{

  @Output() eventGameState: EventEmitter<boolean> = new EventEmitter<boolean>;

  public foundDepartements: DepartementSvg[] = [];
  private allDepartements:  DepartementSvg[] = [];
  private arrayOfDepatmentsNumbers: number[] = []
  private interval: ReturnType<typeof setInterval> | undefined;

  constructor(
    private geoPolygonsService: GeoPolygonsService,
    private geoNamesNumbersService: GeoNamesNumbersService
  ){
    for(let i=1; i<96; i++) {
      this.arrayOfDepatmentsNumbers.push(i)
    }
  }

  ngOnInit() {
    this.allDepartements = [...this.geoPolygonsService.getAllDepartements()];

    this.interval = setInterval(() => {
      let numbersOfDepartments = this.allDepartements.length
      let rendom = Math.floor(Math.random()*numbersOfDepartments);

      this.foundDepartements.push(this.allDepartements[rendom]);
      this.allDepartements.splice(rendom, 1);
      if(numbersOfDepartments == 1) {
        clearInterval(this.interval);
      }
    }, 500);
  }

  public startGame(): void {
    this.eventGameState.emit(true);
    this.geoNamesNumbersService.resetFoundDepatmentList();
    this.geoNamesNumbersService.showNotFound$.next(false);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
