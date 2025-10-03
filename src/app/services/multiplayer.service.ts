import { ApiService } from './api.service';
import { inject, Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BoardService } from './board.service';
import { IMultiplayerGameState, socketEvents } from '../../types';
import { Router } from '@angular/router';

export const API_URLS = {
  evennode: 'http://c4fever.eu-4.evennode.com',
  vercel: 'https://connect4fever-api.vercel.app',
  railway: 'https://connect4fever-socket-production.up.railway.app',
  hidenCloud: 'nile.hidencloud.com:24593',
  local: 'http://localhost:3000',
};

export const BE_URL = API_URLS.local;

@Injectable({
  providedIn: 'root',
})
export class MultiplayerBoardService extends BoardService {
  protected readonly apiService = inject(ApiService);
  protected readonly router = inject(Router);
  serverGameState = signal<IMultiplayerGameState>({} as IMultiplayerGameState);
  rooms = signal<IMultiplayerGameState[]>([]);

  updateGameState(gameState: IMultiplayerGameState) {
    this.boardArray.set(gameState.boardArray);
    this.diskPointerArray.set(gameState.diskPointerArray);
    this.redTurn.set(gameState.redTurn);
    this.timer.set(gameState.timer);
    if (gameState.player1Id && gameState.player2Id && gameState.roomId) {
      this.serverGameState.set(gameState);
    }
  }

  socket!: Socket;

  connect() {
    this.socket = io(BE_URL, {
      transports: ['websocket'],
    });
    this.apiService.sayHelloWorld().subscribe((res) => {
      console.log(res, `currently connected to ${BE_URL}`);
    });

    this.socket.off(socketEvents.CONNECT);
    this.socket.off(socketEvents.DISCONNECT);

    this.socket.on(socketEvents.CONNECT, () => {
      console.log('Connected to server', this.socket.id);
    });
    this.socket.on(socketEvents.DISCONNECT, () => {
      console.log('Disconnected from server');
    });

    this.socket.on(socketEvents.CREATE_ROOM_RESPONSE, (gameState: IMultiplayerGameState) => {
      this.updateGameState(gameState);
      console.log('Navigating to /online', gameState.roomId);
      this.router.navigate(['/online', gameState.roomId]);
      this.serverGameState.set(gameState);
    });

    this.socket.on(socketEvents.GET_ROOMS_RESPONSE, (rooms: IMultiplayerGameState[]) => {
      this.rooms.set(rooms);
      console.log(this.rooms());
    });

    this.socket.on(socketEvents.JOIN_ROOM_RESPONSE, (gameState: IMultiplayerGameState) => {
      this.updateGameState(gameState);
      console.log('Navigating to /online', gameState.roomId);
      this.router.navigate(['/online', gameState.roomId]);
      this.serverGameState.set(gameState);
    });

    this.socket.on(socketEvents.UPDATE_GAME_STATE, (gameState: IMultiplayerGameState) => {
      this.updateGameState(gameState);
      this.serverGameState.set(gameState);
    });
    this.socket.on(socketEvents.RESTART_GAME, () => {
      this.restartGame();
    });
    this.socket.on(socketEvents.PLAY_DISC_SOUND, () => {
      this.playDropSound();
    });
  }
  

  constructor() {
    super();
  }
}
