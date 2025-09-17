import { Component, inject } from '@angular/core';
import { Board } from '../components/board/board';
import { Timer } from '../components/timer/timer';
import { MultiplayerService } from '../services/multiplayer.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-online',
  imports: [Board, Timer],
  template: `
    <app-board></app-board>
    <app-timer></app-timer>
  `,
  styles: ``,
})
export class Online {
  protected readonly multiplayerService = inject(MultiplayerService);
  protected readonly boardService = inject(BoardService);
  ngOnDestroy(): void {
    this.boardService.resetGame();
    this.multiplayerService.socket.disconnect();
  }
}
