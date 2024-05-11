import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ElectoralParty} from "../../../model/ElectoralParty.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectoralPartyService} from "../../../services/electoralparties/electoralparty.service";
import { ConfirmationDialogComponent } from '../../appointments/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  id!:number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private route:ActivatedRoute,
    private electoralPartyService: ElectoralPartyService
  ) {
    this.editElectoralParty = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id =  this.route.snapshot.params['id'];
      this.electoralPartyService.getElectoralParty(this.id).subscribe((data:ElectoralParty) => {
        this.electoralparty=data;
      });
    });
  }

  
  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to update this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.electoralPartyService.editElectoralParty(this.electoralparty).subscribe({
          next: () => {
            console.log('party deleted successfully');
            this.router.navigate(['/electoralparties']);
          },
          error: (err:any) => {
            console.error('Error editing electoral party:', err);
          }
        });
      }
    });
  }
}
