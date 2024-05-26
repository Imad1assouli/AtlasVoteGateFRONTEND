import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { ElectoralPartyComponent } from './components/electoralparties/electoralparty.component';
import { AppointmentComponent } from './components/appointments/appointment.component';
import { EditAppointmentComponent } from './components/appointments/edit/edit-appointment.component';
import { AddAppointmentComponent } from './components/appointments/add/add-appointment.component';
import { AddElectoralPartyComponent } from './components/electoralparties/add/add-electoralparty.component';
import { DetailsElectoralPartyComponent } from './components/electoralparties/details/details-electoralparty.component';
import { UtilisateurComponent } from './components/utilisateurs/utilisateur.component';
import { AddUtilisateurComponent } from './components/utilisateurs/add/add-utilisateur.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ConfirmationDialogComponent } from './components/appointments/dialog/confirmation-dialog/confirmation-dialog.component';
import { ViewComponent } from './components/appointments/view/view.component';
import { EditElectoralPartyComponent } from './components/electoralparties/edit/edit-electoralparty.component';
import { EditComponent } from './components/utilisateurs/edit/edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VoteComponent } from './components/vote/vote.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { NbCardModule, NbDatepickerModule, NbInputModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthInterceptorService } from './services/auth-interceptor.service';

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
    NavbarComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    RippleModule,
    InputTextModule,
    MessageModule,
    BreadcrumbModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbDatepickerModule.forRoot(),
    NbCardModule,
    NbInputModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    NbLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
