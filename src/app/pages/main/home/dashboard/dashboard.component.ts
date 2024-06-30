import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AppCustomersComponent } from 'app/components/dashboard1/customers/customers.component';
import { AppEmployeeSalaryComponent } from 'app/components/dashboard1/employee-salary/employee-salary.component';
import { AppMonthlyEarningsComponent } from 'app/components/dashboard1/monthly-earnings/monthly-earnings.component';
import { AppProjectsComponent } from 'app/components/dashboard1/projects/projects.component';
import { AppRevenueUpdatesComponent } from 'app/components/dashboard1/revenue-updates/revenue-updates.component';
import { AppSellingProductComponent } from 'app/components/dashboard1/selling-product/selling-product.component';
import { AppSocialCardComponent } from 'app/components/dashboard1/social-card/social-card.component';
import { AppTopCardsComponent } from 'app/components/dashboard1/top-cards/top-cards.component';
import { AppTopProjectsComponent } from 'app/components/dashboard1/top-projects/top-projects.component';
import { AppWeeklyStatsComponent } from 'app/components/dashboard1/weekly-stats/weekly-stats.component';
import { AppYearlyBreakupComponent } from 'app/components/dashboard1/yearly-breakup/yearly-breakup.component';
import { AppProductsComponent } from 'app/components/dashboard2/products/products.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ TablerIconsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
  ) {


  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // super.ngOnInit();
  }

}

