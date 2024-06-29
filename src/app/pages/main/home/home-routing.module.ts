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
  {
    path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class homeRoutingModule { }


