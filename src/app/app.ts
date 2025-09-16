import { Component, signal } from '@angular/core';
import { Board } from './components/board/board';
import { Timer } from './components/timer/timer';
import { MainMenu } from './components/main-menu/main-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="w-screen h-screen flex items-center justify-center bg-violet-700 ">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {
  protected readonly title = signal('connect4fever');
}
