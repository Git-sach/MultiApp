import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoNote } from 'src/app/applications/todo-app/shared/interfaces/todo-note.interface';
import { TodoNoteService } from 'src/app/applications/todo-app/shared/services/todo-note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit{

  public todoNote: TodoNote | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoNoteService: TodoNoteService){
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let noteId = paramMap.get('id')!;
      this.todoNote = this.todoNoteService.todoNotes[+noteId];
    });
  }

}
