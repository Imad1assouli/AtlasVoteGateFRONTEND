import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication/authentication.service";

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  handleLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      this.snackBar.open('Username and password are required!', 'Close', { duration: 3000 });
      return;
    }

    this.authenticationService.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        this.authenticationService.setUser(response.utilisateur); // Assuming 'utilisateur' contains user details
        // Redirect based on user role or a default route
        this.router.navigateByUrl("/home");
      },
      error => {
        this.snackBar.open('Invalid username or password!', 'Close', { duration: 3000 });
      }
    );
  }
}
