import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'accessDenied',
    component: AccessDeniedComponent,
    data: [{ PageTitle: 'ERROR' }]
  },
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent,
    data: [{ PageTitle: 'ERROR' }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
