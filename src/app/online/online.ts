import { Component, computed, inject } from '@angular/core';
import { Board } from '../components/board/board';
import { Timer } from '../components/timer/timer';
import { MultiplayerBoardService } from '../services/multiplayer.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-online',
  imports: [Board, Timer],
  template: `
    <div
      class="absolute top-1/10 min-w-content left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-art rounded-lg px-4 p-2 scale-[0.8] sm:scale-[0.9] md:scale-[1]"
    >
      <h1 class="text-3xl text-black font-bold tracking-wider">
        You Are <span class="{{ playerColorClass() }}">{{ playerColor() }}</span>
      </h1>
    </div>
    <app-board [isMultiplayer]="true"></app-board>
    <app-timer [isMultiplayer]="true"></app-timer>
  `,
  styles: `
    .min-w-content {
      min-width: max-content;
    }
  `,
})
export class Online {
  protected readonly multiplayerService = inject(MultiplayerBoardService);
  playerColor = computed(() => {
    return this.multiplayerService.serverGameState()?.player1Id ===
      this.multiplayerService.socket.id
      ? 'RED'
      : 'YELLOW';
  });
  playerColorClass = computed(() => {
    return this.playerColor() === 'RED' ? 'text-red-500' : 'text-yellow-400';
  });

  ngOnDestroy(): void {
    this.multiplayerService.stopGame();
    this.multiplayerService.socket.disconnect();
  }
}
