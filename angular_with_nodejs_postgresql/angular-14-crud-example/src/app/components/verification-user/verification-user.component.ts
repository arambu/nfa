import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SendEmailUserVerificationService } from 'src/app/services/send-email-user-verification.service';

@Component({
  selector: 'app-verification-user',
  templateUrl: './verification-user.component.html',
  styleUrls: ['./verification-user.component.css']
})

export class VerificationUserComponent implements OnInit {
  @Input() viewMode = false;

  constructor(private route: ActivatedRoute, private router: Router, private sendEmailUserVerificationService: SendEmailUserVerificationService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      const data = {
        token: this.route.snapshot.params["token"]
      };

      this.sendEmailUserVerificationService.verification(data)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/sign-in'])
          },
          error: (e) => console.error(e)
        });
    } else {
      // TODO message d'erreur pw different de pw-verification
    }
  }
}
