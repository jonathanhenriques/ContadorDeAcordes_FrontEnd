import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Musica } from '../../entidades/Musica';
import { AcordesService } from '../../services/acordes.service';
import { Acorde } from '../../entidades/Acorde';
import { MusicasService } from '../../services/musicas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{

  nomeMusica: string = "";
  acorde: Acorde;
  listaDeAcordes: Acorde[] = []
  listaDeAcordesParaSalvar : Acorde[] = [];

  constructor(
    private acordesService: AcordesService,
    private musicasService: MusicasService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.getAll();
  }



  getById(id: number){
    this.acordesService.getByIdAcorde(id).subscribe(
      (resp: Acorde) => {
        this.acorde = resp;
      }, (erro) =>{
        if(erro.status == 500){
          alert('Problema na requisição')
        }
      }
    )
  }

  getAll(){
    this.acordesService.getAll().subscribe(
      (resp: Acorde[]) => {
        this.listaDeAcordes = resp;
      }, (erro) =>{
        if(erro.status == 500){
          alert('Problema na requisição')
        }
      }
    )
  }

  guardaListaAcordes(acorde: Acorde): void {
    this.listaDeAcordesParaSalvar.push(acorde);
    console.log('Acorde salvo:', acorde);
    console.log('Lista de acordes para salvar:', this.listaDeAcordesParaSalvar);
  }

  salvar(): void {
    const novaMusica = new Musica();
    novaMusica.nome = this.nomeMusica; // Defina o nome da música conforme necessário
    novaMusica.acordes = this.listaDeAcordesParaSalvar;

    this.musicasService.postMusica(novaMusica).subscribe(
      response => {
        console.log('Música salva com sucesso', response);
        this.router.navigate(['/']); // Redireciona para a tela de home
      },
      error => {
        console.error('Erro ao salvar música', error);
      }
    );
  }

  encerrar(){
    this.router.navigate(['/']); // Redireciona para a tela de home
  }
}
