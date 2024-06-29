import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { homeRoutingModule } from './home-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
  ],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    DragDropModule,
    homeRoutingModule
  ],
  providers: [
  ]
})
export class homeModule { }

