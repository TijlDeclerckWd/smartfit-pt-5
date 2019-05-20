import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {StatsService} from '../../../services/stats.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-muscle-group-stats',
  templateUrl: './muscle-group-stats.component.html',
  styleUrls: ['./muscle-group-stats.component.scss']
})

export class MuscleGroupStatsComponent implements OnInit {

  beginWeek;
  endWeek;

  myChart;

  @ViewChild('chart') chart;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.createNewChart();
    this.beginWeek = moment().startOf('week');
    this.endWeek = moment().endOf('week');
    this.getWeekData();
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Chest', 'Back', 'Biceps', 'Triceps'],
        datasets: [  {
          label: "Muscle group",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [6, 5, 4, 8, 1]
        } ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Display title"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Rep Max'
            }
          }]
        }
      }
    });
  }

  previousWeek() {
    this.beginWeek = moment(this.beginWeek).subtract(7, 'd');
    this.endWeek = moment(this.endWeek).subtract(7, 'd');
    this.getWeekData();
  }

  getWeekData() {
    const data = {
      beginWeek: this.beginWeek.utc().format(),
      endWeek: this.endWeek.utc().format()
    };

    this.statsService.muscleGroupWeekData(data)
      .subscribe((res: any) => {
        this.myChart.data.datasets[0].data[0] = res.data.chest ? res.data.chest.sets : 0;
        this.myChart.data.datasets[0].data[1] = res.data.back ? res.data.back.sets : 0;
        this.myChart.data.datasets[0].data[2] = res.data.biceps ? res.data.biceps.sets : 0;
        this.myChart.data.datasets[0].data[3] = res.data.triceps ? res.data.triceps.sets : 0;
        this.myChart.update();
      });
  }

  nextWeek() {
    this.beginWeek = moment(this.beginWeek).add(7, 'd');
    this.endWeek = moment(this.endWeek).add(7, 'd');
    this.getWeekData();
  }



}
