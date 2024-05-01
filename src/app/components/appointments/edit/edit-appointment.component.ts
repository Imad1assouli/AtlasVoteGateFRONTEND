import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointments/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})

export class EditAppointmentComponent implements OnInit {
  editForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.editForm = this.fb.group({
      cni: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.appointmentService.getAppointment(this.id).subscribe(appointment => {
        this.editForm.patchValue(appointment);
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.appointmentService.updateAppointment(this.id, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/appointments']),
        error: (err) => console.error('Error updating appointment:', err)
      });
    }
  }
}
