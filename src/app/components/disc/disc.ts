import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-disc',
  imports: [],
  template: `
    <div class="relative w-full h-full overflow-hidden">
      <div class="absolute w-full h-full rounded-full bg-black/80"></div>
      <div class="absolute w-full h-full rounded-full translate-y-1 {{ color() }}"></div>
    </div>
  `,
  styles: ``,
})
export class Disc {
  protected readonly color = signal('bg-red-500');
}
