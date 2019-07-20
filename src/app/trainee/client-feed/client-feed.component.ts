import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-client-feed',
  templateUrl: './client-feed.component.html',
  styleUrls: ['./client-feed.component.scss']
})
export class ClientFeedComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.loadAllUpdates();
  }

  loadAllUpdates() {
    console.log('started loading all the updates');
    this.clientService.loadAllUpdates()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log('res', res);
      });
  }

ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
