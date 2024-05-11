import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ElectoralParty} from "../../../model/ElectoralParty.model";
import {ElectoralPartyService} from "../../../services/electoralparties/electoralparty.service";
import { ConfirmationDialogComponent } from '../../appointments/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details-electoral-party',
  templateUrl: './details-electoralparty.component.html',
  styleUrls: ['./details-electoralparty.component.css']
})
export class DetailsElectoralPartyComponent implements OnInit {
  party:ElectoralParty={} as ElectoralParty
  id!:number

  constructor(
    private electoralPartyService: ElectoralPartyService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadAppointmentDetails();
    });
  }

  loadAppointmentDetails(): void {
    this.electoralPartyService.getElectoralParty(this.id).subscribe(
      (data: ElectoralParty) => {
        this.party = data;
      },
      (error: any) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }
 
  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.electoralPartyService.deleteElectoralParty(id).subscribe({
          next: () => {
            this.router.navigate(['/electoralparties']);
          },
          error: (err) => {
            console.error('Error deleting electoral party:', err);
          }
        });
      }
    });
  }
}
