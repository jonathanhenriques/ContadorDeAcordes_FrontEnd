import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcordesComponent } from './pages/acordes/acordes.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: 'acordes/:id',
    component: AcordesComponent}
    ,{
      path: "cadastro",
      component: CadastroComponent
    },
];
