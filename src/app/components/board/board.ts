import { Component, HostListener, inject, input, signal } from '@angular/core';
import { BoardHole } from '../board-hole/board-hole';
import { BoardService } from '../../services/board.service';
import { MultiplayerService } from '../../services/multiplayer.service';

@Component({
  selector: 'app-board',
  imports: [BoardHole],
  template: `
    <div
      class="absolute top-[55%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white aspect-[7/6] border-3 border-black rounded-3xl p-4 pb-10 grid grid-cols-7 grid-rows-6 gap-3.5 shadow-[0_10px_0_0_rgba(0,0,0,0.8)] {{
        this.scaling
      }}"
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

  isMultiplayer = input<boolean>(false);
  protected readonly multiplayerService = inject(MultiplayerService);

  handleNumberKeyPress(event: KeyboardEvent) {
    if (Number(event.key) < 8 && Number(event.key) > 0) {
      this.handleHoleClick(Number(event.key) - 1);
    }
  }

  handleResetKeyPress(event: KeyboardEvent) {
    if (event.key === 'r') {
      this.boardService.resetBoard();
      this.diskPointerArray.set([35, 36, 37, 38, 39, 40, 41]);
      this.boardService.resetTimer();
    }
  }

  scaling = 'scale-[0.67] sm:scale-[1] lg:scale-[1.1]';

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
  redTurn = this.boardService.redTurn;

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

    this.boardService.checkForWin(placedDiskIndex, placedDiskColumn, placedDiskRow, playerTurn);
    this.playDropSound();
    this.redTurn.set(!this.redTurn());
    this.boardService.resetTimer();
    if (this.multiplayerService.socket?.connected) {
      try {
        console.log('Emitting board update:');
        this.multiplayerService.socket.emit('updateBoardRequest', this.boardArray);
      } catch (error) {
        console.error('Failed to emit board update:', error);
      }
    } else {
      console.log('Socket is not connected');
    }
  }
}
