import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from './board.model';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numCols: number;
  numRows: number;
  generation: number;
  gameStatus: number;
  board: Board;

  private subscriptions: Subscription = new Subscription();

  constructor(private gameOfLifeService: GameOfLifeService) {
    this.numCols = 40;
    this.numRows = 40;
    this.generation = 0;
    this.gameStatus = 1;
    this.board = new Board(this.numCols, this.numRows);
  }
  refresh(): void{
    this.gameOfLifeService.getGenerationOne();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void{

    this.subscriptions.add(this.gameOfLifeService.updater$.subscribe(generation => {
      generation.aliveCells.map(aliveCell => {
        this.board.populate(aliveCell.row, aliveCell.column);
      });
    }));
    this.refresh();

    // setInterval(() => {
    //   if (this.gameStatus  === 0){
    //     this.board.checkBoard();
    //     this.generation++;
    //   }
    // }, 100);
  }
  onClick(pRow, pCol): void{
    this.board.changeStatus(pRow, pCol);
  }
  onClickPause(): void{
    this.gameStatus = this.gameStatus === 0 ? 1 : 0;
    const listAliveCells = this.board.listAliveCells();
    this.gameOfLifeService.postGeneration(listAliveCells);
  }
}
