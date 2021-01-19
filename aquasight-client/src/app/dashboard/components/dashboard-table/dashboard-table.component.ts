import { Input } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataList } from 'src/app/Models';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTableComponent {
  displayedColumns = ['entryTimeStamp', 'flow', 'pressure'];
  dataSource: MatTableDataSource<DataList>;

  @Input() set userSubmitData(value: DataList[]) {
    if (value) {
      this.dataSource = new MatTableDataSource<DataList>(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  formatTimeDate(date) {
    return moment.utc(date).tz('America/New_York').format('MM-DD-YYYY hh:mm a');
  }
}
