import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Departement, DepartementSvg } from '../../shared/interfaces/departement.interface';
import { GeoPolygonsService } from '../../shared/services/geo-polygons.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges{

  @Input() public foundNumbersDepartements: number[] = [];
  @Input() public polygonClass: "polygonInGame" | "polygonStart" | undefined;
  @Input() public showNotFound: boolean = false;
  @Output() public eventHoverDepartment: EventEmitter<Departement> = new EventEmitter();

  public departments: DepartementSvg[];

  constructor(private geoPolygonsService: GeoPolygonsService){
    // Pour eviter les partages de références sur les objets imbriqués (pose problème pour le reset)
    this.departments = JSON.parse(JSON.stringify(this.geoPolygonsService.getAllDepartements()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.foundNumbersDepartements);
    this.departments.map((department: DepartementSvg) => {
      if(this.foundNumbersDepartements.includes(department.code) && !department.found){
        department.found = true;
      }
    });
  }

  ngOnInit(): void {
  }

  public hoverDepartment(findDepartement: DepartementSvg): void {
    const {svg_coordinates, ...rest} = findDepartement
    this.eventHoverDepartment.emit(rest);
  }

  public leaveDepartment(): void {
    this.eventHoverDepartment.emit({
      code: 0,
      name: ''
    });
  }
}
