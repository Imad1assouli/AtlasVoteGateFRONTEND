import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ElectoralParty} from "../../../model/ElectoralParty.model";
import {ElectoralPartyService} from "../../../services/electoralparties/electoralparty.service";

@Component({
  selector: 'app-details-electoral-party',
  templateUrl: './details-electoralparty.component.html',
  styleUrls: ['./details-electoralparty.component.css']
})
export class DetailsElectoralPartyComponent implements OnInit {
  party: { name: string; description: string; id: number | null } = { name: '', description: '', id: null }; // initialize with default values

  constructor(
    private electoralPartyService: ElectoralPartyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.electoralPartyService.getElectoralPartyById(id).subscribe({
      next: (party) => {
        this.party = party as { name: string, description: string, id: number | null };
      },
      error: (err) => {
        console.error('Error fetching electoral party:', err);
        this.router.navigate(['/electoralparties']);
      }
    });
  }

  onDelete(id: number | null): void {
    if (id === null) {
      console.error('Party ID is null');
      return;
    }
    this.electoralPartyService.deleteElectoralParty(id).subscribe({
      next: () => {
        this.router.navigate(['/parties']);
      },
      error: (err) => {
        console.error('Error deleting electoral party:', err);
      }
    });
  }
}
