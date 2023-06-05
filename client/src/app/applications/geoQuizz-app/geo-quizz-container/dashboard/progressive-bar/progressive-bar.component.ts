import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GeoNamesNumbersService } from '../../../shared/services/geo-names-numbers.service';

@Component({
  selector: 'app-progressive-bar',
  templateUrl: './progressive-bar.component.html',
  styleUrls: ['./progressive-bar.component.scss']
})
export class ProgressiveBarComponent implements OnChanges, OnInit{
  @Input() public numberOfDepartements = 0;
  public showNotFound = true;
  public progressBarWidth: number = 0;

  constructor( public geoNamesNumbersService: GeoNamesNumbersService ) {

  }

  ngOnInit() {
    // gérer l'unsubscribe
    this.geoNamesNumbersService.showNotFound$.subscribe((showNotFound) => {
      this.showNotFound = showNotFound;
    });
  }

  ngOnChanges(): void {
    this.progressBarWidth = Math.floor(this.numberOfDepartements/95*100);
  }
}

