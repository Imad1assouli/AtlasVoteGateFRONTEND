import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Role } from '../../enum/Role.enum';
import { Appointment } from '../../model/Appointment.model';
import { VoteService } from '../vote.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/auth/signin';
  private baseUrl2 = 'http://localhost:8080/auth/signup';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private voteService: VoteService) {
    const token = localStorage.getItem('jwttoken');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { username, password }).pipe(
      tap(res => {
        if (res && res.jwttoken) {
          localStorage.setItem('jwttoken', res.jwttoken);
          this.loggedIn.next(true);
          const votingStarted = this.voteService.getVotingState();
          localStorage.setItem('votingStarted', votingStarted ? 'true' : 'false');
          if (votingStarted) {
            this.voteService.setVotingState(true);
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('utilisateur');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('jwttoken');
  }

  setUser(user: any): void {
    localStorage.setItem('utilisateur', JSON.stringify(user));
  }

  getUser(): any {
    const userStr = localStorage.getItem('utilisateur');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  isUserAdmin(): boolean {
    return this.getUserRole() === Role.ROLE_ADMINISTRATEUR;
  }

  isUserOfficial(): boolean {
    return this.getUserRole() === Role.ROLE_FONCTIONNAIRE;
  }

  isUserVoteur(): boolean {
    return this.getUserRole() === Role.ROLE_VOTER;
  }

  isUserDemandeur(): boolean {
    return this.getUserRole() === Role.ROLE_DEMANDEUR;
  }

  register(appointment: Appointment): Observable<Object> {
    return this.http.post(this.baseUrl2, appointment);
  }
}