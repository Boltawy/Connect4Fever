import { inject, Injectable, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BoardService } from './board.service';
import { BoardCell } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class MultiplayerService {
  protected readonly boardService = inject(BoardService);
  // protected readonly ngZone = inject(NgZone);
  socket: Socket;

  constructor() {
    this.socket = io('c4fever.eu-4.evennode.com', {
      transports: ['polling', 'websocket'],
      secure: false,
      rejectUnauthorized: false,
    });

    this.socket.off('connect');
    this.socket.off('disconnect');

    this.socket.on('connect', () => {
      console.log('Connected to server', this.socket.id);
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    this.socket.on('updateBoard', (boardArray: string[]) => {
      this.boardService.boardArray.set([...boardArray] as BoardCell[]);
      console.log('Board Updated');
    });
    this.socket.on('updatePointerArray', (pointerArray: number[]) => {
      this.boardService.diskPointerArray.set([...pointerArray]);
      console.log('Pointer Array Updated');
    });
    this.socket.on('updateGameState', (gameState: any) => {
      this.boardService.boardArray.set([...gameState.boardArray] as BoardCell[]);
      this.boardService.diskPointerArray.set([...gameState.diskPointerArray]);
      this.boardService.redTurn.set(gameState.redTurn);
      this.boardService.timer.set(gameState.timer);
      console.log('Game State Updated');
    });
    this.socket.on('restartGame', () => {
      this.boardService.restartGame();
    });
  }
}
