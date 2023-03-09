import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password-send-email',
  templateUrl: './forgot-password-send-email.component.html',
  styleUrls: ['./forgot-password-send-email.component.css']
})

export class ForgotPasswordSendEmailComponent implements OnInit {

  forgotPassword: User = {
    password: '',
    email: ''
  };
  submitted = false;

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
  }

  forgotPasswordUser(): Promise<boolean>  {
    const data = {
      email: this.forgotPassword.email
    };

    return new Promise((resolve: Function, reject: Function) => {
      this.forgotPasswordService.sendEmail(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          resolve(true);
        },
        error: (e) => console.error(e)
      });
    });
  }
}
