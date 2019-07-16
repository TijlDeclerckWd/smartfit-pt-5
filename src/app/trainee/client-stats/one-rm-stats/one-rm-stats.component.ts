import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from '../../../services/exercise.service';
import {StatsService} from '../../../services/stats.service';
import {Color} from 'ng2-charts';
import * as Chart from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'one-rm-stats',
  templateUrl: './one-rm-stats.component.html',
  styleUrls: ['./one-rm-stats.component.scss']
})
export class OneRMStatsComponent implements OnInit {

  exercises = [];
  dataLoaded = false;

  myChart;

  @ViewChild('chart') chart;

  constructor(private exerciseService: ExerciseService, private statsService: StatsService) { }

  ngOnInit() {
    // make sure that we later change this so that it will only display exercises that a client has actually done
    this.getClientExercises();
    this.createNewChart();
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'User\'s 1RM',
          data: [
            {x: new Date(1990, 4, 11), y: 4 },
            {x: new Date(1990, 6, 12), y: 5 },
            {x: new Date(1990, 8, 13), y: 8 },
            {x: new Date(1990, 4, 13), y: 10 }
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Bench Press 1RM"
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'll',
              unit: 'week'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
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

  changeChartView(unit) {
    // switch (unit) {
    //   case 'day':
    //     this.switchToDayView();
    //     break;
    //   case 'week':
    //     this.switchToWeekView();
    //     break;
    //   case 'month':
    //     this.switchToMonthView();
    //     break;
    // }
  }

  changeSelectedExercise(e) {
    this.getSelectedExerciseRMData(e.target.value);
  }

  getClientExercises() {
    this.exerciseService.getClientExercises()
      .subscribe((res) => {
        this.exercises = res['exercises'];
      });
  }

  getSelectedExerciseRMData(exerciseId) {

    this.statsService.getExerciseRMData(exerciseId)
      .subscribe((res) => {
        const readyData = this.refactorData(res['data']);
        this.myChart.data.datasets[0].data = readyData;
        this.myChart.update();
        this.dataLoaded = true;
      });
  }

  refactorData(data) {
  //  change date to right format
    const refactoredArr = data.map((item) => {

      const date = moment(item.date).format('ll');
      return {x: date, y: item.oneRM };
    });

    return refactoredArr;
  }

  switchToDayView() {

  }

  switchToWeekView() {

  }

  switchToMonthView() {

  }

}
