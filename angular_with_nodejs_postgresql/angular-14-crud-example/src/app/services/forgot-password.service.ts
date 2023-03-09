import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/forgot-password';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  verification(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data);
  }

  sendEmail(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/send`, data);
  }
}
