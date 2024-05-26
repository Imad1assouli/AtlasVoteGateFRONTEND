import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  isUserAdmin(): boolean {
    return this.authService.isUserAdmin();
  }

  isUserOfficial(): boolean {
    return this.authService.isUserOfficial();
  }
}
