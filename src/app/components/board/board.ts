import { Component, HostListener, inject, input, OnInit } from '@angular/core';
import { BoardHole } from '../board-hole/board-hole';
import { BoardService } from '../../services/board.service';
import { MultiplayerBoardService } from '../../services/multiplayer.service';
import { BoardCell, socketEvents } from '../../../types';

@Component({
  selector: 'app-board',
  imports: [BoardHole],
  template: `
    <div
      class="absolute top-[55%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white aspect-[7/6] border-3 border-black rounded-3xl p-4 pb-10 grid grid-cols-7 grid-rows-6 gap-3.5 shadow-[0_10px_0_0_rgba(0,0,0,0.8)] {{
        this.scaling
      }}"
    >
      @for (hole of boardService.boardArray(); track $index) {
      <app-board-hole
        [state]="boardService.boardArray()[$index]"
        (click)="handleHoleClick($index)"
      ></app-board-hole>
      }
    </div>
  `,
})
export class Board implements OnInit {
  @HostListener('document:keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    this.handleNumberKeyPress(event);
    this.handleResetKeyPress(event);
  }

  isMultiplayer = input<boolean>(false);
  protected boardService!: BoardService | MultiplayerBoardService;
  protected readonly boardInjection = inject(BoardService)
  protected readonly multiPlayerInjection = inject(MultiplayerBoardService)


  ngOnInit() {
    this.boardService = this.isMultiplayer() ? this.multiPlayerInjection : this.boardInjection;
    this.boardService.startTimer();
  }


  handleNumberKeyPress(event: KeyboardEvent) {
    if (Number(event.key) < 8 && Number(event.key) > 0) {
      this.handleHoleClick(Number(event.key) - 1);
    }
  }

  handleResetKeyPress(event: KeyboardEvent) {
    if (event.key === 'r') {
      this.boardService.resetBoard();
      if (this.isMultiplayer() && this.boardService instanceof MultiplayerBoardService) {
        this.boardService.socket.emit(
          socketEvents.RESTART_GAME,
          this.boardService.serverGameState().roomId
        );
        console.log(this.boardService.serverGameState());
      }
      this.boardService.diskPointerArray.set([35, 36, 37, 38, 39, 40, 41]);
      this.boardService.resetTimer();
    }
  }

  scaling = 'scale-[0.67] sm:scale-[1] lg:scale-[1.1]';

  // protected readonly boardArray = this.boardService.boardArray;
  // protected readonly columnCount = this.boardService.columnCount;
  // protected readonly rowCount = this.boardService.rowCount;
  // protected readonly diskPointerArray = this.boardService.diskPointerArray;

  dropSound = new Audio('disc.mp3');
  playDropSound() {
    this.dropSound.currentTime = 0;
    this.dropSound.play();
  }

  // redTurn = this.boardService.redTurn;

  handleHoleClick(clickedDiskIndex: number) {
    const clickedHoleColumn = clickedDiskIndex % this.boardService.columnCount;
    const clickedHoleRow = Math.floor(clickedDiskIndex / this.boardService.columnCount);
    const placedDiskIndex = this.boardService.diskPointerArray()[clickedHoleColumn];
    const placedDiskColumn = placedDiskIndex % this.boardService.columnCount;
    const placedDiskRow = Math.floor(placedDiskIndex / this.boardService.columnCount);
    const playerTurn = this.boardService.redTurn() ? 'red' : 'yellow';

    if (this.boardService.boardArray()[clickedDiskIndex] !== 'empty') {
      return;
    }

    if (this.isMultiplayer() && this.boardService instanceof MultiplayerBoardService) {
      if (
        (this.boardService.socket!.id === this.boardService.serverGameState().player1Id &&
          !this.boardService.redTurn()) ||
        (this.boardService.socket!.id === this.boardService.serverGameState().player2Id &&
          this.boardService.redTurn())
      ) {
        return;
      }
    }

    this.boardService.boardArray()[placedDiskIndex] = playerTurn as BoardCell;

    this.boardService.diskPointerArray.update((pointerArray) => {
      pointerArray[clickedHoleColumn] -= this.boardService.columnCount;
      return pointerArray;
    });

    this.boardService.checkForWin(placedDiskIndex, placedDiskColumn, placedDiskRow, playerTurn);
    this.playDropSound();
    this.boardService.redTurn.set(!this.boardService.redTurn());
    this.boardService.resetTimer();
    if (
      this.boardService instanceof MultiplayerBoardService &&
      this.boardService.socket.connected
    ) {
      try {
        console.log('Emitting board update:');
        this.boardService.socket.emit(socketEvents.UPDATE_GAME_STATE, {
          boardArray: this.boardService.boardArray(),
          diskPointerArray: this.boardService.diskPointerArray(),
          redTurn: this.boardService.redTurn(),
          timer: this.boardService.timer(),
          roomId: this.boardService.serverGameState().roomId,
        });
        this.boardService.socket.emit(
          socketEvents.PLAY_DISC_SOUND,
          this.boardService.serverGameState().roomId
        );
      } catch (error) {
        console.error('Failed to emit board update:', error);
      }
    } else {
      console.log('Socket is not connected');
    }
  }
  ngOnDestroy(): void {
    this.boardService.resetGameState();
  }
}
