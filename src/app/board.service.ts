import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardArray = Array(42).fill('empty');
  redTurn = signal(true);
  rowCount = 6;
  columnCount = 7;
  resetBoard() {
    this.boardArray.fill('empty');
  }
}
