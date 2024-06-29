import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { homeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    // SharedModule,
    homeRoutingModule
  ],
  providers: [
    // AlertService,
    // FilterService,
    // StaticService,
    // ExcelService,
  ]
})
export class homeModule { }

