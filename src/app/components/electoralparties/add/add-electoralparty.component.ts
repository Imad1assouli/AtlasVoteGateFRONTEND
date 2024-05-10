import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ElectoralPartyService} from "../../../services/electoralparties/electoralparty.service";

@Component({
  selector: 'app-add-electoral-party',
  templateUrl: './add-electoralparty.component.html',
  styleUrls: ['./add-electoralparty.component.css']
})
export class AddElectoralPartyComponent implements OnInit {
  addForm: FormGroup;
  electoralparty: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private electoralPartyService: ElectoralPartyService
  ) {
    this.addForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.electoralPartyService.addElectoralParty(this.addForm.value).subscribe({
        next: () => {
          this.router.navigate(['/electoralparties']);
        },
        error: (err:any) => {
          console.error('Error adding electoral party:', err);
        }
      });
    }
  }
}
