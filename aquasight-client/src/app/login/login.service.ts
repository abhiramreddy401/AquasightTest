import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  register: () =>
    `http://aquasightapi-env.eba-qajjqnaa.us-east-2.elasticbeanstalk.com/register`,
  login: () =>
    `http://aquasightapi-env.eba-qajjqnaa.us-east-2.elasticbeanstalk.com/authenticate`,
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  registerUser(payload: any): Observable<any> {
    return this.httpClient.post(routes.register(), payload).pipe(
      map((res: any) => res),
      catchError((error) => of(error))
    );
  }

  authUser(payload: any): Observable<any> {
    return this.httpClient.post(routes.login(), payload).pipe(
      map((res: any) => res),
      catchError((error) => of(error))
    );
  }
}
