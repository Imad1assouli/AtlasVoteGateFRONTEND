import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Utilisateur} from "../../model/Utilisateur.model";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  private backendHost = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  // Add your service methods here
  getUtilisateur(id: number) {
    return this.http.get<Utilisateur>(this.backendHost + "/utilisateurs/" + id);
  }

  deleteUtilisateur(id: number) {
    return this.http.delete(this.backendHost + "/utilisateurs/delete/" + id);
  }

  public addUtilisateur(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.backendHost}/utilisateurs/add`, user);
  }
}
