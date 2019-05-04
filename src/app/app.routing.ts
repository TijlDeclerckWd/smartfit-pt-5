import {RouterModule, Routes} from '@angular/router';
import {TrainerHomeComponent} from './trainer/trainer-home/trainer-home.component';
import {HomeComponent} from './home/home.component';
import {TraineeComponent} from './trainee/trainee/trainee.component';
import {LoggedInGuardService} from './services/logged-in-guard.service';
import {RegisterComponent} from './auth/register/register.component';
import {RegisterTraineeComponent} from './auth/register/register-trainee/register-trainee.component';
import {TrainerClientsComponent} from './trainer/trainer-clients/trainer-clients.component';
import {RegisterTrainerComponent} from './auth/register/register-trainer/register-trainer.component';
import {TrainerClientFeedComponent} from './trainer/trainer-clients/trainer-client/trainer-client-feed/trainer-client-feed.component';
import {TrainerClientComponent} from './trainer/trainer-clients/trainer-client/trainer-client.component';
import {PickedTrainerGuardService} from './services/picked-trainer-guard.service';
import {PickTrainerComponent} from './trainee/pick-trainer/pick-trainer.component';
import {TrainerProfileComponent} from './trainer/trainer-profile/trainer-profile.component';
import {TrainerFeedComponent} from './trainer/trainer-feed/trainer-feed.component';
import {TrainerClientWorkoutsComponent} from './trainer/trainer-clients/trainer-client/trainer-client-workouts/trainer-client-workouts.component';
import {ClientFeedComponent} from './trainee/client-feed/client-feed.component';
import {ClientScheduleComponent} from './trainee/client-schedule/client-schedule.component';
import {ClientStatsComponent} from './trainee/client-stats/client-stats.component';
import {ClientWorkoutComponent} from './trainee/client-workout/client-workout.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'trainer/:userId',
    component: TrainerHomeComponent,
    children: [
      { path: 'feed', component: TrainerFeedComponent },
      { path: 'clients', component: TrainerClientsComponent }
      ]
  },
  {
    path: 'trainer/:userId/clients/:clientId',
    component: TrainerClientComponent,
    children: [
      { path: 'feed', component: TrainerClientFeedComponent },
      { path: 'workouts', component: TrainerClientWorkoutsComponent }
    ]
  },
  {
    path: 'profile/trainer/:trainerId',
    component: TrainerProfileComponent
  },
  {
    path: 'client/:userId',
    component: TraineeComponent,
    canActivate: [PickedTrainerGuardService],
    children: [
      { path: 'feed', component: ClientFeedComponent },
      { path: 'schedule', component: ClientScheduleComponent },
      { path: 'statistics', component: ClientStatsComponent },
      { path: 'workout/:workoutId', component: ClientWorkoutComponent }
    ]
  },
  {
    path: 'client/:userId/pickTrainer',
    component: PickTrainerComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'trainee', component: RegisterTraineeComponent },
      { path: 'trainer', component: RegisterTrainerComponent}
    ]
  }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
