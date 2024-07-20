import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Musica } from '../entidades/Musica';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Musica[]> {
    return this.http.get<Musica[]>('http://localhost:8080/musicas')
  }

  getByIdMusica(id: number): Observable<Musica>{
    return this.http.get<Musica>(`http://localhost:8080/musicas/${id}`)
  }

  postMusica(musica: Musica): Observable<Musica>{
    return this.http.post<Musica>(`http://localhost:8080/musicas`, musica)
  }

  deleteMusica(id: number) {
    return this.http.delete<string>(`http://localhost:8080/musicas/${id}`)
  }

 



}
