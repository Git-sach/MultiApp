import { Component, OnInit } from '@angular/core';

import { Departement } from '../../shared/interfaces/departement.interface';

import { GEO_DEP } from '../geoWichoutMultiPolygon';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit{

  public map: Departement[] = [];

  // A mettre dans un service et dans un component
  ngOnInit(): void {

    // console.log(GEO_DEP);
    this.map = this.fetchAll();
  }

  fetchAll(): Departement[]{
    return GEO_DEP.map((departement: any) => {
      return {
        svg_coordinates: this.convertInPolygonCoordonates(departement.geometry.coordinates),
        code: departement.properties.code,
        name: departement.properties.nom
      }
    })
  }

  // Faire ça dans un Pipe
  convertInPolygonCoordonates(originalCoordonates: Array<Array<number>>): string{
    let plygonCoordonates: string = '';
    originalCoordonates.forEach((coordonate) => {
      plygonCoordonates += `${coordonate[1]}, ${coordonate[0]} `
    })
    return plygonCoordonates;
  }

}
