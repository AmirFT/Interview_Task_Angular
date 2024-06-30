import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from './tasks.service';
import { ITaskDetailModel } from 'app/api/models';
import { MatDialog } from '@angular/material/dialog';

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

  bug: ITaskDetailModel[] = []



  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,

  ) {

    this.tasksService.onTasksChanged.subscribe(x => {
      console.log(x.model);  // Add this line to check the data
      // this.dataSource.data = x.model;

      x.model.forEach(e => {
        if (e.status == 0) {
          this.bug = e.details
        } else if (e.status == 1) {
          this.todo = e.details
        } else if (e.status == 2) {
          this.doing = e.details
        } else if (e.status == 3) {
          this.done = e.details
        }
      });
    })

    tasksService.loadTasks();

  }


  // openDialog(action: string, obj: any): void {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(AppContactDialogContentComponent, {
  //     data: obj,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result.event === 'Add') {
  //       this.addContact(result.data);
  //     }
  //   });
  // }


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
      case 'bugList':
        return 0;
      default:
        return 0;
    }
  }


}
