import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GeoQuizzContainerComponent } from './geo-quizz-container/geo-quizz-container.component';

import { GEOQUIZZ_APP_ROUTES } from './geoQuizz-app.routes';
import { GameBoardComponent } from './geo-quizz-container/game-board/game-board.component';
import { DashboardComponent } from './geo-quizz-container/dashboard/dashboard.component';


@NgModule({
  declarations: [
    GeoQuizzContainerComponent,
    GameBoardComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GEOQUIZZ_APP_ROUTES)
  ]
})
export class GeoQuizzAppModule { }
