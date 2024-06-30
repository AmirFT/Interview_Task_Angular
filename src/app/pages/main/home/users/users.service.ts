import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IUserActivitiesModel, IEmployeeModel } from 'app/api/models';
import { ApiUsersService } from 'app/api/services/api-users.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UsersService implements Resolve<any> {

  private employees: IEmployeeModel[] = [];
  onEmployeeChanged: BehaviorSubject<{ model: IEmployeeModel[], loading: boolean }>;


  constructor(
    private apiUsersService: ApiUsersService,
  ) {
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




}
