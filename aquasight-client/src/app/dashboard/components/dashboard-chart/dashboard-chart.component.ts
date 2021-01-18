import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { Chart } from 'chart.js';
import { DataList } from 'src/app/Models';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;

  @ViewChild('mychart') mychart;


  chartObj: object = {
    type: 'line',

    data: {
      datasets: [
        {
          label: 'Flow',
          backgroundColor: 'rgba(255, 99, 132,0.4)',
          borderColor: 'rgb(255, 99, 132)',
          fill: true,
          yAxisID: 'flow-1'
        },
        {
          label: 'Pressure',
          backgroundColor: 'rgba(135, 130, 204,0.4)',
          borderColor: 'rgb(135, 130, 204)',
          fill: true,
          yAxisID: 'pressure-1'
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
       
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            position: 'bottom',
            distribution: 'series',
            time: {
              parser: 'MM-DD-YY HH:mm a',
              unit: 'minute',
              displayFormats: {
                  'minute': 'MM-DD-YY HH:mm a',
                  'hour': 'MM-DD-YY HH:mm a'
              }
          },
          gridLines: {
            display:false
        },


            scaleLabel: {
              labelString: 'Time Stamp',
              display: true,
            },
          },
        ],
        yAxes: [
          {
            type: 'linear',
            id: "flow-1",
            scaleLabel: {
              labelString: 'flow',
              display: true,
            },
            gridLines: {
              display:false
          }
          },
          {
            type: 'linear',
            position: 'right',
            id: "pressure-1",
            scaleLabel: {
              labelString: 'pressure',
              display: true,
            },
            gridLines: {
              display:false
          }
          },
        ],
      },
      pan: {
        enabled: true,
        mode: "xy",
       },
      zoom: {
        enabled: true,
        drag: true,
        mode: "xy",
      }
    },
  }


  @Input() set userSubmitData(value: DataList[]) {

    if (value) {

      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');


      this.chartObj['data'].datasets[0].data = value.map((obj) => {

        return {
          x: moment.utc(obj.entryTimeStamp).tz('America/New_York').toDate(),
          y: obj.flow
        }
      })

      this.chartObj['data'].datasets[1].data = value.map((obj) => {

        return {
          x: moment.utc(obj.entryTimeStamp).tz('America/New_York').toDate(),
          y: obj.pressure
        }
      })

      let myChart = new Chart(this.ctx, this.chartObj);




    }



  }

  ngAfterViewInit() {
    // this.canvas = this.mychart.nativeElement;
    // this.ctx = this.canvas.getContext('2d');
    // console.log(this.chartObj);
    // let myChart = new Chart(this.ctx, this.chartObj);
  }
  constructor() { }

  ngOnInit(): void { }
}
