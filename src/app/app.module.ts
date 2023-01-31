import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoAppComponent } from './applications/todo-app/todo-app.component';
import { MenuAppsComponent } from './menu-apps/menu-apps.component';
import { TodoListeComponent } from './applications/todo-app/todo-liste/todo-liste.component';
import { RightClickToolsComponent } from './applications/todo-app/right-click-tools/right-click-tools.component';

const APP_ROUTES: Route[] = [
  {path:'', component: MenuAppsComponent},
  {path:'todoapp', component: TodoAppComponent},
  {path:'todoapp/todo/:id', component: TodoListeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoAppComponent,
    MenuAppsComponent,
    TodoListeComponent,
    RightClickToolsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
