import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, delay, Subject, of, repeat, take } from 'rxjs';
import { MusicasService } from '../../services/musicas.service';
import { Musica } from '../../entidades/Musica';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Acorde } from '../../entidades/types/Acorde.type';
import {repeatWhen, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-acordes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acordes.component.html',
  styleUrl: './acordes.component.scss'
})
export class AcordesComponent implements OnInit{

  stopSignal = new Subject<void>();
  repeatSignal = new Subject<void>();

  idMusica: number = 0;
  musica: Musica;
  listaDeAcordes: Acorde[];

  showContent: boolean = false; // Controla a exibição do conteúdo
  // words: string[] = ['palavra1', 'palavra2', 'palavra3', 'palavra4'];
  acordeAtual: string = '';
  nomeAcordeAtual: string = '';
  displayTime: number = 0; // Tempo em milissegundos (2 segundos)
  valorRitmo: string = ''; // Variável para armazenar o valor do input
  isvelocidadeMusicaInvalid: boolean = false;
  bpmInput: number;
  interromper: boolean = false;

  repetirSequencia: boolean = true;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private musicaService: MusicasService,
    private location: Location

  ) { }


  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.idMusica = this.route.snapshot.params['id'];
    this.getById(this.idMusica);

  }

  getById(id: number){
    this.musicaService.getByIdMusica(id).subscribe(
      (resp: Musica) => {
        this.musica = resp;
        this.listaDeAcordes = resp.acordes;
        // this.displayWords();
      }, (erro) =>{
        if(erro.status == 500){
          alert('Problema na requisição')
        }
      }
    )
  }

  validacaoDeInput(): boolean {

    this.isvelocidadeMusicaInvalid = !this.valorRitmo || this.valorRitmo.trim() === "";
    if (this.isvelocidadeMusicaInvalid) {
      return false;
    }
    console.log(this.isvelocidadeMusicaInvalid)

    if (!this.valorRitmo || this.valorRitmo.trim() === "") {
      // Se nomeMusica for null, undefined ou uma string vazia (após remover espaços em branco)
      return false;
    }

    return true;
    console.log(this.valorRitmo)
  }


  repetir() {

    if (!this.validacaoDeInput())
      return

    // this.showContent = true;
    this.startRepetir()

    // this.displayTime = Number(this.valorRitmo) * 1000;
    // console.log('repetir - valorRitmo -' + this.valorRitmo)
    // const bpm = parseFloat(this.valorRitmo);
    // console.log('1repetir - bpm -', bpm )
    // this.displayTime = (60 / bpm) * 1000 + (60 / bpm) * (1000 / 16); // Compensar atraso adicional
    // console.log('repetir - bpm -', bpm +'display - ' + this.displayTime)


    // const bpm = this.bpmInput;
    const bpm = 2230;
    console.log('bpm: '+bpm)
    let dynamicDisplayTime = Number(this.valorRitmo); // Variável para armazenar o displayTime dinâmico

    // Exemplo de uso
    this.displayTime = this.calculateDisplayTime(dynamicDisplayTime, bpm); // Adiciona 500 milissegundos ao displayTime
    console.log(`displayTime dinâmico: ${dynamicDisplayTime}`); // Exibe o displayTime dinâmico
    console.log('displayTime : ' + this.displayTime)


    this.displayWordsRepetir();

  }

  calculateDisplayTime(dynamicFactor: number, bpm: number) {
    // Fórmula original com adição de um fator dinâmico
    let dynamicDisplayTime = 0
    return  dynamicDisplayTime = (60 / bpm) * 1000 + (60 / bpm) * (1000 / 16) + (dynamicFactor * 1000);
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
        console.log('displayWords - ', this.displayTime)
      }
    });
  }
  displayWordsRepetir() {
    // this.acordeAtual = '2';
    if (this.showContent) {
      this.acordeAtual = this.listaDeAcordes[0].letra
      this.nomeAcordeAtual = this.listaDeAcordes[0].nome
      // this.acordeAtual = this.listaDeAcordes[0].letra
      // this.nomeAcordeAtual = this.listaDeAcordes[0].nome
      of(...this.listaDeAcordes).pipe(
        concatMap(word =>
          of(word).pipe(delay(this.displayTime))
        ),
        repeat(), // Repetir automaticamente
        takeUntil(this.stopSignal) // Parar quando stopSignal emitir
      ).subscribe({
        next: word => {
          if (word) {
            this.acordeAtual = word.letra;
            this.nomeAcordeAtual = word.nome;
            console.log('displayWordsRepeat - ', this.displayTime);
          }
        },
        complete: () => {
          console.log('Repetição interrompida');
        }
      });
    }
  }

  startRepetir() {
    this.showContent = true;
    // this.displayWordsRepetir(); // Iniciar a repetição
  }
  stopRepetir() {
    this.showContent = false;
    this.stopSignal.next(); // Emite o sinal de parada
    this.stopSignal.complete(); // Completa o Subject para evitar vazamentos de memória
    this.stopSignal = new Subject<void>(); // Reinicia o Subject para futuras execuções
  }

  comecar() {

    if (!this.validacaoDeInput())
      return


    this.showContent = true;
    this.displayTime = parseFloat(this.valorRitmo) * 1000;
    console.log('comecar - ', this.displayTime)
    this.displayWords();
  }


  encerrar(){

    this.router.navigate(['/']); // Redireciona para a tela de home
  }

  voltar(){
    console.log("voltou")
    this.interromper = true;

    // this.showContent = false
    this.stopRepetir()
  }


}




