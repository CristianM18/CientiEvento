import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUri = '/api/user';

  constructor(private http: HttpClient) { }

  login(form:LoginI): Observable<any> {
    let direccion = this.apiUri;
    return this.http.post(direccion, form);
  }
}
