import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoNoteService } from 'src/app/applications/todo-app/shared/services/todo-note.service';

@Component({
  selector: 'app-form-todo-note',
  templateUrl: './form-todo-note.component.html',
  styleUrls: ['./form-todo-note.component.scss']
})
export class FormTodoNoteComponent implements OnInit{

  @Input() public indexToAddTodoNote = 0;
  @Input() public indexOfTodoNote: number = 0;
  @Input() public updateTodoNote: boolean = false;

  public TodoNoteForm!: FormGroup;

  @Output() public eventCloseModale: EventEmitter<string> = new EventEmitter();

  constructor(private todoNoteServicie: TodoNoteService){
  };

  ngOnInit(){
    this.TodoNoteForm = this.initializeForm();
  }

  public initializeForm(): FormGroup {
    if(this.updateTodoNote){
      const todoNote = this.todoNoteServicie.todoNotes[this.indexOfTodoNote]
      return new FormGroup({
        elementType: new FormControl(todoNote.type),
        elementTitle: new FormControl(todoNote.title)
      });
    } else {
      return new FormGroup({
        elementType: new FormControl('todo'),
        elementTitle: new FormControl('')
      });
    }
  }

  public sublite(): void {
    if(this.updateTodoNote){
      this.todoNoteServicie.updateTodoNote(this.indexOfTodoNote, {
        title: this.TodoNoteForm.get('elementTitle')?.value,
        date: this.todoNoteServicie.todoNotes[this.indexOfTodoNote].date,
        type: this.TodoNoteForm.get('elementType')?.value,
        content: this.todoNoteServicie.todoNotes[this.indexOfTodoNote].content
      });
    } else {
      this.todoNoteServicie.addTodoNote({
        title: this.TodoNoteForm.get('elementTitle')?.value,
        date: new Date().toLocaleDateString(),
        type: this.TodoNoteForm.get('elementType')?.value,
        content: []
      }, this.indexToAddTodoNote);
    }
    this.eventCloseModale.emit('closeModale')
  }
}
