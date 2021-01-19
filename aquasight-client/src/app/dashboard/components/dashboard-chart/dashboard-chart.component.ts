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
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartComponent {
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
          yAxisID: 'flow-1',
        },
        {
          label: 'Pressure',
          backgroundColor: 'rgba(135, 130, 204,0.4)',
          borderColor: 'rgb(135, 130, 204)',
          fill: true,
          yAxisID: 'pressure-1',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
                minute: 'MM-DD-YY HH:mm a',
                hour: 'MM-DD-YY HH:mm a',
              },
            },
            gridLines: {
              display: false,
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
            id: 'flow-1',
            scaleLabel: {
              labelString: 'flow',
              display: true,
            },
            gridLines: {
              display: false,
            },
          },
          {
            type: 'linear',
            position: 'right',
            id: 'pressure-1',
            scaleLabel: {
              labelString: 'pressure',
              display: true,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
      pan: {
        enabled: true,
        mode: 'xy',
      },
      zoom: {
        enabled: true,
        drag: true,
        mode: 'xy',
      },
    },
  };

  @Input() set userSubmitData(value: DataList[]) {
    if (value) {
      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      this.chartObj['data'].datasets[0].data = value.map((obj) => {
        return {
          x: moment.utc(obj.entryTimeStamp).tz('America/New_York').toDate(),
          y: obj.flow,
        };
      });

      this.chartObj['data'].datasets[1].data = value.map((obj) => {
        return {
          x: moment.utc(obj.entryTimeStamp).tz('America/New_York').toDate(),
          y: obj.pressure,
        };
      });

      let myChart = new Chart(this.ctx, this.chartObj);
    }
  }

  constructor(public dialog: MatDialog) {}

  chartExpand() {
    this.dialog.open(ChartExpandDialog, {
      data: this.chartObj,
      width: '80vw',
      height: '70vh',
    });
  }
}

@Component({
  selector: 'chart-expand-dialog',
  template: ` <div fxLayout="row" fxLayoutAlign="space-between center">
      <div class="card-title">Expanded Chart</div>
      <button mat-icon-button color="warn" (click)="closeChart()">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <div style="width:100%;">
      <canvas
        id="myChartExpand"
        #mychartExpand
        style="width:80vw;height:60vh;"
      ></canvas>
    </div>`,
  styles: [
    `
      :host {
        display: block;
      }
      .card-title {
        padding: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
      }
    `,
  ],
})
export class ChartExpandDialog implements AfterViewInit {
  constructor(
    private dialogDef: MatDialogRef<ChartExpandDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  canvas: any;
  ctx: any;

  @ViewChild('mychartExpand') mychartExpand;

  ngAfterViewInit() {
    this.canvas = this.mychartExpand.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    let myChartExpand = new Chart(this.ctx, this.data);
  }
  closeChart() {
    this.dialogDef.close();
  }
}
