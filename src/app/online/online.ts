import { Component, computed, inject } from '@angular/core';
import { Board } from '../components/board/board';
import { Timer } from '../components/timer/timer';
import { MultiplayerService } from '../services/multiplayer.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-online',
  imports: [Board, Timer],
  template: `
    <h1
      class=" absolute top-1/10 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-bold tracking-wider"
    >
      You Are <span class="{{ playerColorClass() }}">{{ playerColor() }}</span>
    </h1>
    <app-board [isMultiplayer]="true"></app-board>
    <app-timer></app-timer>
  `,
  styles: `h1 {
  -webkit-text-stroke-width: 3px;
  paint-order: stroke fill;
  -webkit-text-stroke-color: black;
  }`,
})
export class Online {
  protected readonly boardService = inject(BoardService);
  protected readonly multiplayerService = inject(MultiplayerService);
  playerColor = computed(() => {
    return this.multiplayerService.serverGameState()?.player1Id ===
      this.multiplayerService.socket.id
      ? 'RED'
      : 'YELLOW';
  });
  playerColorClass = computed(() => {
    return this.playerColor() === 'RED' ? 'text-red-400' : 'text-yellow-300';
  });

  constructor() {
    this.multiplayerService.socket.connect();
  }

  ngOnDestroy(): void {
    this.boardService.stopGame();
    this.multiplayerService.socket.disconnect();
  }
}
