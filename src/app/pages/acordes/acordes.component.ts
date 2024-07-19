import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-acordes',
  standalone: true,
  imports: [],
  templateUrl: './acordes.component.html',
  styleUrl: './acordes.component.scss'
})
export class AcordesComponent implements OnInit{

  idMusica: Number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idMusica = this.route.snapshot.params['idmusica'];
  }



}
