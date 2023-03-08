import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoNoteService } from 'src/app/shared/services/todo-note.service';

@Component({
  selector: 'app-form-todo-note',
  templateUrl: './form-todo-note.component.html',
  styleUrls: ['./form-todo-note.component.scss']
})
export class FormTodoNoteComponent {

  @Output() public eventCloseModale: EventEmitter<string> = new EventEmitter();

  public TodoNoteForm: FormGroup = new FormGroup({
    elementType: new FormControl('todo'),
    newElement: new FormControl('')
  });

  constructor(private todoNoteServicie: TodoNoteService){
  };

  public sublite(): void {
    this.todoNoteServicie.addTodoNote({
      title: this.TodoNoteForm.get('newElement')?.value,
      date: new Date().toLocaleDateString(),
      type: this.TodoNoteForm.get('elementType')?.value,
      content: []
    });
    this.eventCloseModale.emit('closeModale')
  }
}
