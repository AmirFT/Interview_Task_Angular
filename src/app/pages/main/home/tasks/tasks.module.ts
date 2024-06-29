import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Routes, RouterModule } from "@angular/router";
import { from } from "rxjs";
import { SharedModule } from "@lib/shared.module";
import { StatePageModule } from "app/components/state-page";
import { MaterialModule } from "app/material.module";
import { CommonModule } from "@angular/common";
import { TasksComponent } from "./tasks.component";
import { TasksService } from "./tasks.service";


const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },

];

@NgModule({
  imports: [
    ScrollingModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatRippleModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    SharedModule,
    StatePageModule,
    MaterialModule,
    CommonModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    TasksComponent,
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule { }
