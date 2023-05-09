import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GeoQuizzContainerComponent } from './geo-quizz-container/geo-quizz-container.component';

import { GEOQUIZZ_APP_ROUTES } from './geoQuizz-app.routes';
import { GameBoardComponent } from './geo-quizz-container/game-board/game-board.component';
import { DashboardComponent } from './geo-quizz-container/dashboard/dashboard.component';
import { MapComponent } from './geo-quizz-container/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartementsListComponent } from './geo-quizz-container/dashboard/departements-list/departements-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GeoPolygonsService } from './shared/services/geo-polygons.service';
import { ScoreComponent } from './geo-quizz-container/dashboard/score/score.component';
import { StartGameComponent } from './geo-quizz-container/start-game/start-game.component';
import { ProgressiveBarComponent } from './geo-quizz-container/dashboard/progressive-bar/progressive-bar.component';


@NgModule({
  declarations: [
    GeoQuizzContainerComponent,
    GameBoardComponent,
    DashboardComponent,
    MapComponent,
    DepartementsListComponent,
    ScoreComponent,
    StartGameComponent,
    ProgressiveBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GEOQUIZZ_APP_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[GeoPolygonsService]
})
export class GeoQuizzAppModule { }
