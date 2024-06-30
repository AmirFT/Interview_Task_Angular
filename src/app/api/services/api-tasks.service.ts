import { Injectable } from '@angular/core';

import { ApiBaseService } from './api-base.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployeeModel, ITaskModel } from '../models';


@Injectable()
export class ApiTaskService extends ApiBaseService {



  list(): Observable<ITaskModel[]> {
    return this.http
      .post(`${this.url}Task/List`, { UserId: 0 })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  updateStatus(id: number, status: number): Observable<any> {
    return this.http
      .put(`${this.url}Task/UpdateStatus`, { Status: status, Id: id })
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
