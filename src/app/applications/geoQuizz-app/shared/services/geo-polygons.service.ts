import { Injectable } from '@angular/core';
import { GEO_DEP } from '../../geo-quizz-container/geoWichoutMultiPolygon';
import { DepartementSvg } from '../interfaces/departement.interface';
import { PolygonDepartments } from '../interfaces/polygonDepartment.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoPolygonsService {

  /** Observable avec GEO_DEP transformé en Departement */
  public departementsDico: PolygonDepartments[] = GEO_DEP;
  public departements: DepartementSvg[] = [];

  constructor() {
    this.setDepatment();
  }

  getAllDepartements(): DepartementSvg[]{
    return this.departements
  }

  convertInPolygonCoordonates(originalCoordonates: Array<Array<number>>): string{
    let plygonCoordonates: string = '';
    originalCoordonates.forEach((coordonate) => {
      plygonCoordonates += `${coordonate[1]}, ${coordonate[0]} `
    })
    return plygonCoordonates;
  }

  public setDepatment(): void {
    this.departementsDico.forEach((departement: PolygonDepartments) => {
      this.departements.push({
          svg_coordinates: this.convertInPolygonCoordonates(departement.geometry.coordinates),
          code: +departement.properties.code,
          name: departement.properties.nom,
          found: false
      })
    })
  }
}
