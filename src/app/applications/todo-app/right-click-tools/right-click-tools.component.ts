import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Tool } from 'src/app/shared/interfaces/tool.interface';

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
    this.rightClickTools!.nativeElement.style.left = this.X_positionRightClickTools.toString() + 'px';
    this.rightClickTools!.nativeElement.style.top = this.Y_positionRightClickTools.toString() + 'px';
  }

  public OnClickTool(eventAction: string): void {
    this.eventOnClickTool.emit(eventAction);
  }
}
