import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from './tasks.service';
import { IEmployeeModel, ITaskDetailModel, ITaskModel } from 'app/api/models';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {


  todo: ITaskDetailModel[] = []
  doing: ITaskDetailModel[] = []
  done: ITaskDetailModel[] = []
  justCreated: ITaskDetailModel[] = []
  allTask: ITaskModel[] = []

  employee: IEmployeeModel[] = [];



  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
    public dialog: MatDialog,

  ) {

    this.usersService.onEmployeeChanged.subscribe(x => {
      console.log(x.model);  // Add this line to check the data
      this.employee = x.model;
    })

    usersService.loadUsers();

    this.tasksService.onTasksChanged.subscribe(x => {

      this.justCreated = [];
      this.todo = [];
      this.doing = [];
      this.done = [];
      this.allTask = x.model;
      x.model.forEach(e => {
        if (e.status == 0) {
          this.justCreated = e.details
        } else if (e.status == 1) {
          this.todo = e.details
        } else if (e.status == 2) {
          this.doing = e.details
        } else if (e.status == 3) {
          this.done = e.details
        }
      });
    })

    this.loadTasks()

  }

  loadTasks(userId: number = 0) {
    this.tasksService.loadTasks(userId);
  }

  openDialog(action: string, obj: any, task: ITaskDetailModel): void {
    obj.action = action;
    obj.value = task;
    // taskId == null ? null : this.allTask.find(f => {
    //   f.details.forEach(element => {
    //     element.id == taskId
    //   });
    // })

    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: obj,
    });

  }


  drop(event: CdkDragDrop<any[]>) {
    const item = event.item.data;
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (previousContainer !== currentContainer) {
      // Remove the item from the previous list
      previousContainer.data.splice(event.previousIndex, 1);
      // Add the item to the new list
      currentContainer.data.splice(event.currentIndex, 0, item);

      // Send the update to the API
      const newStatus = this.getStatusFromContainerId(currentContainer.id);
      debugger
      this.tasksService.changeStatus(item.id, newStatus);
    }
  }

  getStatusFromContainerId(containerId: string): number {
    switch (containerId) {
      case 'todoList':
        return 1;
      case 'doingList':
        return 2;
      case 'doneList':
        return 3;
      case 'justCreatedList':
        return 0;
      default:
        return 0;
    }
  }


}
