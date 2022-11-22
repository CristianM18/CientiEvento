import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  apiUri = '/api/evento';

  httpOptions = new HttpHeaders().set('Content.Type', 'application/json');
  constructor(private http: HttpClient) {
  }

  updateEvento(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/' + id,
      data,
      { headers: this.httpOptions });
  }

}
