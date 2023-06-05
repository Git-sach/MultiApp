import { Routes } from "@angular/router";

import { NoteComponent } from "./todo-note-liste/note/note.component";
import { TodoAppComponent } from "./todo-note-liste/todo-app.component";
import { TodoListeComponent } from "./todo-note-liste/todo-liste/todo-liste.component";

export const TODO_APP_ROUTES: Routes = [
  {path:'', component: TodoAppComponent},
  {path:'note/:id', component: NoteComponent},
  {path:'todo/:id', component: TodoListeComponent}
]
