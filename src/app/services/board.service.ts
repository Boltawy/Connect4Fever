import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardArray = Array(42).fill('empty');
  redTurn = signal(true);
  rowCount = 6;
  columnCount = 7;
  timerInterval: any;
  resetBoard() {
    this.boardArray.fill('empty');
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
  resetTimer() {
    this.timer.set(this.timerDefaultValue);
    clearInterval(this.timerInterval);
    this.startTimer();
  }
  stopTimer() {
    clearInterval(this.timerInterval);
  }

  resetGame() {
    this.resetBoard();
    this.redTurn.set(true);
    this.resetTimer();
    this.stopTimer();
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
      // console.log('checked right');
      if (this.boardArray[i] === playerTurn) {
        horizontalCount++;
      } else {
        break;
      }
    }
    for (let i = placedDiskIndex - 1; i > placedDiskIndex - placedDiskColumn - 1; i--) {
      // console.log('checked left');
      if (this.boardArray[i] === playerTurn) {
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
      if (this.boardArray[placedDiskIndex + i * this.columnCount] === playerTurn) {
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
      // console.log('checked right & down of placed disk');
      if (this.boardArray[placedDiskIndex + i * this.columnCount + i] === playerTurn) {
        leftToRightDiagonalCount++;
        console.log('leftToRightDiagonalCount', leftToRightDiagonalCount);
      } else {
        break;
      }
    }
    //* left & up of placed disk
    for (let i = 1; i < placedDiskRow && i < placedDiskColumn; i++) {
      // console.log('column', placedDiskColumn);
      // console.log('row', placedDiskRow);
      // console.log('checked left & up of placed disk');
      if (this.boardArray[placedDiskIndex - i * this.columnCount - i] === playerTurn) {
        leftToRightDiagonalCount++;
        console.log('leftToRightDiagonalCount', leftToRightDiagonalCount);
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
    // console.log('Placed Disk Column', placedDiskColumn);
    // console.log('Placed Disk Row', placedDiskRow);
    for (let i = 0; i < this.rowCount - placedDiskRow && i < this.columnCount; i++) {
      // console.log('checked left & down of placed disk');
      if (this.boardArray[placedDiskIndex + i * this.columnCount - i] === playerTurn) {
        rightToLeftDiagonalCount++;
        console.log('rightToLeftDiagonalCount', rightToLeftDiagonalCount);
      } else {
        break;
      }
    }
    //* right & up of placed disk
    for (let i = 1; i < placedDiskRow && i < this.columnCount - placedDiskColumn; i++) {
      // console.log('checked right & up of placed disk');
      if (this.boardArray[placedDiskIndex - i * this.columnCount + i] === playerTurn) {
        rightToLeftDiagonalCount++;
        console.log('rightToLeftDiagonalCount', rightToLeftDiagonalCount);
      } else {
        break;
      }
    }
    if (rightToLeftDiagonalCount >= 4) {
      alert(`${playerTurn} wins!`);
    }
  }
}
