// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from "../../model/Appointment.model";
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private backendHost = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.backendHost}/appointments/${id}`);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backendHost}/appointments/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendHost}/appointments/${id}`);
  }

  addAppointment(value: any): Observable<any> {
    return this.http.post<any>(`${this.backendHost}/appointments`, value);
  }

  getAvailableAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backendHost}/appointments/available`);
  }

  getAllAppointmentsForToday(): Observable<Appointment[]> {
    const token = this.authenticationService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Appointment[]>('http://localhost:8080/api/admin/appointments/today', { headers });
  }
}
