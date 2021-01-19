import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DataList, StoreUser } from '../Models';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userObj: StoreUser;
  dataUser: DataList[];
  pending: boolean = false;
  constructor(
    private route: Router,
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userObj = JSON.parse(localStorage.getItem('userLogin'));
    this.getData();
    console.log(this.userObj);
  }

  createValue(value: object) {
    console.log(value);

    const createRowValue = {
      ...value,
      userId: this.userObj.email,
    };
    this.pending = true;

    this.dashboardService
      .saveFlowUser(createRowValue, this.userObj.token)
      .pipe(
        finalize(() => {
          this.pending = false;
        })
      )
      .subscribe(
        (res) => {
          if (res.status >= 400) {
            this._snackBar.open('unavle add form values', 'close', {
              duration: 2000,
            });
          } else {
            this._snackBar.open('Form values are added', 'close', {
              duration: 2000,
            });
            this.getData();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getData() {
    this.dashboardService
      .getFlowById(this.userObj)
      .pipe(finalize(() => {}))
      .subscribe(
        (res: DataList[]) => {
          console.log('get data:' + res);
          this.dataUser = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onLogout(ev): void {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
