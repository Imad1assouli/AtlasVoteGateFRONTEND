import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from "../model/Appointment.model";
import { AppointmentService } from "../services/appointments/appointment.service";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { status } from '../enum/Status.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {
  appointment: Appointment = {
    id: 0, cne: '', email: '', password: '', appointmentTime: new Date(), nom: '', prenom: '',
    status: status.PENDING_VERIFICATION
  };

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.register(this.appointment).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Error during sign up:', err);
      }
    });
  }

}
