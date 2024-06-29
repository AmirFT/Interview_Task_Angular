import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IDashboardSummeryModel } from 'app/api/models/dashboardSummery';
import { ApiDashboardService } from 'app/api/services/api-dashboard.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DashboardService implements Resolve<IDashboardSummeryModel> {


  onSummeryChanged: BehaviorSubject<{ model: IDashboardSummeryModel, loading: boolean }>;


  constructor(
    private apiDashboardService: ApiDashboardService,
  ) {
    this.onSummeryChanged = new BehaviorSubject({ model: null, loading: true });
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
  loadSummaryStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiDashboardService.getSummary().subscribe(
        response => {
          // fix date
          this.onSummeryChanged.next({ model: response, loading: false });
          resolve(true);
        }, reject
      );
    });
  }



}
