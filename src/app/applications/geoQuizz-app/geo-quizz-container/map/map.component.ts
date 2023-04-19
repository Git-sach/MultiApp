import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Departement, DepartementSvg } from '../../shared/interfaces/departement.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() public foundDepartements: DepartementSvg[] = [];
  @Output() public eventHoverDepartment: EventEmitter<Departement> = new EventEmitter();

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
