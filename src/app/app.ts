import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Board } from './components/board/board';
import { Timer } from './components/timer/timer';

@Component({
  selector: 'app-root',
  imports: [Board, Timer],
  template: `
    <div class="w-screen h-screen flex items-center justify-center bg-violet-700 ">
    <app-board></app-board>
      <app-timer></app-timer>
    </div>
  `,
})
export class App {
  protected readonly title = signal('connect4fever');
}
