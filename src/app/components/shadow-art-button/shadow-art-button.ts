import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-shadow-art-button',
  imports: [],
  template: `
    <button
      [class]="classes()"
      class="hover:-translate-y-0.5 transition-all active:translate-y-0.5"
    >
      <span class="">{{ textContent() }}</span>
      <span>{{ rightContent() || 'ICON' }}</span>
    </button>
  `,
  styles: ``,
})
export class ShadowArtButton {
  textContent = input<string>();
  rightContent = input<string>();
  extraClasses = input<string>();
  color = input<string>('bg-white');
  classes = computed(() => {
    return `rounded-xl px-4 py-2 w-full shadow-art font-bold flex justify-between items-center gap-20 ${this.color()} ${this.extraClasses()}`;
  });
}
