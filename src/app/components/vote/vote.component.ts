import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  votingStarted: boolean = false;
  votingStartTime: Date | undefined;
  votingEndTime: Date | undefined;
  votingPaused: boolean = false;

  constructor(private voteService: VoteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Check if voting process is started when the component initializes
    this.votingStarted = this.voteService.getVotingState();
    this.checkVotingStatus();
  }

  // Method to start the voting process
  startVotingProcess(): void {
    this.voteService.startVotingProcess().subscribe(() => {
      this.voteService.setVotingState(true); // Set the voting state to true
      this.votingStartTime = new Date(); // Set the voting start time
      this.votingStarted = true;
      this.votingEndTime = new Date(this.votingStartTime.getTime() + 24 * 60 * 60 * 1000); // Set end time (one day after start)
      localStorage.setItem('votingStarted', 'true');
      localStorage.setItem('votingStartTime', this.votingStartTime.toString()); // Store start time in local storage
    });
  }

  // Method to pause the voting process
  pauseVotingProcess(): void {
    this.voteService.pauseVotingProcess().subscribe(() => {
      this.voteService.setVotingState(false); // Set the voting state to false
      this.votingPaused=true;
    });
  }

  // Method to resume the voting process
  resumeVotingProcess(): void {
    this.voteService.resumeVotingProcess().subscribe(() => {
      this.voteService.setVotingState(true); // Set the voting state to true
      this.votingPaused=false;
    });
  }

  // Method to check the current voting status
  checkVotingStatus(): void {
    const votingStarted = localStorage.getItem('votingStarted');
    if (votingStarted && votingStarted === 'true') {
      this.voteService.setVotingState(true);
      const startTime = localStorage.getItem('votingStartTime');
      if (startTime) {
        this.votingStartTime = new Date(startTime);
        this.votingEndTime = new Date(this.votingStartTime.getTime() + 24 * 60 * 60 * 1000); // Set end time (one day after start)
      }
    }
  }

  // Method to clear the voting start time from local storage
  clearVotingStartTime(): void {
    localStorage.removeItem('votingStarted');
    localStorage.removeItem('votingStartTime');
    this.votingStartTime = undefined;
    this.votingEndTime = undefined;
    this.votingStarted = false;
  }

  // Method to update the voting start time
  updateVotingStartTime(newStartTime: Date): void {
    this.voteService.updateVotingStartTime(newStartTime).subscribe(() => {
      this.votingStartTime = newStartTime;
    });
  }

  // Method to open dialog for updating voting start time
  openDialog(): void {
    // Implement this method to open a dialog for updating voting start time
  }

  // Method to allow voting for authenticated users
  allowVoting(): boolean {
    // Implement this method based on your authentication logic
    return true;
  }
}
