import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Musica } from '../../../entidades/Musica';
import { AcordesService } from '../../../services/acordes.service';
// import { Acorde } from '../../entidades/Acorde';
import { MusicasService } from '../../../services/musicas.service';
import { Router } from '@angular/router';
import { Acorde } from '../../../entidades/types/Acorde.type';

@Component({
  selector: 'app-cadastro-musicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-musicas.component.html',
  styleUrl: './cadastro-musicas.component.scss'
})
export class CadastroMusicasComponent implements OnInit{

  nomeMusica: string = "";
  acorde: Acorde;
  listaDeAcordes: Acorde[] = []
  listaDeAcordesParaSalvar : Acorde[] = []
  isNomeMusicaInvalid: boolean = false;

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
  removerAcorde(acorde: Acorde): void{
    if (this.listaDeAcordesParaSalvar.length > 0){
      const index = this.listaDeAcordesParaSalvar.findIndex(a => a === acorde);
      if (index !== -1) {
        this.listaDeAcordesParaSalvar.splice(index, 1);
      }
    }
  }

  removerUltimoAcorde(): void {
    if (this.listaDeAcordesParaSalvar.length > 0) {
      this.listaDeAcordesParaSalvar.pop();
    }
  }

  salvar(): void {

    this.isNomeMusicaInvalid = !this.nomeMusica || this.nomeMusica.trim() === "";
    if (this.isNomeMusicaInvalid) {
      return;
    }

    if (!this.nomeMusica || this.nomeMusica.trim() === "") {
      // Se nomeMusica for null, undefined ou uma string vazia (após remover espaços em branco)
      return;
    }

    if (!this.listaDeAcordesParaSalvar || this.listaDeAcordesParaSalvar.length === 0) {
      return;
    }


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
