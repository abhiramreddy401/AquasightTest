import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DataList, StoreUser } from '../Models';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  userObj: StoreUser;
  dataUser:DataList[];
  constructor(private route: Router,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(localStorage.getItem('userLogin'));
    this.getData();
    console.log(this.userObj);
  }

  createValue(value: object) {
    console.log(value);


    const createRowValue = {
      ...value,
      userId: this.userObj.email
    }




    this.dashboardService
      .saveFlowUser(createRowValue, this.userObj.token)
      .pipe(
        finalize(() => {
          // this.route.navigateByUrl('/dashboard');
        })
      )
      .subscribe(
        (res) => {
         if(res.status >= 400){
          console.log("try again later")
         }else {
          this.getData();
         }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getData(){
    this.dashboardService
    .getFlowById(this.userObj)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe(
      (res:DataList[]) => {
        console.log("get data:" + res);
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
