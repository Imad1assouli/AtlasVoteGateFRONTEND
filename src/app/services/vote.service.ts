import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Vote } from '../model/Vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private baseUrl = 'http://localhost:8080/api/admin/votes';
  private backendHost = "http://localhost:8080/api/voter";
  private votingStarted = false;

  constructor(private http: HttpClient) {}
  private votingStartedKey = 'votingStarted';

  setVotingState(started: boolean) {
    localStorage.setItem(this.votingStartedKey, started ? 'true' : 'false');
  }

  getVotingState(): boolean {
    const started = localStorage.getItem(this.votingStartedKey);
    return started === 'true';
  }

  clearVotingStartTime(): void {
    localStorage.removeItem('votingStarted');
    localStorage.removeItem('votingStartTime');
    this.votingStarted = false;
  }

  

  
  pauseVotingProcess(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pauseVotingProcess`, {}).pipe(
      tap(() => {
        this.setVotingState(false);
      })
    );
  }

  resumeVotingProcess(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/resumeVotingProcess`, {}).pipe(
      tap(() => {
        this.setVotingState(true);
      })
    );
  }

  hasVoted(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/voter/votes/${userId}`);
  }

  createVote(userId: number, partyId: number) {
    return this.http.post<any>(`${this.backendHost}/votes/${userId}/${partyId}`, {});
  }

  getVoteById(id: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/${id}`);
  }

  updateVote(id: number, updatedVote: Vote): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, updatedVote);
  }

  deleteVote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}`);
  }

  getVoteByUserId(userId: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/user/${userId}`);
  }

  countVotesForElectoralParty(partyId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${partyId}`);
  }

  countVotesForAllParties(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/count/all`);
  }

  getWinningParty(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/winningParty`);
  }

  updateVotingStartTime(newStartTime: Date): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/updateVotingStartTime`, newStartTime);
  }

  startVotingProcess(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/startVotingProcess`, {});
  }

  getElectoralParties(): Observable<any> {
    return this.http.get('http://localhost:8080/api/admin/electoralPart');
  }
}
