import { ApiService } from './api.service';
import { inject, Injectable, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BoardService } from './board.service';
import { BoardCell } from './board.service';
import { OnInit } from '@angular/core';

export const API_URLS = {
  evennode: 'https://c4fever.eu-4.evennode.com',
  vercel: 'https://connect4fever-api.vercel.app',
  railway: 'https://connect4fever-api-production.up.railway.app',
  local: 'http://localhost:3000',
};

export const BE_URL = API_URLS.evennode;

@Injectable({
  providedIn: 'root',
})
export class MultiplayerService {
  protected readonly boardService = inject(BoardService);
  protected readonly apiService = inject(ApiService);

  socket: Socket;

  constructor() {
    this.socket = io(BE_URL, {
      transports: ['polling', 'websocket'],
      secure: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
    this.apiService.sayHelloWorld().subscribe((res) => {
      console.log(res, `currently connected to ${BE_URL}`);
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
