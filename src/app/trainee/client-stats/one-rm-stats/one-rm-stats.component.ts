import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from '../../../services/exercise.service';
import {StatsService} from '../../../services/stats.service';
import {Color} from 'ng2-charts';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'one-rm-stats',
  templateUrl: './one-rm-stats.component.html',
  styleUrls: ['./one-rm-stats.component.scss']
})
export class OneRMStatsComponent implements OnInit, OnDestroy {

  exercises = [];
  dataLoaded = false;

  data = [];

  myChart;

  selectedExercise: string;

  chartOptions = {
    minWeek: 6,
    maxWeek: 0,
    chosenDisplay: 'week',
    finalData: [],
    labels: [],
    beginDate: moment().subtract(14, 'd').format('ll')
  };

  ngUnsubscribe = new Subject();

  @ViewChild('chart') chart;

  constructor(private exerciseService: ExerciseService, private statsService: StatsService, private ngxService: NgxUiLoaderService) { }

  async ngOnInit() {
    this.ngxService.start();
    await this.getClientExercises();

    // Set the data for the first chart
    this.getSelectedExerciseRMData(this.exercises[0]._id);
    this.selectedExercise = this.exercises[0].name;
  }

  createNewChart() {
    const ctx = this.chart.nativeElement.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartOptions.labels,
        datasets: [{
          label: 'User\'s 1RM',
          data: this.chartOptions.finalData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2,
          fill: true,
          lineTension: 0,
          spanGaps: true,
          pointBackgroundColor: 'red'
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
            display: true
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

  changeSelectedExercise(e) {
    this.getSelectedExerciseRMData(e.target.value);
    this.selectedExercise = e.target.value;
  }

  changeView(command) {
    if (command === 'left') {
      this.showEarlierData(command);
    } else {
      this.showMoreRecentData(command);
    }
  }

  filterData(data, timeDisplay) {
    // we want to get a limited time of data (6 months or 6 weeks ago, based on the chosenDisplay)
    const timeAgo = moment().startOf(timeDisplay).subtract(6, timeDisplay.charAt(0).toUpperCase()).toDate();
    console.log('timeAgo', timeAgo)
    const filteredData = data.filter((item) => moment(item.date).isAfter(timeAgo));
    return filteredData;
  }

  getClientExercises() {
    return new Promise((resolve) => {
      this.exerciseService.getClientExercises()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          this.exercises = res['exercises'];
          resolve();
        });
    });
  }

  // Get the 1RM data for a particular exercise
  getSelectedExerciseRMData(exerciseId) {
    this.statsService.getExerciseRMData(exerciseId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.data = res['data'];

        const filteredData = this.filterData(this.data, this.chartOptions.chosenDisplay);

        this.refactorData(filteredData, this.chartOptions.chosenDisplay);
        if (!this.dataLoaded) {
          this.createNewChart();
          this.dataLoaded = true;
        } else {
          this.myChart.update();
        }
      });
  }

  refactorData(data, chosenDisplay) {
    switch (chosenDisplay) {
      case 'week':
        this.refactorWeekData(data);
        break;
      case 'month':
        return this.refactorMonthData(data);
    }
  }

  refactorWeekData(data) {
    const dataToEdit = data;
    // whenever we handle this function we get the data for six weeks
    const weeks = [1, 2, 3, 4, 5, 6];

    weeks.forEach((week) => {
      const beginWeek = moment().subtract( week - 1, 'weeks').startOf('week');
      const weekInterval = `${beginWeek.format('DD MMM')}`;
      this.chartOptions.labels.unshift(weekInterval);

      // index represents the place in the array with the first date that is after this week
      const index = dataToEdit.findIndex((item) => new Date(item.date) > beginWeek.toDate());

      // if there is no data for this week...
      if ( index === -1 ) {
        // we enter a NaN value, this will be filled up with the spangaps property
        this.chartOptions.finalData.unshift(NaN);
      } else {
        // get the items that belong to this week
        const weekData = dataToEdit.splice(index);
        // Get the average RM value of these items
        const RMValue = weekData.reduce((sum, cur) => sum + cur.oneRM, 0) / weekData.length;
        // and add them to the final data
        this.chartOptions.finalData.unshift(RMValue);
      }
    });
  }

  refactorMonthData(data) {
    const dataToEdit = data;
    // whenever we handle this function we get the data for six weeks
    const months = [1, 2, 3, 4, 5, 6];

    months.forEach((month) => {
      const beginMonth = moment().subtract( month - 1, 'months').startOf('months');

      const monthInterval = `${beginMonth.format('MMM')}`;

      this.chartOptions.labels.unshift(monthInterval);

      // index represents the place in the array with the first date that is after this week
      const index = dataToEdit.findIndex((item) => new Date(item.date) > beginMonth.toDate());

      // if there is no data for this week...
      if ( index === -1 ) {
        // we enter a NaN value, this will be filled up with the spangaps property
        this.chartOptions.finalData.unshift(NaN);
      } else {
        // get the items that belong to this month
        const monthData = dataToEdit.splice(index);
        // Get the average RM value of these items
        const RMValue = monthData.reduce((sum, cur) => sum + cur.oneRM, 0) / monthData.length;
        // and add them to the final data
        this.chartOptions.finalData.unshift(RMValue);
      }
    });
  }

  showEarlierData(type) {
    if (this.chartOptions.chosenDisplay === 'week') {
      const currentFirstWeek = moment(this.myChart.data.labels[0], 'DD MMM');
      const oneWeekBefore = moment(currentFirstWeek).subtract(1, 'w');
      const weekData = this.data.filter((item) => moment(new Date(item.date)).isBetween(oneWeekBefore.toDate(), currentFirstWeek.toDate()));

      //  calculate the average 1RM for this week
      const oneRM = !!weekData ? weekData.reduce((sum, cur) => sum + cur.oneRM, 0) / weekData.length : NaN;

      //  add the new label
      this.myChart.data.labels.unshift(oneWeekBefore.format('DD MMM'));
      this.myChart.data.labels.pop();
      //  add the new data
      this.myChart.data.datasets[0].data.unshift(oneRM);
      this.myChart.data.datasets[0].data.pop();
      //  update the chart
      this.myChart.update();
      //   when the display is month
    } else if (type === 'month') {

    }
  }

  showMoreRecentData(type) {
if (type === 'right') {

  // this is the start of the last week in labels last
  const currentLastWeek = moment(this.myChart.data.labels[this.myChart.data.labels.length - 1], 'DD MMM');
  console.log('currentLastWeek', currentLastWeek.toDate());
  // this is the start of the next week we want to display
  const oneWeekAfterStart = moment(currentLastWeek).add(1, 'week');
  // and this is the end of that week
  const oneWeekAfterEnd = moment(currentLastWeek).add(2, 'week');
  // We want to get all the data between those two dates
  const weekData = this.data.filter((item) => moment(new Date(item.date)).isBetween(oneWeekAfterStart.toDate(), oneWeekAfterEnd.toDate()));

  //  calculate the average 1RM for this week
  const oneRM = !!weekData ? weekData.reduce((sum, cur) => sum + cur.oneRM, 0) / weekData.length : NaN;

  console.log('oneWeekAfterStart', oneWeekAfterStart.format('DD MMM'));

  //  add the new label
  this.myChart.data.labels.push(oneWeekAfterStart.format('DD MMM'));
  this.myChart.data.labels.shift();
  //  add the new data
  this.myChart.data.datasets[0].data.push(oneRM);
  this.myChart.data.datasets[0].data.shift();
  //  update the chart
  this.myChart.update();
}
  }

  switchToWeekView() {
    this.chartOptions.chosenDisplay = 'week';
    // reset chart data
    this.chartOptions.labels = [];
    this.chartOptions.finalData = [];

    const filteredData = this.filterData(this.data, 'week');
    this.refactorData(filteredData, this.chartOptions.chosenDisplay);
    this.createNewChart();
  }

  switchToMonthView() {
    this.chartOptions.chosenDisplay = 'month';

    // reset chart data
    this.chartOptions.labels = [];
    this.chartOptions.finalData = [];

    const filteredData = this.filterData(this.data, 'month');

    this.refactorData(filteredData, this.chartOptions.chosenDisplay);
    this.createNewChart();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
