import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IUserActivitiesModel, IUserModel } from 'app/api/models';
import { ApiUsersService } from 'app/api/services/api-users.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UsersService implements Resolve<any> {

  private userId = '';
  private users: IUserModel[] = [];
  private userActivities: IUserActivitiesModel[] = [];
  onUsersChanged: BehaviorSubject<{ model: IUserModel[], loading: boolean }>;
  onUserIdChanged: BehaviorSubject<{ model: string, loading: boolean }>;
  onUserActivitiesChanged: BehaviorSubject<{ model: IUserActivitiesModel[], loading: boolean }>;


  constructor(
    private apiUsersService: ApiUsersService,
  ) {
    this.onUserIdChanged = new BehaviorSubject({ model: "", loading: true });
    this.onUsersChanged = new BehaviorSubject({ model: [], loading: true });
    this.onUserActivitiesChanged = new BehaviorSubject({ model: [], loading: false });

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
      this.onUsersChanged.next({ model: this.users, loading: false });

      return new Promise((resolve, reject) => {
        this.apiUsersService.list().subscribe(
          response => {
            this.users = response;
            this.onUsersChanged.next({ model: response, loading: false });
            resolve(true);
          }, reject
        );
      });
    }



  setUserId(userId: string) {
    this.userId = userId;
    this.onUserIdChanged.next({ model: this.userId, loading: false });
  }



}
