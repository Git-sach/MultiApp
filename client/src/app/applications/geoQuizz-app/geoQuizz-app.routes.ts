import { Routes } from "@angular/router";
import { DepartementsListComponent } from "./geo-quizz-container/dashboard/departements-list/departements-list.component";
import { ScoreComponent } from "./geo-quizz-container/dashboard/score/score.component";
import { GeoQuizzContainerComponent } from "./geo-quizz-container/geo-quizz-container.component";

export const GEOQUIZZ_APP_ROUTES: Routes = [
  {path: "", component: GeoQuizzContainerComponent,
  children: [
    {path: 'score', component: ScoreComponent},
    {path: 'list', component: DepartementsListComponent},
    {path: 'stats', component: DepartementsListComponent},
    { path: '**', redirectTo: 'score'}
  ]}
]
