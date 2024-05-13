import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  votingStarted: boolean = false;
  votingStartTime: Date | undefined;
  votingEndTime: Date | undefined;
  remainingTime: number = 0;
  private countdownInterval: any;

  constructor(private voteService: VoteService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.checkVotingStatus();

    if (this.votingStarted) {
      this.startCountdown();
    }
  }



 
  endVote(){
      this.voteService.endVote().subscribe(() => {
        this.votingStarted=false;
        localStorage.setItem('votingStarted', 'false');
        clearInterval(this.countdownInterval);
       
      });

  }

  allowVoting(): boolean {
    return this.authService.isLoggedIn() && this.votingStarted;
  }

  startVotingProcess(): void {
    this.voteService.startVotingProcess().subscribe(() => {
      this.votingStarted = true;
      this.votingStartTime = new Date();
      this.votingEndTime = new Date(this.votingStartTime.getTime() + 24 * 60 * 60 * 1000);
      localStorage.setItem('votingStarted', 'true');
      localStorage.setItem('votingStartTime', this.votingStartTime.toString());
      this.startCountdown();
    });
  }


  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = this.votingEndTime?.getTime() || 0;
      this.remainingTime = endTime - now;
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  checkVotingStatus(): void {
    this.votingStarted = this.voteService.getVotingState();
    if (this.votingStarted) {
      const startTime = localStorage.getItem('votingStartTime');
      if (startTime) {
        this.votingStartTime = new Date(startTime);
        this.votingEndTime = new Date(this.votingStartTime.getTime() + 24 * 60 * 60 * 1000);
      }
    }
  }
}
