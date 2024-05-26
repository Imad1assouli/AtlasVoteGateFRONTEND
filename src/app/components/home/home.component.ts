import {Component, OnInit} from '@angular/core';
import {ElectoralParty} from "../../model/ElectoralParty.model";
import {VoteService} from "../../services/vote.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  electoralParties: any;
  electroParty:ElectoralParty={} as ElectoralParty;
  votingStarted: boolean = false;
  votingStartTime: Date | undefined;
  votingEndTime: Date | undefined;
  remainingTime: number = 0;
  private autoRefreshInterval: any;
  private readonly refreshIntervalMs = 5000; // Refresh interval in milliseconds
  constructor(private voteService:VoteService){}
  ngOnInit(): void {
    this.voteService.getElectoralParties().subscribe((data: any) => {
      this.electoralParties = data;
    });
    this.voteService.getWinningParty().subscribe((data:any)=>{
      this.electroParty=data;
    });
    this.getVotingEnded();
    this.startAutoRefresh();
  }



  getVotingEnded():boolean{
    return this.voteService.getVotingEnded();
  }
  getVotingState(): boolean {
    return this.voteService.getVotingState();


}


ngOnDestroy(): void {
  // Stop auto-refresh when the component is destroyed
  this.stopAutoRefresh();
}

private startAutoRefresh(): void {
  // Execute auto-refresh function at regular intervals
  this.autoRefreshInterval = setInterval(() => {
    this.refreshVotingStatus();
  }, this.refreshIntervalMs);
}

private stopAutoRefresh(): void {
  // Stop the auto-refresh interval
  clearInterval(this.autoRefreshInterval);
}

private refreshVotingStatus(): void {
  // Check voting status and update UI
  const votingEnded = this.voteService.getVotingEnded();
  if (votingEnded) {
    // Voting has ended, update UI accordingly
    this.getVotingState();
    // Stop auto-refresh as voting has ended
    this.stopAutoRefresh();
  }
  // Update other UI elements based on voting status as needed
}



}
