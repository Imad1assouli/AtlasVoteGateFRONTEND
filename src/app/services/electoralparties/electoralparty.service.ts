import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ElectoralParty } from "../../model/ElectoralParty.model";

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
    return this.http.post(this.backendHost + "/electoralparties/", electoralparty);
  }

  getElectoralPartyById(id: any) {
    return this.http.get(this.backendHost + "/electoralparties/" + id);
  }

  deleteElectoralParty(id: number) {
    return this.http.delete(this.backendHost + "/electoralparties/" + id);
  }

  viewElectoralPartyDetails(id: any) {
    return this.http.get(this.backendHost + "/electoralparties/details" + id);
  }

  editElectoralParty(electoralparty: ElectoralParty) {
    return this.http.put(this.backendHost + `/electoralparties/${electoralparty.id}`, electoralparty);
  }

}
