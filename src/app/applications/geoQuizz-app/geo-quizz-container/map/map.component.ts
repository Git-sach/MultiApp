import { Component, Input, OnInit } from '@angular/core';
import { DepartementSvg } from '../../shared/interfaces/departement.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() public foundDepartements: DepartementSvg[] = [];

  ngOnInit(): void {
  }
}
