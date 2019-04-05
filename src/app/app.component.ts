import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smartfit-PT5';

  constructor(private snotifyService: SnotifyService){}

  ngOnInit() {}

}
