import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoNote } from 'src/app/applications/todo-app/shared/interfaces/todo-note.interface';
import { Todo } from 'src/app/applications/todo-app/shared/interfaces/todo.interface';
import { Tool } from 'src/app/applications/todo-app/shared/interfaces/tool.interface';
import { TodoNoteService } from 'src/app/applications/todo-app/shared/services/todo-note.service';

@Component({
  selector: 'app-todo-liste',
  templateUrl: './todo-liste.component.html',
  styleUrls: ['./todo-liste.component.scss']
})
export class TodoListeComponent implements OnInit{

  public todoNote: TodoNote | undefined;
  public todos: Todo[] | undefined;
  public ClassListCheckbox: string[] = [];
  public modalaleAddTodo: boolean = false;

  public rightClickToolsIsOpen: boolean = false;
  public X_positionRightClickTools: number = 0;
  public Y_positionRightClickTools: number = 0;
  public configRightClickTools: Array<Tool> = [
    {event: 'addBefor', img:'assets/images/todo-app/rightClickTools/addBefor.png', content:'Ajouter en haut'},
    {event: 'addAfter', img:'assets/images/todo-app/rightClickTools/addAfter.png', content:'Ajouter en bas'},
    {event: 'update', img:'assets/images/todo-app/rightClickTools/update.png', content:'Modifier'},
    {event: 'delete', img:'assets/images/todo-app/rightClickTools/delete.png', content:'Suprimer'},
    {event: 'up', img:'assets/images/todo-app/rightClickTools/up.png', content:'Monter'},
    {event: 'down', img:'assets/images/todo-app/rightClickTools/down.png', content:'Descendre'}
  ];
  private indexOfLiRightClicTool: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoNoteService: TodoNoteService){
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let todoId = paramMap.get('id')!;
      this.todoNote = this.todoNoteService.todoNotes[+todoId];
      this.todos = this.todoNote?.content as Todo[];
    });

    // Initialisationd des classes
    this.todos?.map(x => {
      //checkBox
      if(x.statu == true){
        this.ClassListCheckbox?.push('checkBoxDone')
      } else {
        this.ClassListCheckbox?.push('')
      }
    })
  }

  public toggleCheckBox(toggleCheckBoxElement: HTMLDivElement, index: number): void {

    let statu = this.todos![index].statu;

    if(statu){
      toggleCheckBoxElement.classList.remove('checkBoxDone');
      this.todos![index].statu = false;
    } else {
      toggleCheckBoxElement.classList.add('checkBoxDone');
      this.todos![index].statu = true;
    }
  }

  public addTodo(): void {
    this.modalaleAddTodo = true;
  }

  public closeAddTodoModale(): void {
    this.modalaleAddTodo = false;
  }

  public saveTodo(inputNameTodo: HTMLInputElement, selectPriorityTodo: HTMLSelectElement): void {
    this.todos!.push({
      title: inputNameTodo.value,
      statu: false,
      priority: selectPriorityTodo.value,
      date: new Date().toLocaleDateString()
    })
    this.modalaleAddTodo = false;
  }

  public openRightClickTools(event: MouseEvent, index: number): void {
    //détécter le click droit
    if(event.button == 2){
      this.indexOfLiRightClicTool = index;
      event.preventDefault();
      this.rightClickToolsIsOpen = true;
      this.X_positionRightClickTools = event.x;
      this.Y_positionRightClickTools = event.y;
    }
  }


  public doRightClickToolsAction(event: string){
    // switch (event) {
    //   case 'addBefor': this.AddBeforActionRightClicTools();
    //   break;
    //   case 'addAfter': this.AddAfterActionRightClicTools();
    //   break;
    //   case 'update': ;
    //   break;
    //   case 'delete': this.deleteActionRightClicTools();
    //   break;
    //   case 'up': this.upActionRightClicTools();
    //   break;
    //   case 'down': this.downActionRightClicTools();
    //   break;
    // }
    this.rightClickToolsIsOpen = false;
  }
}
