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
  constructor(private voteService:VoteService){}
  ngOnInit(): void {
    this.voteService.getElectoralParties().subscribe((data: any) => {
      this.electoralParties = data;
    });
    this.voteService.getWinningParty().subscribe((data:any)=>{
      this.electroParty=data;
    });
    this.getVotingState();
    this.getVotingEnded();
  }


  getVotingEnded():boolean{
    return this.voteService.getVotingEnded();

  }
  getVotingState(): boolean {
    return this.voteService.getVotingState();

}
}
