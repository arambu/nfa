import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  auth: Auth = {
    password: '',
    email: ''
  };

  submitted = false;
  constructor(private authService: AuthService, private appComponent: AppComponent, private router: Router) { }
  
  ngOnInit(): void {
  }

  authUser(): void {
    const data = {
      password: this.auth.password,
      email: this.auth.email
    };
    this.authService.auth(data)
      .subscribe({
        next: (res) => { 
          localStorage.setItem('tokenUserSession', res.message);
          this.submitted = true;
          this.appComponent.changeNavbar();
          this.router.navigate(['/admin']);
        },
        error: (e) => console.error(e)
      });
  }
}
