import { Component, OnInit } from '@angular/core';
import { AcordesService } from '../../../services/acordes.service';
import { Acorde } from '../../../entidades/types/Acorde.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-acordes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-acordes.component.html',
  styleUrl: './cadastro-acordes.component.scss'
})
export class CadastroAcordesComponent implements OnInit {

  nomeAcorde: string = "";
  letraAcorde: string = "";
  listaDeAcordes: Acorde[] = [];
  isNomeAcordeInvalid: boolean = false;
  isLetraAcordeInvalid: boolean = false;

  constructor(
    private acordesService: AcordesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.acordesService.getAll().subscribe(
      (resp: Acorde[]) => {
        this.listaDeAcordes = resp;
      }, (erro) => {
        if (erro.status == 500) {
          alert('Problema na requisição');
        }
      }
    );
  }

  excluir(event: Event, id: number) {
    event.stopPropagation();
    this.acordesService.deleteAcorde(id).subscribe(() => {
      console.log('Excluído com sucesso!');
      this.listaDeAcordes = this.listaDeAcordes.filter(acorde => acorde.id !== id);
    }, error => {
      console.error('Erro ao excluir acorde', error);
    });
  }

  salvar(): void {
    console.log(this.nomeAcorde);

    this.isNomeAcordeInvalid = !this.nomeAcorde || this.nomeAcorde.trim() === "";
    if (this.isNomeAcordeInvalid) {
      console.log("Nome do acorde inválido.");
      return;
    }

    this.isLetraAcordeInvalid = !this.letraAcorde || this.letraAcorde.trim() === "";
    if (this.isLetraAcordeInvalid) {
      console.log(this.letraAcorde + ' letra acorde' + 1)

      return;
    }

    if (!this.letraAcorde || this.letraAcorde.trim() === "") {
      // Se nomeMusica for null, undefined ou uma string vazia (após remover espaços em branco)
      console.log('entrou 2')
      return;
    }


    const novoAcorde: Acorde = {
      id: 0, // Este ID pode ser ajustado conforme necessário
      letra: this.letraAcorde, // Adapte conforme necessário
      nome: this.nomeAcorde
    };

    console.log("Entrou - ", novoAcorde);
    this.acordesService.postAcorde(novoAcorde).subscribe(
      response => {
        console.log('Acorde salvo com sucesso', response);
        this.router.navigate(['/']); // Redireciona para a tela de home
      },
      error => {
        console.error('Erro ao salvar acorde', error);
      }
    );
  }


  letraAcordeInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.letraAcorde = inputElement.value;
  }

  nomeAcordeInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.nomeAcorde = inputElement.value;
  }

  encerrar() {
    this.router.navigate(['/']); // Redireciona para a tela de home
  }
}
