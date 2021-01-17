import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataList, StoreUser } from '../Models';

const routes = {
  saveFlow: () =>
    `http://aquasightapi-env.eba-qajjqnaa.us-east-2.elasticbeanstalk.com/saveFlow`,
  getDataById: (id:string) =>
    `http://aquasightapi-env.eba-qajjqnaa.us-east-2.elasticbeanstalk.com/getFlowByUserId?userId=${id}`,
};


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  saveFlowUser(payload: any, token: string): Observable<any> {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`

    })
    return this.httpClient.post(routes.saveFlow(), payload, { headers: httpHeaders }).pipe(
      map((res: any) => res),
      catchError((error) => of(error))
    );
  }

  getFlowById(userData:StoreUser): Observable<DataList[]> {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`

    })
    return this.httpClient.get(routes.getDataById(userData.email),{ headers: httpHeaders }).pipe(
      map((res: DataList[]) => res),
      catchError((error) => of(error))
    );
  }
}
