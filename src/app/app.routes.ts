import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcordesComponent } from './pages/acordes/acordes.component';
import { CadastroMusicasComponent } from './pages/cadastro/cadastro-musicas/cadastro-musicas.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: 'acordes/:id',
    component: AcordesComponent}
    ,{
      path: "cadastro",
      component: CadastroMusicasComponent
    },
];
