import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcordesComponent } from './pages/acordes/acordes.component';
import { CadastroMusicasComponent } from './pages/cadastro/cadastro-musicas/cadastro-musicas.component';
import { CadastroAcordesComponent } from './pages/cadastro/cadastro-acordes/cadastro-acordes.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  { path: 'acordes/:id',
    component: AcordesComponent},
  {
    path: "cadastro-musicas",
    component: CadastroMusicasComponent
  },
  {
    path: "cadastro-acordes",
    component: CadastroAcordesComponent
  },
  

];
