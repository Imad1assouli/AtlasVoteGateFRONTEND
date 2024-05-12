import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

 




  terminerVote() {
    this.votestarted=false;
   
    }
    mettrePause() {
      this.votestarted=false;
  
    }
    lancerVote() {
      this.votestarted=true;
    console.log("vote lance avec succes");
   
    
    }
    resumerVote(){
      this.votestarted=true;
   
    }
  private backendHost = "http://localhost:8080/api/voter";

  constructor(private http: HttpClient) {}
  
  hasVoted(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/voter/votes/${userId}`);
  }
  
  

  createVote(userId: number, partyId: number) {
    return this.http.post<any>(`${this.backendHost}/votes/${userId}/${partyId}`, {});
  }

  votestarted: boolean = false;

 

  setVoteStatus(status: boolean) {
    this.votestarted = status;
  }

  getVoteStatus() {
    return this.votestarted;
  }
  
}
