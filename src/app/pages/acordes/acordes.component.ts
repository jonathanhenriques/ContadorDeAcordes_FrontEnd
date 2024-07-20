import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, delay, expand, of, take } from 'rxjs';
import { MusicasService } from '../../services/musicas.service';
import { Musica } from '../../entidades/Musica';
import { Acorde } from '../../entidades/Acorde';

@Component({
  selector: 'app-acordes',
  standalone: true,
  imports: [],
  templateUrl: './acordes.component.html',
  styleUrl: './acordes.component.scss'
})
export class AcordesComponent implements OnInit{

  idMusica: number = 0;
  musica: Musica;
  listaDeAcordes: Acorde[];

  words: string[] = ['palavra1', 'palavra2', 'palavra3', 'palavra4'];
  acordeAtual: string = 'C';
  nomeAcordeAtual: string = '';
  displayTime: number = 20; // Tempo em milissegundos (2 segundos)



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



  displayWords() {
    of(...this.listaDeAcordes).pipe(
      concatMap(word =>
        of(word).pipe(
          expand((current, index) => index < word.repeticoes - 1 ? of(current).pipe(delay(this.displayTime)) : of(null)),
          take(word.repeticoes)
        )
      )
    ).subscribe(word => {
      if (word) {
        this.acordeAtual = word.letra;
        this.nomeAcordeAtual = word.nome;
      }
    });
  }
}




