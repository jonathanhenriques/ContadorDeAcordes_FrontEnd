import { Injectable } from '@angular/core';
import { Acorde } from '../entidades/Acorde';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcordesService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Acorde[]> {
    return this.http.get<Acorde[]>('http://localhost:8080/acordes')
  }

  getByIdAcorde(id: number): Observable<Acorde>{
    return this.http.get<Acorde>(`http://localhost:8080/acorde/${id}`)
  }

  postAcorde(acorde: Acorde): Observable<Acorde>{
    return this.http.post<Acorde>(`http://localhost:8080/acordes`, acorde)
  }

}
