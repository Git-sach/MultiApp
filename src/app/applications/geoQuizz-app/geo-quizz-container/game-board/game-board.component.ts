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
    this.subsciption = this.geoPolygonsService.getAllDepartements().subscribe((map) => {
      this.foundDepartements = map
    });

    this.geoPolygonsService.getDepartementsById(3).subscribe((map) => {
      this.foundDepartements = [map]
    })
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe;
  }
}
