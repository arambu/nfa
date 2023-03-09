import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/verification-user';

@Injectable({
  providedIn: 'root'
})
export class SendEmailUserVerificationService {

  constructor(private http: HttpClient) { }

  verification(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
