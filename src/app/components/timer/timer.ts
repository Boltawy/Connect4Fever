import { Component, computed, inject, input, signal } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { MultiplayerBoardService } from '../../services/multiplayer.service';

@Component({
  selector: 'app-timer',
  imports: [],
  template: `
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 sm:translate-y-4 md:-translate-y-4 lg:-translate-y-1 w-[300px] h-[300px] scale-[0.45] sm:scale-[0.6] lg:scale-[0.7] pointer-events-none"
    >
      <div
        class="absolute top-0 clip w-[300px] h-[300px] {{
          playerTurnColor()
        }} rounded-4xl transition-colors"
      ></div>
      <div
        class="absolute w-[300px] h-[150px] {{
          playerTurnColor()
        }} shadow-[0_10px_0_0_rgba(0,0,0,0.8)] border-l-4 border-r-4 border-b-4 translate-y-[295px] rounded-2xl flex flex-col items-center justify-center transition-colors"
      >
        <p class="text-white text-2xl font-bold">{{ playerTurn() }}'s turn !</p>
        <p class="text-white text-6xl font-bold">{{ this.boardService.timer() }}s</p>
      </div>
    </div>
  `,
  styles: `
.clip {
  clip-path: polygon(50% 80%, 0 100%, 100% 100%);
}
  `,
})
export class Timer {
  isMultiplayer = input<boolean>(false);
  protected readonly boardInjection = inject(BoardService)
  protected readonly multiPlayerInjection = inject(MultiplayerBoardService)
  protected boardService!: BoardService | MultiplayerBoardService;

  ngOnInit() {
    this.boardService = this.isMultiplayer() ? this.multiPlayerInjection : this.boardInjection;
  }

  playerTurn = computed(() => (this.boardService.redTurn() ? 'RED' : 'YELLOW'));
  playerTurnColor = computed(() => (this.boardService.redTurn() ? 'bg-red-400' : 'bg-yellow-400'));
}
