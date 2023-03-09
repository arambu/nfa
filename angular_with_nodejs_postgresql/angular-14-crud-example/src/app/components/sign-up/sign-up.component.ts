import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = {
    name: '',
    last_name: '',
    password: '',
    email: '',
    role: '',
    permission: ''
  };
  submitted = false;
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
  }

  saveUser(): void {
    if (this.user.password === this.user.password_verification) {
      const data = {
        name: this.user.name,
        last_name: this.user.last_name,
        password: this.user.password,
        email: this.user.email,
        role: this.user.role,
        permission: this.user.permission
      };

      this.userService.create(data)
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


  /*
  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      last_name: '',
      password: '',
      email:'',
      role: '',
      permission: '',
    };
  }
  */
}

//import { Tutorial } from 'src/app/models/tutorial.model';
//import { TutorialService } from 'src/app/services/tutorial.service';
  /*
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
*/

//constructor(private tutorialService: TutorialService) { }

/*
  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
*/
/*
  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }
  */