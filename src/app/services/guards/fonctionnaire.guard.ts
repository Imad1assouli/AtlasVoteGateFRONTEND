import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class FonctionnaireGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isUserOfficial()) {
      return true; // Autorise l'accès si l'utilisateur est administrateur
    } else {
      this.router.navigate(['/home']); // Redirige vers la page de connexion sinon
      return false;
    }
  }
}
