import { Component, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  electoralParties: any;
  constructor(private voteService:VoteService){}
  ngOnInit(): void {
    this.voteService.getElectoralParties().subscribe((data: any) => {
      this.electoralParties = data;
    });
  }
}
