import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDatepicker, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatTooltipModule
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
    MatRadioModule,
    routing,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(faCoffee, faPalette, faHeadphones, faHome, faFile, faEnvelope, faChartLine, faClock, faUser);
  }
}
