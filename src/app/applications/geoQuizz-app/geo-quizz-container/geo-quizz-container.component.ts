import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-geo-quizz-container',
  templateUrl: './geo-quizz-container.component.html',
  styleUrls: ['./geo-quizz-container.component.scss']
})
export class GeoQuizzContainerComponent {

  // convertir en un enum pour game in progress, pas démarer et recommencé(résultats)
  public gameIsInProgress: boolean = false

  public startGameState(): void {
    this.gameIsInProgress = true;
  }

  public stopGameState(): void {
    this.gameIsInProgress = false;
  }
}
