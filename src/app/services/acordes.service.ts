import { Injectable } from '@angular/core';
// import { Acorde } from '../entidades/Acorde';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acorde } from '../entidades/types/Acorde.type';
import { env } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class AcordesService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Acorde[]> {
    return this.http.get<Acorde[]>(`${env.apiUrl}/acordes`)
  }

  getByIdAcorde(id: number): Observable<Acorde>{
    return this.http.get<Acorde>(`${env.apiUrl}/acordes/${id}`)
  }

  postAcorde(acorde: Acorde): Observable<Acorde>{
    return this.http.post<Acorde>(`${env.apiUrl}/acordes`, acorde)
  }

  deleteAcorde(id: number) {
    return this.http.delete<string>(`${env.apiUrl}/acordes/${id}`)
  }

}
