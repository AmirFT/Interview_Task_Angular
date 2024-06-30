import { Injectable } from '@angular/core';

import { ApiBaseService } from './api-base.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployeeModel, ITaskModel } from '../models';


@Injectable()
export class ApiTaskService extends ApiBaseService {



  list(userId: number): Observable<ITaskModel[]> {
    return this.http
      .post(`${this.url}Task/List`, { UserId: userId })
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

  createTask(title: string, description: string, assignedUserId: number, priority: number): Observable<any> {
    return this.http
      .post(`${this.url}Task/Create`, { title, description, assignedUserId, priority }) //TODO::  ˝convert string number to number
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
