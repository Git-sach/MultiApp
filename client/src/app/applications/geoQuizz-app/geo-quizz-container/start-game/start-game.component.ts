import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit{

  @Output() eventGameState: EventEmitter<boolean> = new EventEmitter<boolean>;

  public foundNumbersDepartements: number[] = [];
  private departmentsNubers: number[] = [];
  private interval: ReturnType<typeof setInterval> | undefined;

  constructor(
    private router: Router
  ){
    for(let i=1; i<96; i++) {
      this.departmentsNubers.push(i)
    }
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      let rendom = Math.floor(Math.random()*this.departmentsNubers.length);
      this.foundNumbersDepartements.push(this.departmentsNubers[rendom]);
      this.foundNumbersDepartements = [...this.foundNumbersDepartements]
      this.departmentsNubers.splice(rendom, 1);
      if(this.departmentsNubers.length == 1) {
        clearInterval(this.interval);
      }
    }, 500);
  }

  public startGame(): void {
    this.router.navigate(['geoquizz','list']);
    this.eventGameState.emit(true);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
