import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, delay, expand, of, repeat, take } from 'rxjs';
import { MusicasService } from '../../services/musicas.service';
import { Musica } from '../../entidades/Musica';
// import { Acorde } from '../../entidades/Acorde';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Acorde } from '../../entidades/types/Acorde.type';

@Component({
  selector: 'app-acordes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acordes.component.html',
  styleUrl: './acordes.component.scss'
})
export class AcordesComponent implements OnInit{

  idMusica: number = 0;
  musica: Musica;
  listaDeAcordes: Acorde[];

  showContent: boolean = false; // Controla a exibição do conteúdo
  words: string[] = ['palavra1', 'palavra2', 'palavra3', 'palavra4'];
  acordeAtual: string = 'C';
  nomeAcordeAtual: string = '';
  displayTime: number = 0; // Tempo em milissegundos (2 segundos)
  valorRitmo: number; // Variável para armazenar o valor do input

  repetirSequencia: boolean = true;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private musicaService: MusicasService
  ) { }

  ngOnInit(): void {
    this.idMusica = this.route.snapshot.params['id'];
    this.getById(this.idMusica);

  }

  getById(id: number){
    this.musicaService.getByIdMusica(id).subscribe(
      (resp: Musica) => {
        this.musica = resp;
        this.listaDeAcordes = resp.acordes;
        this.displayWords();
      }, (erro) =>{
        if(erro.status == 500){
          alert('Problema na requisição')
        }
      }
    )
  }


  repetir() {

    this.showContent = true;
    this.displayTime = this.valorRitmo*1000;
    this.displayWordsRepetir();

  }



  displayWords() {
    of(...this.listaDeAcordes).pipe(
      concatMap(word =>
        of(word).pipe(delay(this.displayTime))
      )
    ).subscribe(word => {
      if (word) {
        this.acordeAtual = word.letra;
        this.nomeAcordeAtual = word.nome;
      }
    });
  }

  displayWordsRepetir() {
    of(...this.listaDeAcordes).pipe(
      concatMap(word =>
        of(word).pipe(delay(this.displayTime))
      ),
      repeat() // Faz com que o Observable repita infinitamente
    ).subscribe(word => {
      if (word) {
        this.acordeAtual = word.letra;
        this.nomeAcordeAtual = word.nome;
      }
    });
  }


  comecar() {
    this.showContent = true;
    this.displayTime = this.valorRitmo*1000;
    this.displayWords();
  }


  encerrar(){
    this.router.navigate(['/']); // Redireciona para a tela de home
  }


}




