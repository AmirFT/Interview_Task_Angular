import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { NgFor } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { ApiDashboardService } from 'app/api/services/api-dashboard.service';
import { Router } from '@angular/router';
import { DashboardService } from 'app/pages/main/home/dashboard/dashboard.service';

interface topcards {
  id: number;
  img: string;
  color: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-top-cards',
  standalone: true,
  imports: [MaterialModule, NgFor],
  templateUrl: './top-cards.component.html',
})
export class AppTopCardsComponent  {
  topcards: topcards[] = []





  constructor(
    private router: Router,
    private authService: AuthService,
    // private alertService: AlertService,
    private apiDashboardService: ApiDashboardService,
    // protected configService: ConfigService,
    private dashboardService: DashboardService,

  ) {
    this.dashboardService.onSummeryChanged.subscribe(x => {
      this.topcards = [
        {
          id: 1,
          color: 'primary',
          img: '/assets/images/svgs/icon-user-male.svg',
          title: 'User',
          subtitle: x.model.totalUsers.toString(),
        },
        {
          id: 2,
          color: 'warning',
          img: '/assets/images/svgs/icon-briefcase.svg',
          title: 'New User',
          subtitle: x.model.todaysRegistrationsCount.toString(),
        },
        {
          id: 3,
          color: 'accent',
          img: '/assets/images/svgs/icon-mailbox.svg',
          title: 'Paywall View',
          subtitle: x.model.paywallView.toString(),
        },
        {
          id: 4,
          color: 'success',
          img: '/assets/images/svgs/icon-speech-bubble.svg',
          title: 'Users/Apple',
          subtitle: x.model.usersPercentage.toFixed(2).toString(),
        }
      ];

    });

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------



  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  // /**
  //  * load Build Status
  //  */
  // loadBuildStatus(): void {
  //   this.isCashAmountLoading = true;
  //   this.apiDashboardService.getBuildStatus(this.cashId.value).subscribe(result => {
  //     this.cashAmount = result?.cashAmount;
  //     this.isCashAmountLoading = false;
  //   }, error => { this.alertService.error(error.error); });
  // }







}
