import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcordesComponent } from './pages/acordes/acordes.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: 'acordes/:idmusica',
    component: AcordesComponent}
];
