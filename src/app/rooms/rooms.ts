import { Component, computed, inject, signal } from '@angular/core';
import { ShadowArtButton } from '../components/shadow-art-button/shadow-art-button';
import { MultiplayerBoardService } from '../services/multiplayer.service';
import { socketEvents } from '../../types';

@Component({
  selector: 'app-rooms',
  imports: [ShadowArtButton],
  template: `
    <div class="flex flex-col gap-4 justify-center px-6 py-8 bg-violet-800 rounded-lg shadow-art">
      @if (rooms() && rooms().length > 0) { @for (room of rooms(); track $index) {
      <app-shadow-art-button
        textContent="{{ room.roomId }}"
        rightContent="{{ room.player1Id }}"
        (click)="joinRoom(room.roomId)"
        color="bg-blue-200"
      ></app-shadow-art-button>
      } } @else {
      <app-shadow-art-button
        textContent="No Rooms Found"
        color="bg-blue-200"
      ></app-shadow-art-button>
      }
    </div>
  `,
  styles: ``,
})
export class Rooms {
  protected readonly multiplayerService = inject(MultiplayerBoardService);
  rooms = computed(() => this.multiplayerService.rooms());

  constructor() {
    this.multiplayerService.connect();
    this.multiplayerService.socket.emit(socketEvents.GET_ROOMS_REQUEST);
  }

  joinRoom(roomId: string) {
    this.multiplayerService.socket.emit(socketEvents.JOIN_ROOM_REQUEST, roomId);
  }
}
