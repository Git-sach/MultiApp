import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Tool } from 'src/app/applications/todo-app/shared/interfaces/tool.interface';

@Component({
  selector: 'app-right-click-tools',
  templateUrl: './right-click-tools.component.html',
  styleUrls: ['./right-click-tools.component.scss']
})
export class RightClickToolsComponent implements OnChanges, AfterViewInit{
  @Input() public X_positionRightClickTools: number = 0;
  @Input() public Y_positionRightClickTools: number = 0;
  @Input() public configRightClickTools: Array<Tool> = [];

  @ViewChild('rightClickTools') public rightClickTools?: ElementRef<HTMLDivElement>;

  @Output() public eventOnClickTool: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit(){
    this.updatePositionRightClic();
  }

  ngOnChanges(changes: SimpleChanges){
    if(!changes['X_positionRightClickTools'].firstChange){
      this.updatePositionRightClic();
    }
  };

  private updatePositionRightClic(): void{
    // dimentions of screen
    let heightOfScreen: number | undefined = this.rightClickTools?.nativeElement.ownerDocument.documentElement.clientHeight;
    let widthOfScreen: number | undefined = this.rightClickTools?.nativeElement.ownerDocument.documentElement.clientWidth;

    // dimentions of right clic tool
    let heightOfRightClicTool: number = this.rightClickTools!.nativeElement.clientHeight;
    let widthOfRightClicTool: number = this.rightClickTools!.nativeElement.clientWidth;

    // position of scroll
    let scrollOfScreen: number = this.rightClickTools!.nativeElement.ownerDocument.scrollingElement!.scrollTop;

    // positions of initial right click
    let X_positionRightClickToolsCalculated: number = 0;
    let Y_positionRightClickToolsCalculated: number = 0;

    // reporsitionenement tool en x
    if(this.X_positionRightClickTools + widthOfRightClicTool > widthOfScreen!){
      X_positionRightClickToolsCalculated = this.X_positionRightClickTools - widthOfRightClicTool;
    } else {
      X_positionRightClickToolsCalculated = this.X_positionRightClickTools;
    }

    // reporsitionenement tool en y
    if(this.Y_positionRightClickTools + heightOfRightClicTool > heightOfScreen!){
      Y_positionRightClickToolsCalculated = this.Y_positionRightClickTools - heightOfRightClicTool + scrollOfScreen;
    } else {
      Y_positionRightClickToolsCalculated = this.Y_positionRightClickTools + scrollOfScreen;
    }

    this.rightClickTools!.nativeElement.style.left = X_positionRightClickToolsCalculated.toString() + 'px';
    this.rightClickTools!.nativeElement.style.top = Y_positionRightClickToolsCalculated.toString() + 'px';
  }

  public OnClickTool(eventAction: string): void {
    this.eventOnClickTool.emit(eventAction);
  }
}
