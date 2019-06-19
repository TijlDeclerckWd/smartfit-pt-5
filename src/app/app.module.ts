import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepicker, MatDatepickerModule, MatDialog, MatDialogModule, MatFormFieldModule,
  MatIconModule,
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
  faAngleLeft, faAngleRight,
  faChartLine, faCheck, faClock, faCoffee, faEnvelope, faFile, faHeadphones, faHome, faList, faMapMarkerAlt,
  faPalette, faPaperPlane, faPlay, faPlus, faSearch, faSignOutAlt, faTimes, faTrash, faUpload, faUser
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
import {
  DialogContentComponent,
  TrainerProfileConnectComponent
} from './trainer/trainer-profile/trainer-profile-connect/trainer-profile-connect.component';
import { ScheduledEventComponent } from './common/events/scheduled-event/scheduled-event.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesMenuComponent } from './messages/messages-menu/messages-menu.component';
import { MessagesConversationsComponent } from './messages/messages-conversations/messages-conversations.component';
import { MessagesConversationComponent } from './messages/messages-conversation/messages-conversation.component';
import { MessagesListItemComponent } from './messages/messages-conversations/messages-list-item/messages-list-item.component';
import { TrainerFeedComponent } from './trainer/trainer-feed/trainer-feed.component';
import { ConfirmRequestNotificationComponent } from './common/notifications/confirm-request-notification/confirm-request-notification.component';
import {TrainerService} from './services/trainer.service';
import { TrainerFeedClientsComponent } from './trainer/trainer-feed/trainer-feed-clients/trainer-feed-clients.component';
import { TrainerClientWorkoutsComponent } from './trainer/trainer-clients/trainer-client/trainer-client-workouts/trainer-client-workouts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateExerciseFormComponent } from './common/forms/create-exercise-form/create-exercise-form.component';
import {ExerciseService} from './services/exercise.service';
import {WorkoutService} from './services/workout.service';
import { WorkoutListItemComponent } from './common/list-items/workout-list-item/workout-list-item.component';
import { ExerciseListItemComponent } from './common/list-items/exercise-list-item/exercise-list-item.component';
import { ClientScheduleComponent } from './trainee/client-schedule/client-schedule.component';
import { ClientStatsComponent } from './trainee/client-stats/client-stats.component';
import { ClientNavComponent } from './trainee/client-nav/client-nav.component';
import {ClientFeedComponent} from './trainee/client-feed/client-feed.component';
import {MomentModule} from 'ngx-moment';
import { ClientWorkoutComponent } from './trainee/client-workout/client-workout.component';
import { ClientExerciseComponent } from './trainee/client-exercise/client-exercise.component';
import { IncrementItemComponent } from './common/forms/increment-item/increment-item.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from 'ngx-ui-loader';
import { WorkoutUpdateComponent } from './common/updates/workout-update/workout-update.component';
import {StatsService} from './services/stats.service';
import {ChartsModule} from 'ng2-charts';
import { CompletedWorkoutsComponent } from './trainee/client-stats/completed-workouts/completed-workouts.component';
import { OneRMStatsComponent } from './trainee/client-stats/one-rm-stats/one-rm-stats.component';
import { ExerciseVolumeStatsComponent } from './trainee/client-stats/exercise-volume-stats/exercise-volume-stats.component';
import { WeightStatsComponent } from './trainee/client-stats/weight-stats/weight-stats.component';
import { MuscleGroupStatsComponent } from './trainee/client-stats/muscle-group-stats/muscle-group-stats.component';
import { WorkoutListItemSecComponent } from './common/list-items/workout-list-item-sec/workout-list-item-sec.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.foldingCube,
  fgsColor: '#1f2123',
  overlayColor: '#fcb823',
  pbThickness: 5, // progress bar thickness
  pbColor: '#bdbab9'
};

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
    ScheduledEventComponent,
    MessagesComponent,
    MessagesMenuComponent,
    MessagesConversationsComponent,
    MessagesConversationComponent,
    MessagesListItemComponent,
    TrainerFeedComponent,
    ConfirmRequestNotificationComponent,
    DialogContentComponent,
    TrainerFeedClientsComponent,
    TrainerClientWorkoutsComponent,
    CreateExerciseFormComponent,
    WorkoutListItemComponent,
    ExerciseListItemComponent,
    ClientScheduleComponent,
    ClientStatsComponent,
    ClientNavComponent,
    ClientFeedComponent,
    ClientWorkoutComponent,
    ClientExerciseComponent,
    IncrementItemComponent,
    WorkoutUpdateComponent,
    CompletedWorkoutsComponent,
    OneRMStatsComponent,
    ExerciseVolumeStatsComponent,
    WeightStatsComponent,
    MuscleGroupStatsComponent,
    WorkoutListItemSecComponent
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
    NotifierModule,
    NgbModule,
    MomentModule,
    ChartsModule,
    MatCheckboxModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    AuthService,
    PickedTrainerGuardService,
    ClientService,
    LoggedInGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr' }},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    TrainerService,
ExerciseService,
    WorkoutService,
    StatsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent, DialogContentComponent, CreateExerciseFormComponent]
})

export class AppModule {
  constructor() {
    library.add(faCoffee, faPalette, faHeadphones,
      faHome, faFile, faEnvelope, faChartLine, faClock,
      faUser, faSearch, faMapMarkerAlt, faList, faPaperPlane,
      faCheck, faTimes, faPlus, faUpload, faPlay, faAngleLeft, faAngleRight, faSignOutAlt, faTrash);
  }
}
