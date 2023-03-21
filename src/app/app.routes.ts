import { Route } from "@angular/router";

import { MenuAppsComponent } from "./menu-apps/menu-apps.component";

export const APP_ROUTES: Route[] = [
  {path:'', component: MenuAppsComponent},
  {path: 'todoapp', loadChildren: () => import("./applications/todo-app/todo-app.module").then( m => m.TodoAppModule) },
  {path: 'geoquizz', loadChildren: () => import("./applications/geoQuizz-app/geo-quizz-app.module").then( m => m.GeoQuizzAppModule) }
];
