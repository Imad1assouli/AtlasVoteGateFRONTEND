import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointments/appointment.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Appointment } from '../../../model/Appointment.model';
import { status } from '../../../enum/Status.enum';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  appointment: Appointment = {
    id: 0, cne: '', email: '', password: '', appointmentTime: new Date(), nom: '', prenom: '',
    status: status.PENDING_VERIFICATION
  };

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
   } 
    
  onSubmit(): void {
      this.appointmentService.addAppointment(this.appointment).subscribe({
        next: () => {
          this.goToAppointmentsForToday();
        },
        error: (err: any) => {
          console.error('Error during add appointment :', err);
        }
      });
    }
    goToAppointmentsForToday(){
      this.router.navigate(["/appointments"]);  
    }
  
}