import { Injectable } from '@angular/core';
import { TodoNoteListe } from 'src/app/shared/interfaces/todo-note.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoNoteService {

  public todoNotes: TodoNoteListe[] = [
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
}
