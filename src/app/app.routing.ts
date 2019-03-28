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

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'trainer',
    component: TrainerHomeComponent,
    children: [
      { path: 'clients', component: TrainerClientsComponent}
      ]
  },
  {
    path: 'trainer/clients/clientId',
    component: TrainerClientComponent,
    children: [
      { path: 'feed', component: TrainerClientFeedComponent }
    ]
  },
  {
    path: 'trainee',
    component: TraineeComponent,
    canActivate: [LoggedInGuardService]
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
