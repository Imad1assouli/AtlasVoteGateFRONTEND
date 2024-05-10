import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ElectoralParty } from "../../model/ElectoralParty.model";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class ElectoralPartyService {
  private backendHost = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) {
  }

  getElectoralParty(id: number) {
    return this.http.get<ElectoralParty>(this.backendHost + "/electoralparties/" + id)
  }

  getAllElectoralParties() {
    return this.http.get<ElectoralParty[]>(this.backendHost + "/electoralparties");
  }

  updateElectoralParty(electoralParty: ElectoralParty) {
    return this.http.put(this.backendHost + "/electoralparties/edit/" + electoralParty.id, electoralParty);

  }

  addElectoralParty(electoralparty: ElectoralParty) {
    return this.http.post(this.backendHost + "/electoralParties/", electoralparty);
  }

  getElectoralPartyById(id: any) {
    return this.http.get(this.backendHost + "/electoralParties/" + id);
  }

  deleteElectoralParty(id: number) {
    return this.http.delete(this.backendHost + "/electoralParties/" + id);
  }

  viewElectoralPartyDetails(id: any) {
    return this.http.get(this.backendHost + "/electoralParties/details" + id);
  }
}
