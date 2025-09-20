import { Component, inject } from '@angular/core';
import { Board } from '../components/board/board';
import { Timer } from '../components/timer/timer';
import { MultiplayerService } from '../services/multiplayer.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-online',
  imports: [Board, Timer],
  template: `
    <app-board [isMultiplayer]="true"></app-board>
    <app-timer></app-timer>
  `,
  styles: ``,
})
export class Online {
  protected readonly boardService = inject(BoardService);
  protected readonly multiplayerService = inject(MultiplayerService);

  constructor() {
    this.multiplayerService.socket.connect();
  }

  ngOnDestroy(): void {
    this.boardService.stopGame();
    this.multiplayerService.socket.disconnect();
  }
}
