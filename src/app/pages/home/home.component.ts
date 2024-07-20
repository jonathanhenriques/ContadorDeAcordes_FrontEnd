import { Component, OnInit } from '@angular/core';
import { SimboloMusicaComponent } from '../../icons/simbolo-musica/simbolo-musica.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { MusicasService } from '../../services/musicas.service';
import { Musica } from '../../entidades/Musica';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SimboloMusicaComponent,
    RouterModule,
    CommonModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  listaDeMusicas: Musica[]

  constructor(private musicaService: MusicasService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.musicaService.getAll().subscribe(
      (resp: Musica[]) => {
        this.listaDeMusicas = resp;
      }, (erro) =>{
        if(erro.status == 500){
          alert('Problema na requisição')
        }
      }
    )
  }

  navigateToEdit(Id: number) {
    this.router.navigate(['/acordes', Id]);
  }



}
