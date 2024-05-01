import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointments/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.addForm = this.fb.group({
      cni: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.appointmentService.addAppointment(this.addForm.value).subscribe({
        next: () => {
          this.router.navigate(['/appointments']);
        },
        error: (err) => {
          console.error('Error adding appointment:', err);
        }
      });
    }
  }
}
