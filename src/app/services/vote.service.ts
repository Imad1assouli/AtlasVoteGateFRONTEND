import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  resumerVote() {
    this.http.post (`${this.backendHost}/votes/resumeVotingProcess`, {});
  }
  lancerVote() {
    this.http.post (`${this.backendHost}/votes/startVotingProcess`, {});
  }
  mettrePause() {
    this.http.post (`${this.backendHost}/votes/pauseVotingProcess`, {});
  }
  terminerVote() {
    this.http.post (`${this.backendHost}/votes/endVotingProcess`, {});
  }
  private backendHost = "http://localhost:8080/api/voter";

  constructor(private http: HttpClient) {}
  
  hasVoted(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/voter/votes/${userId}`);
  }
  
  

  createVote(userId: number, partyId: number) {
    return this.http.post<any>(`${this.backendHost}/votes/${userId}/${partyId}`, {});
  }

  
}
