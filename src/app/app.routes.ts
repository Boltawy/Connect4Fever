import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { Local } from './local/local';
import { Online } from './online/online';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainMenu },
  { path: 'local', component: Local },
  { path: 'online/:roomId', component: Online },
];
