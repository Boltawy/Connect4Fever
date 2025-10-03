import { Injectable, signal } from '@angular/core';
import { BoardCell } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardArray = signal<BoardCell[]>(Array(42).fill(BoardCell.EMPTY));
  diskPointerArray = signal<Array<number>>([35, 36, 37, 38, 39, 40, 41]);
  redTurn = signal(true);
  rowCount = 6;
  columnCount = 7;
  timerInterval: any;
  resetBoard() {
    this.boardArray.set(Array(42).fill(BoardCell.EMPTY));
  }

  timerDefaultValue = 20;
  timer = signal<number>(this.timerDefaultValue);
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer.set(this.timer() - 1);
      if (this.timer() === 0) {
        clearInterval(this.timerInterval);
        this.redTurn.set(!this.redTurn());
        this.resetTimer();
      }
    }, 1000);
  }

  // pauseTimer() {
  //   clearInterval(this.timerInterval);
  // }

  // resumeTimer() {
  //   this.startTimer();
  // }

  resetTimer() {
    this.timer.set(this.timerDefaultValue);
    clearInterval(this.timerInterval);
    this.startTimer();
  }
  stopTimer() {
    clearInterval(this.timerInterval);
  }

  stopGame() {
    this.resetBoard();
    this.redTurn.set(true);
    this.resetTimer();
    this.stopTimer();
  }

  restartGame() {
    this.resetBoard();
    this.redTurn.set(true);
    this.resetTimer();
  }

  checkForWin(
    placedDiskIndex: number,
    placedDiskColumn: number,
    placedDiskRow: number,
    playerTurn: string
  ) {
    this.checkForHorizontalWin(placedDiskIndex, placedDiskColumn, playerTurn);
    this.checkForVerticalWin(placedDiskIndex, placedDiskColumn, placedDiskRow, playerTurn);
    this.checkForDiagonalWin(placedDiskIndex, placedDiskColumn, placedDiskRow, playerTurn);
  }

  checkForHorizontalWin(placedDiskIndex: number, placedDiskColumn: number, playerTurn: string) {
    let horizontalCount: number = 0;

    for (
      let i = placedDiskIndex;
      i < placedDiskIndex + (this.columnCount - placedDiskColumn);
      i++
    ) {
      if (this.boardArray()[i] === playerTurn) {
        horizontalCount++;
      } else {
        break;
      }
    }
    for (let i = placedDiskIndex - 1; i > placedDiskIndex - placedDiskColumn - 1; i--) {
      if (this.boardArray()[i] === playerTurn) {
        horizontalCount++;
      } else {
        break;
      }
    }
    if (horizontalCount >= 4) {
      alert(`${playerTurn} wins!`);
    }
  }

  checkForVerticalWin(
    placedDiskIndex: number,
    placedDiskColumn: number,
    placedDiskRow: number,
    playerTurn: string
  ) {
    let verticalCount: number = 0;
    for (let i = 0; i < this.rowCount - placedDiskRow; i++) {
      if (this.boardArray()[placedDiskIndex + i * this.columnCount] === playerTurn) {
        verticalCount++;
      } else {
        break;
      }
    }
    if (verticalCount >= 4) {
      alert(`${playerTurn} wins!`);
    }
  }

  checkForDiagonalWin(
    placedDiskIndex: number,
    placedDiskColumn: number,
    placedDiskRow: number,
    playerTurn: string
  ) {
    //! left to right diagonal
    let leftToRightDiagonalCount: number = 0;
    //* right & down of placed disk
    for (
      let i = 0;
      i < this.rowCount - placedDiskRow && i < this.columnCount - placedDiskColumn;
      i++
    ) {
      if (this.boardArray()[placedDiskIndex + i * this.columnCount + i] === playerTurn) {
        leftToRightDiagonalCount++;
      } else {
        break;
      }
    }
    //* left & up of placed disk
    for (let i = 1; i < placedDiskRow && i < placedDiskColumn; i++) {
      if (this.boardArray()[placedDiskIndex - i * this.columnCount - i] === playerTurn) {
        leftToRightDiagonalCount++;
      } else {
        break;
      }
    }
    if (leftToRightDiagonalCount >= 4) {
      alert(`${playerTurn} wins!`);
    }

    //! right to left diagonal
    let rightToLeftDiagonalCount: number = 0;
    //* left & down of placed disk
    for (let i = 0; i < this.rowCount - placedDiskRow && i < this.columnCount; i++) {
      if (this.boardArray()[placedDiskIndex + i * this.columnCount - i] === playerTurn) {
        rightToLeftDiagonalCount++;
      } else {
        break;
      }
    }
    //* right & up of placed disk
    for (let i = 1; i < placedDiskRow && i < this.columnCount - placedDiskColumn; i++) {
      if (this.boardArray()[placedDiskIndex - i * this.columnCount + i] === playerTurn) {
        rightToLeftDiagonalCount++;
      } else {
        break;
      }
    }
    if (rightToLeftDiagonalCount >= 4) {
      alert(`${playerTurn} wins!`);
    }
  }
}
