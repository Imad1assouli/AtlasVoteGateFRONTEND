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
import { AuthGuard } from './services/guards/auth.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { FonctionnaireGuard } from './services/guards/fonctionnaire.guard';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentComponent ,canActivate: [FonctionnaireGuard,AdminGuard]},
  { path: 'appointments/add', component: AddAppointmentComponent,canActivate: [AdminGuard] }, // Route for adding appointments
  { path: 'appointments/edit/:id', component: EditAppointmentComponent,canActivate: [AuthGuard,AdminGuard] },
  { path: 'appointments/view/:id', component: ViewComponent,canActivate: [AuthGuard,FonctionnaireGuard,AdminGuard] },
  { path: 'electoralparties', component: ElectoralPartyComponent },
  { path: 'electoralparties/add', component: AddElectoralPartyComponent,canActivate: [AuthGuard,AdminGuard] },
  { path: 'electoralparties/details/:id', component: DetailsElectoralPartyComponent },
  { path: 'electoralparties/edit/:id', component: EditElectoralPartyComponent,canActivate: [AdminGuard] },
  { path: 'utilisateurs', component: UtilisateurComponent,canActivate: [AdminGuard] },
  { path: 'utilisateurs/add', component: AddUtilisateurComponent,canActivate: [AdminGuard] },
  { path: 'utilisateurs/edit/:id', component: EditComponent,canActivate: [AdminGuard] },
  { path: 'vote', component: VoteComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
