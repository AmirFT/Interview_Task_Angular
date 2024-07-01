import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IEmployeeModel, ITaskModel } from 'app/api/models';
import { ApiUsersService } from 'app/api/services';
import { ApiTaskService } from 'app/api/services/api-tasks.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService implements Resolve<any> {

  private tasks: ITaskModel[] = [];
  onTasksChanged: BehaviorSubject<{ model: ITaskModel[], loading: boolean }>;

  private employees: IEmployeeModel[] = [];
  onEmployeeChanged: BehaviorSubject<{ model: IEmployeeModel[], loading: boolean }>;


  constructor(
    private apiTaskService: ApiTaskService,
    private apiUsersService: ApiUsersService,

  ) {
    this.onTasksChanged = new BehaviorSubject({ model: [], loading: true });
    this.onEmployeeChanged = new BehaviorSubject({ model: [], loading: true });

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
  loadTasks(userId: number): Promise<boolean> {
    this.onTasksChanged.next({ model: this.tasks, loading: false });

    return new Promise((resolve, reject) => {
      this.apiTaskService.list(userId).subscribe(
        response => {
          this.tasks = response;
          this.onTasksChanged.next({ model: response, loading: false });
          resolve(true);
        }, reject
      );
    });
  }

  loadUsers(): Promise<boolean> {
    this.onEmployeeChanged.next({ model: this.employees, loading: false });

    return new Promise((resolve, reject) => {
      this.apiUsersService.list().subscribe(
        response => {
          this.employees = response;
          this.onEmployeeChanged.next({ model: response, loading: false });
          resolve(true);
        }, reject
      );
    });
  }

  changeStatus(id: number, status: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiTaskService.updateStatus(id, status).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.loadTasks(0);
            resolve(true);
          }
        }, reject
      );
    });
  }

  createTask(title: string, description: string, assignedUserId: number, priority: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiTaskService.createTask(title, description, assignedUserId, priority).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.loadTasks(0);
            resolve(true);
          }
        }, reject
      );
    });
  }

  updateTask(title: string, description: string, assignedUserId: number, priority: number, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiTaskService.updateTask(title, description, assignedUserId, priority,id).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.loadTasks(0);
            resolve(true);
          }
        }, reject
      );
    });
  }
}
