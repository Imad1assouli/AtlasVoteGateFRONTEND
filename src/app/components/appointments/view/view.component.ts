import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointments/appointment.service';
import { Appointment } from '../../../model/Appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  appointmentId!: number;
  appointment: Appointment={} as Appointment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['id'];
      this.loadAppointmentDetails();
    });
  }

  loadAppointmentDetails(): void {
    this.appointmentService.getAppointment(this.appointmentId).subscribe(
      (data: Appointment) => {
        this.appointment = data;
      },
      (error: any) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }

  editAppointment(id:number){
    this.router.navigate(["/appointments/edit",id]);

  }
  viewAppointment(id:number){
    this.router.navigate(["/appointments"]);

  }
  verifyAppointment(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to verify this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.verifyAppointment(id).subscribe(
          (data) => {
            console.log('Appointment verified successfully:', data);
            this.goToAppointmentsForToday();

          },
          (error) => {
            console.error('Error ', error);

          }
        );
      }
    });

  }
  cancelAppointment(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to cancel this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.cancelAppointment(id).subscribe({
          next: () => {
            this.goToAppointmentsForToday(); // Refresh appointments after cancellation
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    });

  }
    goToAppointmentsForToday(){
      this.router.navigate(["/appointments"]);
    }

}

