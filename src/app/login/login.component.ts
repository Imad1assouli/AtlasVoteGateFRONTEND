import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  errorMessage!: string;

  email!: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {}

  handleLogin() {
    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Please enter your username and password';
      return;
    }

    this.authenticationService.login(this.username, this.password).subscribe({
      next: (appUser:any) => {
        this.authenticationService.authenticateUser(appUser).subscribe({
          next: () => {
            this.router.navigateByUrl("/navbar/home");
          }
        });
      },
      error: (err:any) => {
        this.errorMessage = err;
      }
    });
  }

  OnUserLogin(){
    if (this.email == ''){
      alert('please enter your email');
      return;
    }

    if (this.password == ''){
      alert('please enter your password');
      return;
    }

    this.authenticationService.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }
}
