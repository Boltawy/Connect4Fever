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
}
