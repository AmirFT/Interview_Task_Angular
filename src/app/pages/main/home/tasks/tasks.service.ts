import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ITaskModel } from 'app/api/models';
import { ApiTaskService } from 'app/api/services/api-tasks.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService implements Resolve<any> {

  private tasks: ITaskModel[] = [];
  onTasksChanged: BehaviorSubject<{ model: ITaskModel[], loading: boolean }>;


  constructor(
    private apiTaskService: ApiTaskService,
  ) {
    this.onTasksChanged = new BehaviorSubject({ model: [], loading: true });

  }

  /**
   * resolve
   * @returns Observable<any> | Promise<any> | any
   */
  resolve(): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  /**
  * load Build Status
  */
  loadTasks(): Promise<boolean> {
    this.onTasksChanged.next({ model: this.tasks, loading: false });

    return new Promise((resolve, reject) => {
      this.apiTaskService.list().subscribe(
        response => {
          this.tasks = response;
          this.onTasksChanged.next({ model: response, loading: false });
          resolve(true);
        }, reject
      );
    });
  }


  changeStatus(id: number, status: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiTaskService.updateStatus(id,status).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.loadTasks();
            resolve(true);
          }
        }, reject
      );
    });
  }
}
