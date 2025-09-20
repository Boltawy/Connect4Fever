import { inject, Injectable, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class MultiplayerService {
  protected readonly boardService = inject(BoardService);
  protected readonly ngZone = inject(NgZone);
  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
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
      this.ngZone.run(() => {
        this.boardService.boardArray = [...boardArray];
      });
      console.log('Board Updated');
    });
  }
}
