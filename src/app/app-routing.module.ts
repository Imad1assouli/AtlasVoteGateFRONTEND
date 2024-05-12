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
import {EditElectoralPartyComponent} from "./components/electoralparties/edit/edit-electoralparty.component";
import { ViewComponent } from './components/appointments/view/view.component';
import { EditComponent } from './components/utilisateurs/edit/edit.component';
import { VoteComponent } from './components/vote/vote.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'appointments/add', component: AddAppointmentComponent }, // Route for adding appointments
  { path: 'appointments/edit/:id', component: EditAppointmentComponent },
  { path: 'appointments/view/:id', component: ViewComponent },
  { path: 'electoralparties', component: ElectoralPartyComponent },
  { path: 'electoralparties/add', component: AddElectoralPartyComponent },
  { path: 'electoralparties/details/:id', component: DetailsElectoralPartyComponent },
  { path: 'electoralparties/edit/:id', component: EditElectoralPartyComponent },
  { path: 'utilisateurs', component: UtilisateurComponent },
  { path: 'utilisateurs/add', component: AddUtilisateurComponent },
  { path: 'utilisateurs/edit/:id', component: EditComponent },
  { path: 'vote', component: VoteComponent },
  { path: '**', redirectTo: '' } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
