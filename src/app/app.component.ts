import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AtlasVoteGateFRONTEND';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    // Check initial login state
    this.authService.isLoggedIn().subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['']); // Redirect to login page if not logged in
      }
    });
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
