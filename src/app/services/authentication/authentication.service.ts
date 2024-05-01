import {Injectable} from '@angular/core';
import { Utilisateur } from "../../model/Utilisateur.model";

// @ts-ignore
import * as uuid from "uuid";
import {Observable, of, throwError} from "rxjs";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Role} from "../../enum/Role.enum";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/login';
  constructor(private http: HttpClient) { }
  users: Utilisateur[] = [];
  authenticatedUser: Utilisateur | undefined;

  public login(login: string, password: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, { login, password });
  }

  public authenticateUser(appUser: Utilisateur): Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({
      login: appUser.login,
      password: appUser.password,
      jwt: "JWT_TOKEN"
    }))
    return of(true);
  }

  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }

  public logout(): Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }

  isLoggedIn() {
    return false;
  }

  isUserAdmin() {
    return this.authenticatedUser?.role === Role.ADMIN;
  }

  isUserOfficial() {
    return this.authenticatedUser?.role === Role.OFFICIAL;
  }

  isUserVoteur() {
    return this.authenticatedUser?.role === Role.VOTEUR;
  }

  isUserDemandeur() {
    return this.authenticatedUser?.role === Role.DEMANDEUR;
  }

  register(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {
  let appUser: Utilisateur = {
    nom: value.nom,
    prenom: value.prenom,
    id: uuid.v4(),
    login: value.login,
    password: value.password,
    role: Role.DEMANDEUR,
    // other properties...
  };
  this.users.push(appUser);
  return of(appUser);
}
}


// your reply got the crowd yelling woo so b4 u die lets see who can out-petty who
