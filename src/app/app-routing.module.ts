import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { AppointmentComponent } from "./components/appointments/appointment.component";
import { ElectoralPartyComponent } from "./components/electoralparties/electoralparty.component";
import {AddAppointmentComponent} from "./components/appointments/add/add-appointment.component";
import {EditAppointmentComponent} from "./components/appointments/edit/edit-appointment.component";
import {AddElectoralPartyComponent} from "./components/electoralparties/add/add-electoralparty.component";
import {DetailsElectoralPartyComponent} from "./components/electoralparties/details/details-electoralparty.component";
import {UtilisateurComponent} from "./components/utilisateurs/utilisateur.component";
import {AddUtilisateurComponent} from "./components/utilisateurs/add/add-utilisateur.component";
import {SignUpComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'appointments/add', component: AddAppointmentComponent }, // Route for adding appointments
  { path: 'appointments/edit', component: EditAppointmentComponent },
  { path: 'electoralparties', component: ElectoralPartyComponent },
  { path: 'electoralparties/add', component: AddElectoralPartyComponent },
  { path: 'electoralparties/details', component: DetailsElectoralPartyComponent },
  { path: 'utilisateurs', component: UtilisateurComponent },
  { path: 'utilisateurs/add', component: AddUtilisateurComponent },
  { path: '**', redirectTo: '' } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
