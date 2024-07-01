import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployeeModel, ITaskModel } from 'app/api/models';
import { MaterialModule } from 'app/material.module';
import { UsersService } from '../../users/users.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  employees: IEmployeeModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private usersService: UsersService,
    private tasksService: TasksService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {
      value: any,
      action: 'create' | 'update'
    }
  ) {
    // console.log(data);
    this.local_data = { ...data.value };
    this.action = data.action;
    debugger
    console.warn(this.local_data.priority);
    this.usersService.onEmployeeChanged.subscribe(x => {
      console.log(x.model);  // Add this line to check the data
      this.employees = x.model;
    })

    usersService.loadUsers();

  }

  doAction(isUpdate: boolean): void {
    if (isUpdate) {
      this.tasksService.updateTask(this.local_data.title, this.local_data.description, parseInt(this.local_data.assignedUserId), parseInt(this.local_data.priority),parseInt(this.local_data.id)).then(() => {
        this.dialogRef.close();
      }, error => {
        this.dialogRef.close();
      });
    }
    else {
      this.tasksService.createTask(this.local_data.title, this.local_data.description, parseInt(this.local_data.assignedUserId), parseInt(this.local_data.priority)).then(() => {
        this.dialogRef.close();
      }, error => {
        this.dialogRef.close();
      });
    }

  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
