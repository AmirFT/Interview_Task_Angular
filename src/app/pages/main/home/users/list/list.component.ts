import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IUserModel } from 'app/api/models';
import { ApiUsersService } from 'app/api/services';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],

})
export class ListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['uid', 'firstName', 'lastName', 'logins','incomes', 'expenses', 'isApple', 'registerDateTime'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: IUserModel | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  dataSourceLoading: boolean;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private apiUsersService: ApiUsersService,
  ) {


    this.usersService.onUsersChanged.subscribe(x => {
      this.dataSource.data = x.model;
      this.dataSource.sort = this.sort;
      this.dataSourceLoading = x.loading;
    })

    usersService.loadUsers();

  }
  ngOnInit(): void {

  }

  showActivities(user: IUserModel) {
    //          this.onUsersChanged.next({ model: response, loading: false });
    console.log(user)
    this.usersService.setUserId(user.userId);
    this.router.navigateByUrl('/panel/home/users/activities');

  }
}


