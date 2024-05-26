import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../../../services/appointments/appointment.service';
import { Appointment } from '../../../model/Appointment.model';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
})

export class EditAppointmentComponent implements OnInit {
  id!: number;
  appointment:Appointment={} as Appointment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id =  this.route.snapshot.params['id'];
      this.appointmentService.getAppointment(this.id).subscribe((data:Appointment) => {
        this.appointment=data;
      });
    });
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to update this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.updateAppointment(this.id, this.appointment).subscribe({
          next: () => this.router.navigate(['/appointments']),
          error: (err) => console.error('Error updating appointment:', err)
        });
      }
    });
  }
}
