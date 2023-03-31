import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Departement } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy{

  public foundDepartements: Departement[] = [];
  private subsciption?: Subscription;

  constructor(private geoPolygonsService: GeoPolygonsService){}

  ngOnInit(): void {
    this.subsciption = this.geoPolygonsService.getDepartementsByIds([1, 2, 3,4, 5, 80, 62, 59]).subscribe((map) => {
      this.foundDepartements = map
    });
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }
}
