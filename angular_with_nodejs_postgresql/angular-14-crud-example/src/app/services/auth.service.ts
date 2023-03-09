import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  auth(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  verification(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
