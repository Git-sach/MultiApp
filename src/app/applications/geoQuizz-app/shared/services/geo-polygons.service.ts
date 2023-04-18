import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GEO_DEP } from '../../geo-quizz-container/geoWichoutMultiPolygon';
import { DepartementSvg } from '../interfaces/departement.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoPolygonsService {

  /** Observable avec GEO_DEP transformé en Departement */
  public departements$: Observable<DepartementSvg[]> = new Observable<DepartementSvg[]>((Subscriber) => {
    Subscriber.next(
      GEO_DEP.map((departement: any) => {
        return {
          svg_coordinates: this.convertInPolygonCoordonates(departement.geometry.coordinates),
          code: departement.properties.code,
          name: departement.properties.nom
        }
      })
    )
  });

  constructor() {
  }

  getAllDepartements(): Observable<DepartementSvg[]>{
    return this.departements$
  }

  // Retourne un tableau de départements en fonction d'un tableau de code département
  // TODO gérer le cas de la Corse
  getDepartementsByIds(ids: number[]): Observable<DepartementSvg[]>{
    return this.departements$.pipe(
      map((departements: DepartementSvg[]) => {
        return departements.filter((departement: DepartementSvg) => ids.includes(Number(departement.code)))
      })
    )
  }

  convertInPolygonCoordonates(originalCoordonates: Array<Array<number>>): string{
    let plygonCoordonates: string = '';
    originalCoordonates.forEach((coordonate) => {
      plygonCoordonates += `${coordonate[1]}, ${coordonate[0]} `
    })
    return plygonCoordonates;
  }
}
