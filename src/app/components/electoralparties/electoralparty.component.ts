import {Component, OnInit} from '@angular/core';
import { ElectoralParty } from "../../model/ElectoralParty.model";
import { ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup} from "@angular/forms";
import { ElectoralPartyService } from "../../services/electoralparties/electoralparty.service";
import {Role} from "../../enum/Role.enum";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-electoralparties',
  templateUrl: './electoralparty.component.html',
  styleUrls: ['./electoralparty.component.css']
})
export class ElectoralPartyComponent implements OnInit  {
  electoralparty!: ElectoralParty;
  id: any;
  parties: any;

  constructor(private fb: FormBuilder, public electoralpartyService: ElectoralPartyService,
              private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllElectoralParties();
  }

  addElectoralParty() {
    this.router.navigate(['/electoralparties/add']);
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserOfficial() {
    return this.authService.isUserOfficial();
  }

  private getAllElectoralParties() {
      this.electoralpartyService.getAllElectoralParties().subscribe(
        (response: any) => {
          this.parties = response;
        },
        (error: any) => {
          console.error('Error retrieving electoral parties:', error);
        }
      );

  }

  viewElectoralPartyDetails(id: number) {
    this.router.navigate(['/electoralparties/details', id]);
  }
}
