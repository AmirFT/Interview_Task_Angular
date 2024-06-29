import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/services/auth.guard';
import { AuthGuardPermission } from '@core/models/auth-guard-permission';
import { FullComponent } from 'app/layouts/full/full.component';


const routes: Routes = [
  // Lazy async modules
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'users-activities', loadChildren: () => import('./users/activities/activities.module').then(m => m.ActivitiesModule),
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class homeRoutingModule { }


