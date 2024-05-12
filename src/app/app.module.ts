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
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ConfirmationDialogComponent } from './components/appointments/dialog/confirmation-dialog/confirmation-dialog.component';
import { ViewComponent } from './components/appointments/view/view.component';
import { EditElectoralPartyComponent } from './components/electoralparties/edit/edit-electoralparty.component';
import { EditComponent } from './components/utilisateurs/edit/edit.component';
import { VoteComponent } from './components/vote/vote.component';


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
    EditElectoralPartyComponent,
    UtilisateurComponent,
    AddUtilisateurComponent,
    SignUpComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    ViewComponent,
    EditComponent,
    VoteComponent,
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
