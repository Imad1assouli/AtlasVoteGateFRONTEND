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
  editElectoralPartyFormGroup!: FormGroup;
  electoralparty!: ElectoralParty;
  id: any;
  parties: any;

  constructor(private fb: FormBuilder, public electoralpartyService: ElectoralPartyService,
              private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.electoralpartyService.getElectoralParty(1).subscribe({
      next: (electoralparty) => {
        this.electoralparty = electoralparty;
        this.editElectoralPartyFormGroup  = this.fb.group({
          name: this.fb.control(this.electoralparty.name),
          description: this.fb.control(this.electoralparty.description),
        });
      }, error: (err:any) => {
        console.log(err);
      }
    })
  }
  Edit() {
    this.router.navigateByUrl("/navbar/edit-electoralparty/"+1);
  }

  Add() {
    this.router.navigateByUrl("/navbar/add-electoralparty/"+1);
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
}
