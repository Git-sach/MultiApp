import { Time } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { DepartementSvg } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit{

  @Output() eventGameState: EventEmitter<boolean> = new EventEmitter<boolean>;

  public foundDepartements: DepartementSvg[] = [];
  private allDepartements:  DepartementSvg[] = []
  private subsciption?: Subscription;

  constructor( private geoPolygonsService: GeoPolygonsService){}

  ngOnInit() {
    this.subsciption = this.geoPolygonsService.getAllDepartements().subscribe((map: DepartementSvg[]) => {
      this.allDepartements = map;
    });

    const interval = setInterval(() => {
      let numbersOfDepartments = this.allDepartements.length
      let rendom = Math.floor(Math.random()*numbersOfDepartments);

      this.foundDepartements.push(this.allDepartements[rendom]);
      this.allDepartements.splice(rendom, 1);
      if(numbersOfDepartments == 1) {
        clearInterval(interval);
      }
    }, 500);
  }

  public startGame(): void {
    this.eventGameState.emit(true);
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }
}
