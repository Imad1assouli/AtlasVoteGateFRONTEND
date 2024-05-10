import { Component, OnInit } from '@angular/core';
import { Appointment } from "../../model/Appointment.model";

import { FormBuilder, FormGroup } from "@angular/forms";
import { AppointmentService } from "../../services/appointments/appointment.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit  {

  editAppointmentFormGroup!: FormGroup;
  appointment!: Appointment;
  id: any;
  appointments: any;

  constructor(private fb: FormBuilder, public appointmentService: AppointmentService ,
              private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.appointmentService.getAppointment(1).subscribe({
      next: (appointment) => {
        this.appointment = appointment;
        this.editAppointmentFormGroup  = this.fb.group({
          cni: this.fb.control(this.appointment.cne),
          nom: this.fb.control(this.appointment.nom),
          prenom: this.fb.control(this.appointment.prenom),
          email: this.fb.control(this.appointment.email),
        });
      }, error: (err:any) => {
        console.log(err);
      }
    })
  }

  onSubmit(): void {
    if (this.editAppointmentFormGroup.valid) {
      console.log('Form Submitted', this.editAppointmentFormGroup.value);
      this.appointmentService.updateAppointment(this.id, this.editAppointmentFormGroup.value).subscribe({
        next: (updatedAppointment) => {
          console.log('Appointment updated:', updatedAppointment);
          this.router.navigate(['/appointments']);
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  deleteAppointment(id:number) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: (appointment) => {
        this.appointments = this.appointments.filter((appointment: { id: number; }) => appointment.id !== id);
      }, error: (err:any) => {
        console.log(err);
      }
    })
  }

  editAppointment(id:number) {
    this.router.navigate(['/appointments/edit', id]);
  }

  addAppointment() {
    this.router.navigate(['/appointments/add']);
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  isUserOfficial() {
    return this.authService.isUserOfficial();
  }
}
