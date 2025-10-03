import { ShadowArtButton } from './../shadow-art-button/shadow-art-button';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MultiplayerBoardService } from '../../services/multiplayer.service';
import { Router } from '@angular/router';
import { socketEvents } from '../../../types';

@Component({
  selector: 'app-main-menu',
  imports: [ShadowArtButton, RouterLink],
  template: `
    <div class="flex flex-col gap-4 justify-center px-6 py-8 bg-violet-800 rounded-lg shadow-art">
      <app-shadow-art-button
        textContent="2-PLAYER LOCAL"
        color="bg-red-300"
        routerLink="/local"
      ></app-shadow-art-button>
      <app-shadow-art-button textContent="VS. CPU" color="bg-yellow-200"></app-shadow-art-button>
      <app-shadow-art-button
        textContent="CREATE A ROOM"
        color="bg-blue-200"
        (click)="createRoom()"
      ></app-shadow-art-button>
      <app-shadow-art-button
        textContent="JOIN A ROOM"
        color="bg-blue-200"
        (click)="joinRoom()"
      ></app-shadow-art-button>
    </div>
  `,
  styles: ``,
})
export class MainMenu {
  protected readonly multiplayerBoardService = inject(MultiplayerBoardService);
  protected readonly router = inject(Router);

  // roomId = Math.floor(Math.random() * 1000000);

  async createRoom() {
    try {
      this.multiplayerBoardService.connect()
      this.multiplayerBoardService.socket.emit(socketEvents.CREATE_ROOM_REQUEST);
    } catch (error) {
      console.log(error);
    }
  }

  async joinRoom() {
    try {
      this.multiplayerBoardService.connect()
      this.router.navigate(['/rooms']);
    } catch (error) {
      console.log(error);
    }
  }
}
