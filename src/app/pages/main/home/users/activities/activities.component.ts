import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiUsersService } from 'app/api/services';
import { UsersService } from '../users.service';
import { MatSort } from '@angular/material/sort';
import { IUserActivitiesModel } from 'app/api/models';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activities',
  // standalone: true,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', overflowX: 'auto' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  // imports: [MaterialModule, CommonModule, SharedModule, RouterModule, TableVirtualScrollModule]
})

export class ActivitiesComponent implements OnInit {
  displayedColumns: string[] = ['actionName', 'typeName', 'requestMethod', 'duration', 'created'];
  dataSource = new MatTableDataSource();
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: IUserActivitiesModel | null = null;
  dataSourceLoading: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  search = new FormControl('');
  form = new FormGroup({
    search: this.search
  })
  constructor(
    private usersService: UsersService,
    private router: Router,
    private apiUsersService: ApiUsersService,
  ) {


    this.usersService.onUserActivitiesChanged.subscribe(x => {
      x.model.forEach(element => {
        element.outputResult = this.formatJson(element.outputResult);
        element.inputParameters = this.formatJson(element.inputParameters);
      });
      this.dataSource.data = x.model;
      this.dataSource.sort = this.sort;
      this.dataSourceLoading = x.loading

    })

    const model = this.usersService.onUserIdChanged.value ;

    this.search.setValue(model.model);
    this.usersService.loadUsersActivities(model.model);




  }

  private formatJson(jsonString: string): string {
    return jsonString.replace(/,/g, ',\n');
  }

  loadActivities(event: Event) {
    this.usersService.loadUsersActivities((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.search.setValue('');
    this.usersService.setUserId('');
  }
}

