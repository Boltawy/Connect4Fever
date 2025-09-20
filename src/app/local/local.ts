import { Component, inject, OnDestroy } from '@angular/core';
import { Board } from '../components/board/board';
import { Timer } from '../components/timer/timer';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'local',
  imports: [Board, Timer],
  template: `
    <app-board></app-board>
    <app-timer></app-timer>
  `,
  styles: ``,
})
export class Local implements OnDestroy {
  protected readonly boardService = inject(BoardService);
  ngOnDestroy(): void {
    this.boardService.stopGame();
  }
}
