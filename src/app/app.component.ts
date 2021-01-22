import { Component } from '@angular/core';
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

  constructor(private gameOfLifeService: GameOfLifeService) {
    this.numCols = 40;
    this.numRows = 40;
    this.generation = 0;
    this.gameStatus = 0;
    this.board = new Board(this.numCols, this.numRows);
  }
  ngOnInit(): void{
    setInterval(() => {
      if (this.gameStatus  === 0){
        this.board.checkBoard();
        this.generation++;
      }
    }, 100);
  }
  onClick(pRow, pCol): void{

    this.gameOfLifeService.getGenerationOne();

    this.board.changeStatus(pRow, pCol);
  }
  onClickPause(): void{
    this.gameStatus = this.gameStatus === 0 ? 1: 0;
  }
}
