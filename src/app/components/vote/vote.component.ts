import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateurs/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VoteService } from '../../services/vote.service';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent implements OnInit {


  constructor(private fb: FormBuilder, public  voteService: VoteService, private route: ActivatedRoute, private router: Router ) { //route : pour obtient le id qui est dans la route{ }
  }
ngOnInit(): void {
  
}
terminerVote() {
this.voteService.terminerVote();
this.router.navigate([`/home/`]);
}
mettrePause() {
this.voteService.mettrePause();
this.router.navigate([`/home/`]);
}
lancerVote() {
this.voteService.lancerVote();
console.log("vote lance avec succes");
this.router.navigate([`/home/`]);

}
resumerVote(){
  this.voteService.resumerVote();
  this.router.navigate([`/home/`]);
}
}


