import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Utilisateur} from "../../model/Utilisateur.model";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Observable} from "rxjs";
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  private backendHost = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) {}

  // Add your service methods here
  getUtilisateur(id: number) {
    return this.http.get<Utilisateur>(this.backendHost + "/utilisateurs/" + id);
  }

  deleteUtilisateur(id: number) {
    return this.http.delete(this.backendHost + `/utilisateurs/` + id);
  }

  public addUtilisateur(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.backendHost}/users`, user);
  }

  public getAllUtilisateurs () :Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${this.backendHost}/allusers`);
  }
}
