import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ClientService} from './client.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PickedTrainerGuardService implements CanActivate {

  BASE_API_URL = environment.BASE_API_URL;

  constructor(
    private router: Router,
    private http: HttpClient) {}

 async canActivate() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      const hasPickedTrainer: any = await this.hasPickedTrainer();
      if (!!hasPickedTrainer.hasPicked) {
        return true;
      } else {
        this.router.navigateByUrl(`/client/${hasPickedTrainer.userId}/pickTrainer`);
        return false;
      }
    }
  }

  hasPickedTrainer() {
    return new Promise((resolve) => {
      this.http.get(`${this.BASE_API_URL}/client/hasPickedTrainer`)
        .subscribe((status: any) => {
          resolve({
            hasPicked: status.hasPickedTrainer,
            userId: status.userId
          });
        });
    });
  }
}
