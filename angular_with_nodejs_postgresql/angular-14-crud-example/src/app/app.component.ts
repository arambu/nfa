import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Token {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() navbar = true;

  constructor(private router: Router,
    private http: HttpClient) { 
      this.router.navigate(['/sign-in']);
    }

  ngOnInit(): void {
    var token = localStorage.getItem('tokenUserSession')

    if (token) {
      new Promise((resolve: Function, reject: Function) => {
        this.http.post<Token>('http://localhost:8080/api/auth/verification', { token: token }).subscribe({
          next: (res) => { 
            if (res.message === "Token verify") {
                this.navbar = false;
                resolve(true);
            } else {
                this.navbar = true;
                localStorage.removeItem("tokenUserSession");
                this.router.navigate(['/sign-in']);
                reject(false);
            }
          },
          error: (e) => {
            console.error(e);
          }
        });
      });
    }
  }

  public clearAuthData() {
    localStorage.removeItem("tokenUserSession"); 
    this.router.navigate(['/sign-in']); 
    this.navbar = true;
  }

  public changeNavbar() {
    this.navbar = false;
  }
}
