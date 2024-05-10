// appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { Appointment } from "../../model/Appointment.model";
import { AppointmentService } from "../../services/appointments/appointment.service";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit  {

  appointments: Appointment[] = [];

  constructor(
    public appointmentService: AppointmentService,
    private authService: AuthenticationService
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

  cancelAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.getAllAppointmentsForToday(); // Refresh appointments after cancellation
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  editAppointment(id:number){

  }
  viewAppointment(id:number){

  }
  verifyAppointment(id:number){

  }
  addAppointment(){}

  // Other methods like editAppointment, viewAppointment, verifyAppointment, etc. remain the same

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserOfficial() {
    return this.authService.isUserOfficial();
  }
}
