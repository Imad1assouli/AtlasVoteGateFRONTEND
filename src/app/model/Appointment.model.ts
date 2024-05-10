import { DatePipeConfig } from "@angular/common";

export interface Appointment {
  id: number;
  cne: string;
  email: string;
  password: string;
  appointmentTime: Date;
  nom: string;
  prenom: string;
  status:string;
}
