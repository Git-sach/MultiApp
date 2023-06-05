import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormTodoNoteComponent } from './todo-note-liste/form-todo-note/form-todo-note.component';
import { NoteComponent } from './todo-note-liste/note/note.component';
import { RightClickToolsComponent } from './todo-note-liste/right-click-tools/right-click-tools.component';
import { TodoAppComponent } from './todo-note-liste/todo-app.component';
import { TodoListeComponent } from './todo-note-liste/todo-liste/todo-liste.component';

import { TODO_APP_ROUTES } from './todo-app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    TodoAppComponent,
    TodoListeComponent,
    RightClickToolsComponent,
    NoteComponent,
    FormTodoNoteComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(TODO_APP_ROUTES),
    FormsModule
  ]
})
export class TodoAppModule { }
