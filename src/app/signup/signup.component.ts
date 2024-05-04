import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from "../model/Appointment.model";
import { AppointmentService } from "../services/appointments/appointment.service";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  //signupForm: FormGroup;
  //appointments: Appointment[] = [];
  appointment: Appointment = { id: 0, cne: '', email: '', password: '', appointmentTime: new Date(), nom: '', prenom: '' };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    /*
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      appointment: ['', Validators.required]
    });
    */
  }

  ngOnInit(): void {
    
   } /*else {
      this.loadAvailableAppointments();
    }
    
  }

  loadAvailableAppointments(): void {
    this.appointmentService.getAvailableAppointments().subscribe({
      next: (appts) => this.appointments = appts.filter(appt => this.isBusinessDay(new Date(appt.date))),
      error: (err) => console.error('Error fetching available appointments:', err)
    });
  }

  isBusinessDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Exclude Sunday (0) and Saturday (6)
  }*
*/
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
