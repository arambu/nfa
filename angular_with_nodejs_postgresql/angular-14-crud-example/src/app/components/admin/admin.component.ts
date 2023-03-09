import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = {
    password: '',
    password_verification: ''
  };
  submitted = false;

  constructor(private userService: UserService, private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  updateUser(): void {
    if (this.user.password === this.user.password_verification) {
      const data = {
        token: localStorage.getItem('tokenUserSession'),
        password: this.user.password
      };

      this.userService.updatePassword(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    } else {
      // TODO message d'erreur pw different de pw-verification
    }
  }

  deleteUser(): void {
    this.userService.delete(localStorage.getItem('tokenUserSession'))
    .subscribe({
      next: (res) => {
        this.appComponent.clearAuthData();
        // TODO
      },
      error: (e) => console.error(e)
    });
  }
}