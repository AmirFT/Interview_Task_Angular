import { Injectable } from '@angular/core';

import { ApiBaseService } from './api-base.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDashboardSummeryModel } from '../models/dashboardSummery';


@Injectable()
export class ApiDashboardService extends ApiBaseService {



  getSummary(): Observable<IDashboardSummeryModel> {
    return this.http
      .get(`${this.url}Dashboard/Summery`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
