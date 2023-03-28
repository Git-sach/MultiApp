import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscriber, tap } from 'rxjs';
import { GEO_DEP } from '../../geo-quizz-container/geoWichoutMultiPolygon';
import { Departement } from '../interfaces/departement.interface';

@Injectable({
  providedIn: 'root'
})
export class GeoPolygonsService {

  /** Observable avec GEO_DEP transformé en Departement */
  public departements$: Observable<Departement[]> = new Observable<Departement[]>((Subscriber) => {
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

  constructor() { }

  getAllDepartements(): Observable<Departement[]>{
    return this.departements$
  }

  convertInPolygonCoordonates(originalCoordonates: Array<Array<number>>): string{
    let plygonCoordonates: string = '';
    originalCoordonates.forEach((coordonate) => {
      plygonCoordonates += `${coordonate[1]}, ${coordonate[0]} `
    })
    return plygonCoordonates;
  }
}
