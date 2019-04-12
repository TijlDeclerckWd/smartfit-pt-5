import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  hasPickedTrainer() {
    return this.http.get(`${this.BASE_API_URL}/client/hasPickedTrainer`)
      .pipe(map((status: any) => status.saved));
  }
}
