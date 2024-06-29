import { NgModule } from '@angular/core';

// import { SharedModule } from '@lib/shared.module';
import { MatButtonModule } from '@angular/material/button';

import { ErrorsRoutingModule } from './errors-routing.module';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    PageNotFoundComponent
  ],
  imports: [
    // SharedModule,
    MatButtonModule,

    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
