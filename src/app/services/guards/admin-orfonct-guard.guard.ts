import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class adminORfonctGuardGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserAdmin() || (this.authService.isUserOfficial())) {
      return true; // Autorise l'accès si l'utilisateur est administrateur
    } else {
      this.router.navigate(['']); // Redirige vers la page de connexion sinon
      return false;
    }
  }
}
