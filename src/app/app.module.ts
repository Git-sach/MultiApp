import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuAppsComponent } from './menu-apps/menu-apps.component';
import { FormTodoNoteComponent } from './applications/todo-app/todo-note-liste/form-todo-note/form-todo-note.component';
import { NoteComponent } from './applications/todo-app/todo-note-liste/note/note.component';
import { RightClickToolsComponent } from './applications/todo-app/todo-note-liste/right-click-tools/right-click-tools.component';
import { TodoAppComponent } from './applications/todo-app/todo-note-liste/todo-app.component';
import { TodoListeComponent } from './applications/todo-app/todo-note-liste/todo-liste/todo-liste.component';

const APP_ROUTES: Route[] = [
  {path:'', component: MenuAppsComponent},
  {path:'todoapp', component: TodoAppComponent},
  {path:'todoapp/todo/:id', component: TodoListeComponent},
  {path:'todoapp/note/:id', component: NoteComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TodoAppComponent,
    MenuAppsComponent,
    TodoListeComponent,
    RightClickToolsComponent,
    NoteComponent,
    FormTodoNoteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
