import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/services/auth.guard';
import { AuthGuardPermission } from '@core/models/auth-guard-permission';


import { RedirectComponent } from './_redirect/redirect.component';

const routes: Routes = [
  // Lazy async modules
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.homeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'redirect', component: RedirectComponent ,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mainRoutingModule { }
