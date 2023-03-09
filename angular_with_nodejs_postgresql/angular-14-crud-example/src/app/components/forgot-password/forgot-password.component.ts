import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  @Input() viewMode = false;

  user: User = {
    password: '',
    password_verification: ''
  };
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router, 
    private forgotPasswordService: ForgotPasswordService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      const data = {
        token: this.route.snapshot.params["token"]
      };   
      // TODO verifi token autrement redirection
      /*
      this.forgotPasswordService.verification(data)
        .subscribe({
          next: (res) => {
          },
          error: (e) => {
            console.error(e)
            this.router.navigate(['/sign-in'])
          }
        });
*/
    } else {
      // TODO message d'erreur pw different de pw-verification
    }
  }

  updatePassword(): void {
    var token = this.route.snapshot.params["token"];

    if (this.user.password === this.user.password_verification) {
      const data = {
        token: token,
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
}