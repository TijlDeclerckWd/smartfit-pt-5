import {Component, OnInit, ViewChild} from '@angular/core';
import {StatsService} from '../../../services/stats.service';

@Component({
  selector: 'app-weight-stats',
  templateUrl: './weight-stats.component.html',
  styleUrls: ['./weight-stats.component.scss']
})
export class WeightStatsComponent implements OnInit {

  @ViewChild('chart') chart;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.getWeightStats();
  }

  getWeightStats() {
    this.statsService.getWeightStats()
      .subscribe((res) => {
        console.log('RES', res);
      });
  }

}
