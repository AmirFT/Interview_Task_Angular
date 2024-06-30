import { NgModule } from '@angular/core';

import { mainRoutingModule } from './main-routing.module';

import { RedirectComponent } from './_redirect/redirect.component';
import { ApiDashboardService } from 'app/api/services/api-dashboard.service';
import { ApiUsersService } from 'app/api/services';
import { ApiTaskService } from 'app/api/services/api-tasks.service';
// import { SharedModule } from '@lib/shared.module';

@NgModule({
  declarations: [
    RedirectComponent
  ],
  imports: [
    mainRoutingModule
  ],
  providers: [
    ApiDashboardService,
    ApiUsersService,
    ApiTaskService
  ]
})
export class mainModule { }
