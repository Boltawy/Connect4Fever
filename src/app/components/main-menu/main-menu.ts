import { ShadowArtButton } from './../shadow-art-button/shadow-art-button';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [ShadowArtButton, RouterLink],
  template: `
    <div class="flex flex-col gap-4 justify-center px-6 py-8 bg-violet-800 rounded-lg shadow-art">
      <app-shadow-art-button textContent="2-PLAYER LOCAL" color="bg-red-300" routerLink="/local"></app-shadow-art-button>
      <app-shadow-art-button textContent="VS. CPU" color="bg-yellow-200"></app-shadow-art-button>
      <app-shadow-art-button textContent="ONLINE" color="bg-blue-200" routerLink="/online"></app-shadow-art-button>
    </div>
  `,
  styles: ``,
})
export class MainMenu {}
