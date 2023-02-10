import { Component } from '@angular/core';
import { TodoNote } from 'src/app/shared/interfaces/todo-note.interface';
import { Tool } from 'src/app/shared/interfaces/tool.interface';
import { TodoNoteService } from 'src/app/shared/services/todo-note.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent {

  public todoNoteListe: TodoNote[] = this.todoNoteServicie.todoNotes;
  public modalaleAddNote: boolean = false;

  public rightClickToolsIsOpen: boolean = false;
  public X_positionRightClickTools: number = 0;
  public Y_positionRightClickTools: number = 0;
  public configRightClickTools: Array<Tool> = [
    {event: 'addBefor', img:'assets/images/todo-app/rightClickTools/addBefor.png', content:'Ajouter en haut'},
    {event: 'addAfter', img:'assets/images/todo-app/rightClickTools/addAfter.png', content:'Ajouter en bas'},
    {event: 'update', img:'assets/images/todo-app/rightClickTools/update.png', content:'Modifier'},
    {event: 'delete', img:'assets/images/todo-app/rightClickTools/delete.png', content:'Suprimer'},
    {event: 'up', img:'assets/images/todo-app/rightClickTools/up.png', content:'Monter'},
    {event: 'down', img:'assets/images/todo-app/rightClickTools/down.png', content:'Descendre'},
    {event: 'pin', img:'assets/images/todo-app/rightClickTools/pin.png', content:'Epingler'}
  ];

  private indexOfLiRightClicTool: number = 0;
  private indexToAddTodoNote: number = 0;

  constructor(private todoNoteServicie: TodoNoteService){
  };

  public addNoteListe(addByMenu: boolean = false): void {
    if(addByMenu && this.indexToAddTodoNote != 0){
      this.indexToAddTodoNote = 0;
    }
    this.modalaleAddNote = true;
  }

  public closeAddNoteModale(): void {
    this.modalaleAddNote = false;
  }

  public validateAddNoteModale(inputNameTodo: HTMLInputElement):void {

    this.todoNoteServicie.addTodoNote({
      title: inputNameTodo.value,
      date: '10/10/2022',
      type: 'todo',
      content: []
    }, this.indexToAddTodoNote);

    this.modalaleAddNote = false;
  }

  public imgPath(type: string): string{
    if(type == 'todo'){
      return 'assets/images/todo-app/todoIcone.png';
    }else{
      return 'assets/images/todo-app/noteIcone.png';
    }
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
    switch (event) {
      case 'addBefor': this.AddBeforActionRightClicTools();
      break;
      case 'addAfter': this.AddAfterActionRightClicTools();
      break;
      case 'update': ;
      break;
      case 'delete': this.deleteActionRightClicTools();
      break;
      case 'up': this.upActionRightClicTools();
      break;
      case 'down': this.downActionRightClicTools();
      break;
    }
    this.rightClickToolsIsOpen = false;
  }

  private AddBeforActionRightClicTools() {
    this.addNoteListe();
    this.indexToAddTodoNote = this.indexOfLiRightClicTool;
  }

  private AddAfterActionRightClicTools() {
    this.addNoteListe();
    this.indexToAddTodoNote = this.indexOfLiRightClicTool + 1;
  }

  private deleteActionRightClicTools() {
    this.todoNoteServicie.todoNotes.splice(this.indexOfLiRightClicTool, 1);
  }

  private upActionRightClicTools() {
    if(this.indexOfLiRightClicTool > 0){
      this.todoNoteServicie.todoNotes.splice(this.indexOfLiRightClicTool-1, 0, this.todoNoteServicie.todoNotes[this.indexOfLiRightClicTool]);
      this.todoNoteServicie.todoNotes.splice(this.indexOfLiRightClicTool+1, 1);
    }
  }

  private downActionRightClicTools() {
    if(this.indexOfLiRightClicTool < this.todoNoteServicie.todoNotes.length){
      this.todoNoteServicie.todoNotes.splice(this.indexOfLiRightClicTool+2, 0, this.todoNoteServicie.todoNotes[this.indexOfLiRightClicTool]);
      this.todoNoteServicie.todoNotes.splice(this.indexOfLiRightClicTool, 1);
    }
  }
}
