import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Appointment} from "../../model/Appointment.model";
import { Observable } from 'rxjs';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  private backendHost = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  // Add your service methods here
  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.backendHost}/appointments/${id}`);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backendHost}/appointments/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.backendHost}/appointments/${id}`);
  }

  addAppointment(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {
    return this.http.post(`${this.backendHost}/appointments`, value);
  }

  getAvailableAppointments() {
    return this.http.get<Appointment[]>(`${this.backendHost}/appointments/available`);
  }
}
