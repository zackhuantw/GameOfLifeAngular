export class Board{
  board: number[][];
  constructor(pWidth, pHeight){
    this.board = [];
    for (let i = 0; i < pWidth; i++){
      this.board[i] = [];
      for (let j = 0; j < pHeight; j++){
        this.board[i][j] = 0;
      }
    }
  }
  status(cordX: number, cordY: number): number{
    return this.board[cordX][cordY];
  }
  changeStatus(cordX: number, cordY: number): void{
    this.board[cordX][cordY] = this.board[cordX][cordY] === 0 ? 1 : 0;
  }
  checkBoard(): void{
    const tmpBoard = [];
    for (let i = 0; i < this.board.length; i++){
      tmpBoard[i] = [];
      for (let j = 0; j < this.board[i].length; j++){
        tmpBoard[i].push(this.checkRules(i, j));
      }
    }
    this.board = [...tmpBoard];
  }
  checkRules(cordX: number, cordY: number): number{
    const width = this.board.length;
    const height = this.board[0].length;
    const xMinus = cordX - 1 < 0 ? width - 1 : cordX - 1;
    const xPlus = cordX + 1 >= width ? 0 : cordX + 1;
    const yMinus = cordY - 1 < 0 ? height - 1 : cordY - 1;
    const yPlus = cordY + 1 >= height ? 0 : cordY + 1;
    const currentStatus = this.board[cordX][cordY];
    const neighbors = this.board[xMinus][yMinus]
      + this.board[xMinus][cordY]
      + this.board[xMinus][yPlus]
      + this.board[cordX][yMinus]
      + this.board[cordX][yPlus]
      + this.board[xPlus][yMinus]
      + this.board[xPlus][cordY]
      + this.board[xPlus][yPlus];
    if ((currentStatus === 1) && (neighbors === 2 || neighbors === 3)){
      return 1;
    }
    if (currentStatus === 0 && neighbors === 3){
      return 1;
    }
    return 0;
  }
}
