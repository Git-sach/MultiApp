import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoNoteListe } from 'src/app/shared/interfaces/todo-note.interface';
import { Tool } from 'src/app/shared/interfaces/tool.interface';
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
  private indexOfLiRightClicTool: number = -1;

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
