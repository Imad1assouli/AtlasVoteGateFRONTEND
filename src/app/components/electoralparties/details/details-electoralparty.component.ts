import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Utilisateur } from '../../../model/Utilisateur.model';
import { VoteService } from '../../../services/vote.service';
import { ElectoralPartyService } from '../../../services/electoralparties/electoralparty.service';
import { ElectoralParty } from '../../../model/ElectoralParty.model';
import { ConfirmationDialogComponent } from '../../appointments/dialog/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-electoral-party',
  templateUrl: './details-electoralparty.component.html',
  styleUrls: ['./details-electoralparty.component.css']
})
export class DetailsElectoralPartyComponent implements OnInit {
  party: ElectoralParty = {} as ElectoralParty;
  id!: number;
  user: Utilisateur = {} as Utilisateur;
  userHasVoted$!: Observable<boolean>;
  votingStarted: boolean = false; // Define votingStarted property

  constructor(
    private electoralPartyService: ElectoralPartyService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadPartyDetails();
    });
    this.user = this.authService.getUser();
    this.userHasVoted$ = this.voteService.hasVoted(this.user.id);
    this.votingStarted = this.voteService.getVotingState(); // Initialize votingStarted
  }

  loadPartyDetails(): void {
    this.electoralPartyService.getElectoralParty(this.id).subscribe(
      (data: ElectoralParty) => {
        this.party = data;
      },
      (error: any) => {
        console.error('Error fetching party details:', error);
      }
    );
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserVoteur() {
    return this.authService.isUserVoteur();
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this party?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.electoralPartyService.deleteElectoralParty(id).subscribe({
          next: () => {
            this.router.navigate(['/electoralparties']);
          },
          error: (err) => {
            console.error('Error deleting party:', err);
          }
        });
      }
    });
  }

  vote(userId: number, partyId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want vote for this party?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.voteService.createVote(userId, partyId).subscribe({
          next: () => {
            this.router.navigate(['/electoralparties']);
          },
          error: (err) => {
            console.error('Error voting for party:', err);
          }
        });
      }
    });
  }
}
