import {Component, OnInit} from '@angular/core';
import { ElectoralParty } from "../../model/ElectoralParty.model";
import { ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup} from "@angular/forms";
import { ElectoralPartyService } from "../../services/electoralparties/electoralparty.service";
import {Role} from "../../enum/Role.enum";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { VoteService } from '../../services/vote.service';
import { Utilisateur } from '../../model/Utilisateur.model';
import { Observable, async } from 'rxjs';

@Component({
  selector: 'app-electoralparties',
  templateUrl: './electoralparty.component.html',
})
export class ElectoralPartyComponent implements OnInit  {
  electoralparty!: ElectoralParty;
  id: number=0;
  parties: ElectoralParty[]=[];
  user:Utilisateur={} as Utilisateur;
  userHasVoted$!: Observable<boolean>;
  votingStarted: boolean = false;

  constructor(private fb: FormBuilder, public electoralpartyService: ElectoralPartyService,private voteService :VoteService,
              private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllElectoralParties();
    this.user = this.authService.getUser();
    this.userHasVoted$ = this.voteService.hasVoted(this.user.id);
    this.votingStarted = this.voteService.getVotingState(); // Initialize votingStarted
  }

  addElectoralParty() {
    this.router.navigate(['/electoralparties/add']);
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserVoteur(){
    return this.authService.isUserVoteur();
  }

  isUserOfficial() {
    return this.authService.isUserOfficial();
  }
  getAllElectoralParties() {
    this.electoralpartyService.getAllElectoralParties().subscribe(
      (data: ElectoralParty[]) => {
        this.parties = data;
      },
      (error: any) => {
        console.error('Error retrieving electoral parties:', error);
      }
    );
  }
  viewElectoralPartyDetails(id: number) {
    console.log("View party details for id:", id);
    this.router.navigate(['/electoralparties/details', id]);
  }

  editElectoralParty(id: number) {
    console.log("Edit party for id:", id);
    this.router.navigate(['/electoralparties/edit', id]);
  }



}
