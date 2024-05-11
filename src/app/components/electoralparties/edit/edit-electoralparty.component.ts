import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ElectoralParty} from "../../../model/ElectoralParty.model";
import {Router} from "@angular/router";
import {ElectoralPartyService} from "../../../services/electoralparties/electoralparty.service";

@Component({
    selector: 'app-edit-electoralparty',
    templateUrl: './edit-electoralparty.component.html',
})

export class EditElectoralPartyComponent implements OnInit {
  editElectoralParty: FormGroup;
  electoralparty: ElectoralParty = {
    id: 0,
    name: '',
    description: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private electoralPartyService: ElectoralPartyService
  ) {
    this.editElectoralParty = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.electoralPartyService.editElectoralParty(this.electoralparty).subscribe({
      next: () => {
        this.router.navigate(['/electoralparties']);
      },
      error: (err:any) => {
        console.error('Error editing electoral party:', err);
      }
    });
  }
}
