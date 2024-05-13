import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { ElectoralParty } from '../../model/ElectoralParty.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  electoralParties: any;
  electroParty:ElectoralParty={} as ElectoralParty;
  constructor(private voteService:VoteService){}
  ngOnInit(): void {
    this.voteService.getElectoralParties().subscribe((data: any) => {
      this.electoralParties = data;
    });
    this.voteService.getWinningParty().subscribe((data:any)=>{
      this.electroParty=data;
    });
  }
}
