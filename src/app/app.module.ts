import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule, MatCardModule, MatDatepicker, MatDatepickerModule, MatDialog, MatDialogModule, MatFormFieldModule, MatInputModule,
  MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatStepperModule, MatTooltipModule
} from '@angular/material';
import { TrainerHomeComponent } from './trainer/trainer-home/trainer-home.component';
import {routing} from './app.routing';
import { HomeComponent } from './home/home.component';
import {AuthService} from './services/auth.service';

import { TraineeComponent } from './trainee/trainee/trainee.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterTraineeComponent } from './auth/register/register-trainee/register-trainee.component';
import { RegisterTrainerComponent } from './auth/register/register-trainer/register-trainer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import { NavigationPhoneComponent } from './common/navigation/navigation-phone/navigation-phone.component';
import { NavigationDesktopComponent } from './common/navigation/navigation-desktop/navigation-desktop.component';
import { TrainerClientsComponent } from './trainer/trainer-clients/trainer-clients.component';
import { ClientCardComponent } from './trainer/trainer-clients/client-card/client-card.component';
import { TrainerClientFeedComponent } from './trainer/trainer-clients/trainer-client/trainer-client-feed/trainer-client-feed.component';
import { TrainerClientComponent } from './trainer/trainer-clients/trainer-client/trainer-client.component';
import { TrainerClientNavComponent } from './trainer/trainer-clients/trainer-client-nav/trainer-client-nav.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faChartLine, faClock, faCoffee, faEnvelope, faFile, faHeadphones, faHome,
  faPalette, faUser
} from '@fortawesome/free-solid-svg-icons';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {NotifierModule} from 'angular-notifier';
import { SignInComponent } from './auth/signIn/sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    TrainerHomeComponent,
    HomeComponent,
    TraineeComponent,
    RegisterComponent,
    RegisterTraineeComponent,
    RegisterTrainerComponent,
    NavigationPhoneComponent,
    NavigationDesktopComponent,
    TrainerClientsComponent,
    ClientCardComponent,
    TrainerClientFeedComponent,
    TrainerClientComponent,
    TrainerClientNavComponent,
    SignInComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatStepperModule,
    MatRadioModule,
    routing,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    SnotifyModule,
    FontAwesomeModule,
    MatTooltipModule,
    NotifierModule
  ],
  providers: [
    AuthService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr' }},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(faCoffee, faPalette, faHeadphones, faHome, faFile, faEnvelope, faChartLine, faClock, faUser);
  }
}
