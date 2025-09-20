import { ShadowArtButton } from './../shadow-art-button/shadow-art-button';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MultiplayerService } from '../../services/multiplayer.service';

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
        routerLink="/online/1"
        (click)="createRoom()"
      ></app-shadow-art-button>
      <app-shadow-art-button
        textContent="JOIN A ROOM"
        color="bg-blue-200"
        routerLink="/online/1"
        (click)="joinRoom()"
      ></app-shadow-art-button>
    </div>
  `,
  styles: ``,
})
export class MainMenu {
  protected readonly multiplayerService = inject(MultiplayerService);
  // roomId = Math.floor(Math.random() * 1000000);

  createRoom() {
    this.multiplayerService.socket.connect();
    this.multiplayerService.socket.emit('createRoom', '1');
  }

  joinRoom() {
    this.multiplayerService.socket.connect();
    this.multiplayerService.socket.emit('joinRoom', '1');
    console.log(1);
  }
}
