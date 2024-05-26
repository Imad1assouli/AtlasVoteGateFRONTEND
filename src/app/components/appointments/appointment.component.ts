// appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { Appointment } from "../../model/Appointment.model";
import { AppointmentService } from "../../services/appointments/appointment.service";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit  {

  appointments: Appointment[] = [];

  constructor(
    public appointmentService: AppointmentService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private route :ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllAppointmentsForToday();

  }

  getAllAppointmentsForToday() {
    this.appointmentService.getAllAppointmentsForToday().subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
      },
      (error: any) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  onSubmit(): void {

  }


  editAppointment(id:number){
    this.router.navigate(["/appointments/edit",id]);

  }
  viewAppointment(id:number){
    this.router.navigate(["/appointments/view",id]);

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
            this.getAllAppointmentsForToday();

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
            this.getAllAppointmentsForToday(); // Refresh appointments after cancellation
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
  addAppointment(){
    this.router.navigate(["/appointments/add"]);
  }

  // Other methods like editAppointment, viewAppointment, verifyAppointment, etc. remain the same

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserOfficial() {
    return this.authService.isUserOfficial();
  }
}
