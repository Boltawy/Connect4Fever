import { Component, HostListener, inject, signal } from '@angular/core';
import { BoardHole } from '../board-hole/board-hole';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-board',
  imports: [BoardHole],
  template: `
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white aspect-[7/6] border-3 border-black rounded-3xl p-4 grid grid-cols-7 grid-rows-6 gap-3.5  md:scale-[1] lg:scale-[1.5]"
    >
      @for (hole of boardService.boardArray; track $index) {
      <app-board-hole
        [state]="boardService.boardArray[$index]"
        (click)="handleHoleClick($index)"
      ></app-board-hole>
      }
    </div>
  `,
})
export class Board {
  @HostListener('document:keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    this.handleNumberKeyPress(event);
    this.handleResetKeyPress(event);
  }

  handleNumberKeyPress(event: KeyboardEvent) {
    if (Number(event.key) < 8 && Number(event.key) > 0) {
      this.handleHoleClick(Number(event.key) - 1);
    }
  }

  handleResetKeyPress(event: KeyboardEvent) {
    if (event.key === 'r') {
      this.boardService.resetBoard();
      this.diskPointerArray.set([35, 36, 37, 38, 39, 40, 41]);
    }
  }

  protected readonly boardService = inject(BoardService);
  protected readonly boardArray = this.boardService.boardArray;
  protected readonly columnCount = this.boardService.columnCount;
  protected readonly rowCount = this.boardService.rowCount;

  dropSound = new Audio('disc.mp3');
  playDropSound() {
    this.dropSound.currentTime = 0;
    this.dropSound.play();
  }

  diskPointerArray = signal<Array<number>>([35, 36, 37, 38, 39, 40, 41]);
  redTurn = signal(true);

  handleHoleClick(clickedDiskIndex: number) {
    const clickedHoleColumn = clickedDiskIndex % this.columnCount;
    const clickedHoleRow = Math.floor(clickedDiskIndex / this.columnCount);
    const placedDiskIndex = this.diskPointerArray()[clickedHoleColumn];
    const placedDiskColumn = placedDiskIndex % this.columnCount;
    const placedDiskRow = Math.floor(placedDiskIndex / this.columnCount);
    const playerTurn = this.redTurn() ? 'red' : 'yellow';

    if (this.boardArray[clickedDiskIndex] !== 'empty') {
      return;
    }
    this.boardArray[placedDiskIndex] = playerTurn;
    this.diskPointerArray()[clickedHoleColumn] -= this.columnCount;

    this.checkForWin(placedDiskIndex, placedDiskColumn, placedDiskRow, playerTurn);
    this.playDropSound();
    this.redTurn.set(!this.redTurn());
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
