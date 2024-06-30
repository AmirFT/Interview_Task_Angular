import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  animations: []

})
export class ListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['id', 'name', 'isManager'];
  dataSourceLoading: boolean;

  constructor(
    private usersService: UsersService,
  ) {
    this.usersService.onEmployeeChanged.subscribe(x => {
      console.log(x.model);  // Add this line to check the data
      this.dataSource.data = x.model;
    })

    usersService.loadUsers();

  }

  ngOnInit(): void {

  }


}


