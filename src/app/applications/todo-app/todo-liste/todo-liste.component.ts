import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoNoteListe } from 'src/app/shared/interfaces/todo-note.interface';
import { TodoNoteService } from 'src/app/shared/services/todo-note.service';

@Component({
  selector: 'app-todo-liste',
  templateUrl: './todo-liste.component.html',
  styleUrls: ['./todo-liste.component.scss']
})
export class TodoListeComponent implements OnInit{

  public todoId: string = '0';
  public todoNote?: TodoNoteListe;
  public ClassListCheckbox: string[] = [];
  public modalaleAddTodo: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoNoteService: TodoNoteService){
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.todoId = paramMap.get('id')!;
      this.todoNote = this.todoNoteService.todoNotes[parseInt(this.todoId)];
    });

    // Initialisationd des classes
    this.todoNote?.content.map(x => {
      //checkBox
      if(x.statu == true){
        this.ClassListCheckbox?.push('checkBoxDone')
      } else {
        this.ClassListCheckbox?.push('')
      }
    })

  }

  public toggleCheckBox(toggleCheckBoxElement: HTMLDivElement, index: number): void {

    let statu = this.todoNote?.content[index].statu;

    if(statu){
      toggleCheckBoxElement.classList.remove('checkBoxDone');
      this.todoNote!.content[index].statu = false;
    } else {
      toggleCheckBoxElement.classList.add('checkBoxDone');
      this.todoNote!.content[index].statu = true;
    }
  }

  public addTodo(): void {
    this.modalaleAddTodo = true;
  }

  public closeAddTodoModale(): void {
    this.modalaleAddTodo = false;
  }

  public saveTodo(inputNameTodo: HTMLInputElement, selectPriorityTodo: HTMLSelectElement): void {
    this.todoNoteService.todoNotes[parseInt(this.todoId)].content.push({
      title: inputNameTodo.value,
      statu: false,
      priority: selectPriorityTodo.value,
      date: '10/20/2022'
    })
    this.modalaleAddTodo = false;
  }
}
