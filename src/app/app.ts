import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Board } from './components/board/board';

@Component({
  selector: 'app-root',
  imports: [Board],
  template: `
    <div class="w-screen h-screen flex items-center justify-center bg-violet-700">
      <app-board></app-board>
    </div>
  `,
})
export class App {
  protected readonly title = signal('connect4fever');
}
