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


@NgModule({
  declarations: [
    GeoQuizzContainerComponent,
    GameBoardComponent,
    DashboardComponent,
    MapComponent,
    DepartementsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GEOQUIZZ_APP_ROUTES),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GeoQuizzAppModule { }
