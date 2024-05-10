import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { ElectoralPartyComponent } from "./components/electoralparties/electoralparty.component";
import { AppointmentComponent } from "./components/appointments/appointment.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditAppointmentComponent} from "./components/appointments/edit/edit-appointment.component";
import {AddAppointmentComponent} from "./components/appointments/add/add-appointment.component";
import {AddElectoralPartyComponent} from "./components/electoralparties/add/add-electoralparty.component";
import {DetailsElectoralPartyComponent} from "./components/electoralparties/details/details-electoralparty.component";
import {UtilisateurComponent} from "./components/utilisateurs/utilisateur.component";
import {AddUtilisateurComponent} from "./components/utilisateurs/add/add-utilisateur.component";
import {SignUpComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import {AuthInterceptorService} from "./services/auth-interceptor.service";

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
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
