import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-board-hole',
  imports: [],
  template: `
    <div class="relative w-12 h-12">
      <div class="relative w-full h-full rounded-full overflow-hidden border-2 border-black">
        <div class="absolute inset-0 rounded-full {{ shadowColor() }}"></div>
        <div class="absolute inset-0 rounded-full {{ holeColor() }} translate-y-1"></div>
      </div>
    </div>
  `,
})
export class BoardHole {
  state = input<'empty' | 'red' | 'yellow'>('empty');
  holeColor = computed(() => {
    switch (this.state()) {
      case 'empty':
        return 'bg-violet-700';
      case 'red':
        return 'bg-red-400';
      case 'yellow':
        return 'bg-yellow-400';
    }
  });
  shadowColor = computed(() => {
    switch (this.state()) {
      case 'empty':
        return 'bg-black';
      case 'red':
        return 'bg-red-950';
      case 'yellow':
        return 'bg-yellow-950';
    }
  });
}
