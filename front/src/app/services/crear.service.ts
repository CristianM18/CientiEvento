import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrearService {

  apiUri = '/api/evento';

  httpOptions = new HttpHeaders().set('Content.Type', 'application/json');
  constructor(private http: HttpClient) {

  }
  getAllEventosData(): Observable<any> {
    console.log("funciona")
    return this.http.get<any>(this.apiUri)
  }

  newEvento(data: any): Observable<any> {
    console.log("llamado al metodo")
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.httpOptions });
  }
}
