import { status } from "../enum/Status.enum";

export interface Appointment {
  id: number;
  cne: string;
  email: string;
  password: string;
  appointmentTime: Date;
  nom: string;
  prenom: string;
  status: status; // Make status field optional
}
