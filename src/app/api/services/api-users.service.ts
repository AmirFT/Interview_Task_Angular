import { Injectable } from '@angular/core';

import { ApiBaseService } from './api-base.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployeeModel } from '../models';
import { IUserActivitiesModel } from '../models/UserActivities';


@Injectable()
export class ApiUsersService extends ApiBaseService {



  list(): Observable<IEmployeeModel[]> {
    return this.http
      .get(`${this.url}Employee/List`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
