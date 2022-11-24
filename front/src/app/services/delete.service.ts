import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  apiUri = '/api/evento';

  httpOptions = new HttpHeaders().set('Content.Type', 'application/json');
  constructor(private http: HttpClient) { }

  deleteEvento(id: any) {
    return this.http.delete<any>(
      this.apiUri + "/" + id,
      { headers: this.httpOptions });
  }

  getAllEventosData(): Observable<any> {
    console.log("funciona")
    return this.http.get<any>(this.apiUri)
  }
}