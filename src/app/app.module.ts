import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule, MatCardModule, MatDatepicker, MatDatepickerModule, MatDialog, MatDialogModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  faChartLine, faClock, faCoffee, faEnvelope, faFile, faHeadphones, faHome, faMapMarkerAlt,
  faPalette, faSearch, faUser
} from '@fortawesome/free-solid-svg-icons';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {NotifierModule} from 'angular-notifier';
import { SignInComponent } from './auth/signIn/sign-in/sign-in.component';
import { PickTrainerComponent } from './trainee/pick-trainer/pick-trainer.component';
import { SearchBarComponent } from './common/search-bar/search-bar.component';
import {PickedTrainerGuardService} from './services/picked-trainer-guard.service';
import {ClientService} from './services/client.service';
import {LoggedInGuardService} from './services/logged-in-guard.service';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { PickTrainerMenuComponent } from './trainee/pick-trainer/pick-trainer-menu/pick-trainer-menu.component';
import { TrainerListItemComponent } from './common/list-items/trainer-list-item/trainer-list-item.component';
import { TrainerListItemCardComponent } from './common/list-items/trainer-list-item-card/trainer-list-item-card.component';
import { TrainerProfileComponent } from './trainer/trainer-profile/trainer-profile.component';
import { TrainerProfileMainComponent } from './trainer/trainer-profile/trainer-profile-main/trainer-profile-main.component';
import { TrainerProfileDetailsComponent } from './trainer/trainer-profile/trainer-profile-details/trainer-profile-details.component';
import { TrainerProfileConnectComponent } from './trainer/trainer-profile/trainer-profile-connect/trainer-profile-connect.component';
import { ScheduledEventComponent } from './common/events/scheduled-event/scheduled-event.component';


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
    PickTrainerComponent,
    SearchBarComponent,
    PickTrainerMenuComponent,
    TrainerListItemComponent,
    TrainerListItemCardComponent,
    TrainerProfileComponent,
    TrainerProfileMainComponent,
    TrainerProfileDetailsComponent,
    TrainerProfileConnectComponent,
    ScheduledEventComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatInputModule,
    MatIconModule,
    routing,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    SnotifyModule,
    FontAwesomeModule,
    MatTooltipModule,
    NotifierModule
  ],
  providers: [
    AuthService,
    PickedTrainerGuardService,
    ClientService,
    LoggedInGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr' }},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent]
})

export class AppModule {
  constructor() {
    library.add(faCoffee, faPalette, faHeadphones, faHome, faFile, faEnvelope, faChartLine, faClock, faUser, faSearch, faMapMarkerAlt);
  }
}
