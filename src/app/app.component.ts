import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AtlasVoteGateFRONTEND';

  constructor(private authService: AuthenticationService) {
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserOfficial() {
    return this.authService.isUserOfficial();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
