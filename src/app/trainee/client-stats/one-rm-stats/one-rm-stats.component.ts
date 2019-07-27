import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from '../../../services/exercise.service';
import {StatsService} from '../../../services/stats.service';
import {Color} from 'ng2-charts';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'one-rm-stats',
  templateUrl: './one-rm-stats.component.html',
  styleUrls: ['./one-rm-stats.component.scss']
})
export class OneRMStatsComponent implements OnInit {

  exercises = [];
  dataLoaded = false;

  data = [];
  finalData = [];

  myChart;

  selectedExercise: string;

  chosenDisplay = 'day';
  beginDate = moment().subtract('14', 'd').format('ll');
  endDate = moment().format('ll');

  @ViewChild('chart') chart;

  constructor(private exerciseService: ExerciseService, private statsService: StatsService, private ngxService: NgxUiLoaderService) { }

  async ngOnInit() {
    this.ngxService.start();
    await this.getClientExercises();

    // Set the data for the first chart
    this.getSelectedExerciseRMData(this.exercises[0]._id);
    this.selectedExercise = this.exercises[0].name;

    this.createNewChart();
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'User\'s 1RM',
          data: this.finalData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          fill: true,
          lineTension: 0
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `${this.selectedExercise} 1RM`
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'l',
              minUnit: 'day',
              max: this.endDate,
              min: this.beginDate
            },
            scaleLabel: {
              display: false,
              labelString: 'Date'
            },
            ticks: {
              stepSize: 1
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

    this.ngxService.stop();

  }

  changeChartView(unit) {
    switch (unit) {
      case 'day':
        this.switchToDayView();
        break;
      case 'week':
        this.switchToWeekView();
        break;
      case 'month':
        this.switchToMonthView();
        break;
    }
  }

  changeSelectedExercise(e) {
    this.getSelectedExerciseRMData(e.target.value);
    this.selectedExercise = e.target.value;
  }

  filterByDay(data) {
    // we get the date from 14 days ago
    const daysAgo14 = moment().subtract(14, 'd').toDate();
    console.log('data', data);

    // the data dates are sorted, so we find the first index where the date is bigger than 14days ago
    const index = data.findIndex((item) => new Date(item.date) > daysAgo14);

    // this is the data of all the stats of last 14 days
    const filteredData = index > -1 ? data.slice(index) : [];
    // // if we have earlier data we want to include the last moment before 14 days just to have a starting point to draw the chart line
    // // if index is not 0 (which means we started the filtering at the first item of the data list), we add this earlier moment to the chart
    // const earlierData = index !== 0 ? data[index - 1] : null;
    // if (earlierData) {
    //   filteredData.unshift(earlierData);
    //   // We make sure that this earlier data is the first date displayed on the map
    //   this.beginDate = moment(earlierData.date).format('ll');
    // } else {
    //
    // }
    this.beginDate = moment(filteredData[0].date).format('ll');
    return filteredData;
  }

  filterByWeek(data) {
    //  so just like with the days, here we want to get a limited amount of data (last 6 weeks or less);
    const weeksAgo6 = moment().startOf('week').subtract(6, 'weeks').toDate();
    console.log('data', data);
    const filteredData = data.filter((item) => moment(item.date).isAfter(weeksAgo6));
    console.log('filter test1', data.filter((item) => moment(item.date).isAfter(weeksAgo6)));

    return filteredData;
  }

  filterData(data, timeDisplay) {
    switch (timeDisplay) {
      case 'day':
        return this.filterByDay(data);
      case 'week':
        return this.filterByWeek(data);
    }
  }

  getClientExercises() {
    return new Promise((resolve) => {
      this.exerciseService.getClientExercises()
        .subscribe((res) => {
          this.exercises = res['exercises'];
          resolve();
        });
    });
  }

  // Get the 1RM data for a particular exercise
  getSelectedExerciseRMData(exerciseId) {
    this.statsService.getExerciseRMData(exerciseId)
      .subscribe((res) => {
        console.log('REM', res['data']);
        this.data = res['data'];
        const filteredData = this.filterData(res['data'], this.chosenDisplay);

        this.finalData = this.refactorData(filteredData);
        if (!this.dataLoaded) {
          this.createNewChart();
          this.dataLoaded = true;
        } else {
          this.myChart.update();
        }
      });
  }

  refactorData(data) {
  //  change date to right format
    const refactoredArr = data.map((item) => {
      const date = moment(item.date).format('l');
      return {x: date, y: item.oneRM };
    });

    return refactoredArr;
  }

  switchToDayView() {

  }

  switchToWeekView() {
    this.chosenDisplay = 'week';
    const filteredData = this.filterByWeek(this.data);
    console.log('yihaaaa', filteredData);
    this.finalData = this.writeWeekData(filteredData);
    console.log('finalData', this.finalData);
    this.myChart.update();
  }

  switchToMonthView() {

  }

  // calculate averages for every week and add them to the graph
  writeWeekData(filteredData) {
    const weeks = [1, 2, 3, 4, 5, 6];
    // this index gets updated so that we take the right parts from the data array week after week
    let lastWeekIndex: number;

    // So for every week...
    return weeks.map((item, index) => {
      // get all the data from this week
      const startWeek = moment().subtract(index + 1, 'week').startOf('week');
      const endWeek = moment().subtract(index + 1, 'week').endOf('week');

      const indexFirstMatch = filteredData.findIndex((stat) => stat.date >= startWeek.toDate());
      lastWeekIndex = indexFirstMatch;
      const weekData = filteredData.splice(indexFirstMatch, filteredData.length - indexFirstMatch);
      const weekAverage = weekData.reduce((sum, curr) => sum + curr.oneRM, 0) / weekData.length;

      const nameWeek = `${startWeek.format('MMMM Do')} - ${endWeek.format('MMMM Do')}`;
      return { x: nameWeek, y: weekAverage };
    });
  }

}
