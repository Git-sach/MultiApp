import { Injectable } from '@angular/core';
import { TodoNote } from 'src/app/applications/todo-app/shared/interfaces/todo-note.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoNoteService {

  public todoNotes: TodoNote[] = [
    {
      title: 'Premiere TODO',
      date: '10/03/2022',
      type: 'todo',
      content: [{
        title: 'Aller faire des courses',
        statu: true,
        priority: 'height',
        date: '10/20/2022'
      },{
        title: 'Mettre les fleures sur la table',
        statu: false,
        priority: 'medium',
        date: '10/20/2022'
      },{
        title: 'Apporter les chemises au dressing',
        statu: false,
        priority: 'low',
        date: '10/20/2022'
      },{
        title: 'Donner à manger au chat',
        statu: true,
        priority: 'low',
        date: '10/20/2022'
      }]
    },
    {
      title: 'Seconde TODO',
      date: '10/03/2022',
      type: 'todo',
      content: []
    },
    {
      title: 'Seconde TODO',
      date: '10/03/2022',
      type: 'note',
      content: []
    }
  ]

  constructor() { }

  public addTodoNote(todoNote: TodoNote, index: number = 0 ): void{
    this.todoNotes.splice(index, 0, todoNote)
  }

  public deleteTodoNote(index: number): void {
    this.todoNotes.splice(index, 1);
  }

  public moveAboveTodoNote(index: number): void {
    if(index > 0){
      this.todoNotes.splice(index-1, 0, this.todoNotes[index]);
      this.todoNotes.splice(index+1, 1);
    }
  }

  public moveBelowTodoNote(index: number): void {
    if(index < this.todoNotes.length){
      this.todoNotes.splice(index+2, 0, this.todoNotes[index]);
      this.todoNotes.splice(index, 1);
    }
  }

  public updateTodoNote(index: number, updatedTodoNote: TodoNote): void {
    this.todoNotes.splice(index, 1, updatedTodoNote)
  }
}
