import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Departement, DepartementFoView, DepartementSvg } from '../../shared/interfaces/departement.interface';
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
  @Output() public eventHoverDepartment: EventEmitter<DepartementFoView> = new EventEmitter();

  public departments: DepartementSvg[] = [];

  constructor(private geoPolygonsService: GeoPolygonsService){
    this.initialiseDepartments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.foundNumbersDepartements.length == 0){
      this.initialiseDepartments();
    } else {
      this.departments.map((department: DepartementSvg) => {
        if(this.foundNumbersDepartements.includes(department.code) && !department.found){
          department.found = true;
        }
      });
    }
  }

  ngOnInit(): void {
  }

  public hoverDepartment(findDepartement: DepartementSvg): void {
    const {svg_coordinates, ...rest} = findDepartement;
    const departementFoView: DepartementFoView = rest;
    // gestion du cas de la haute corse et de la corse du sud
    if (departementFoView.code === 20) {
      departementFoView.code = '2B';
    }
    if (departementFoView.code === 96) {
      departementFoView.code = '2A';
    }
    this.eventHoverDepartment.emit(departementFoView);
  }

  public leaveDepartment(): void {
    this.eventHoverDepartment.emit({
      code: 0,
      name: ''
    });
  }

  private initialiseDepartments(): void {
    // Pour eviter les partages de références sur les objets imbriqués (pose problème pour le reset)
    this.departments = JSON.parse(JSON.stringify(this.geoPolygonsService.getAllDepartements()));
  }
}
