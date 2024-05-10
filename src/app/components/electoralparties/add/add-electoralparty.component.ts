import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ElectoralPartyService} from "../../../services/electoralparties/electoralparty.service";
import {ElectoralParty} from "../../../model/ElectoralParty.model";

@Component({
  selector: 'app-add-electoral-party',
  templateUrl: './add-electoralparty.component.html',
  styleUrls: ['./add-electoralparty.component.css']
})
export class AddElectoralPartyComponent implements OnInit {
  addElectoralParty: FormGroup;
  electoralparty: ElectoralParty = {
    id: 0,
    name: '',
    description: ''
  };
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private electoralPartyService: ElectoralPartyService
  ) {
    this.addElectoralParty = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.electoralPartyService.addElectoralParty(this.electoralparty).subscribe({
        next: () => {
          this.router.navigate(['/parties']);
        },
        error: (err:any) => {
          console.error('Error adding electoral party:', err);
        }
      });
  }
}
