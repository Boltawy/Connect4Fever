import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { VsPlayer } from './vs-player/vs-player';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: MainMenu },
    { path: 'vs-player', component: VsPlayer },
];
