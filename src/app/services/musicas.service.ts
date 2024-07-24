import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Musica } from '../entidades/Musica';
import { Observable } from 'rxjs';
import { env } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class MusicasService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Musica[]> {
    return this.http.get<Musica[]>(`${env.apiUrl}/musicas`)
  }

  getByIdMusica(id: number): Observable<Musica>{
    return this.http.get<Musica>(`${env.apiUrl}/musicas/${id}`)
  }

  postMusica(musica: Musica): Observable<Musica>{
    return this.http.post<Musica>(`${env.apiUrl}/musicas`, musica)
  }

  deleteMusica(id: number) {
    return this.http.delete<string>(`${env.apiUrl}/musicas/${id}`)
  }





}
