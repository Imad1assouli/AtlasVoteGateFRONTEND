import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { ElectoralPartyComponent } from "./components/electoralparties/electoralparty.component";
import { AppointmentComponent } from "./components/appointments/appointment.component";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditAppointmentComponent} from "./components/appointments/edit/edit-appointment.component";
import {AddAppointmentComponent} from "./components/appointments/add/add-appointment.component";
import {AddElectoralPartyComponent} from "./components/electoralparties/add/add-electoralparty.component";
import {DetailsElectoralPartyComponent} from "./components/electoralparties/details/details-electoralparty.component";
import {UtilisateurComponent} from "./components/utilisateurs/utilisateur.component";
import {AddUtilisateurComponent} from "./components/utilisateurs/add/add-utilisateur.component";
import {SignUpComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppointmentComponent,
    EditAppointmentComponent,
    AddAppointmentComponent,
    ElectoralPartyComponent,
    DetailsElectoralPartyComponent,
    AddElectoralPartyComponent,
    UtilisateurComponent,
    AddUtilisateurComponent,
    SignUpComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
