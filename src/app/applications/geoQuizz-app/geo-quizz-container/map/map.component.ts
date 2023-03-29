import { Component, Input, OnInit } from '@angular/core';
import { Departement } from '../../shared/interfaces/departement.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() public foundDepartements: Departement[] = [];

  // public map: Departement[] = [];

  // constructor(private geoPolygonsService: GeoPolygonsService){}

  // A mettre dans un service et dans un component
  ngOnInit(): void {
    // this.geoPolygonsService.getAllDepartements().subscribe((map) => {
    //   this.map = map
    // });
  }
}
