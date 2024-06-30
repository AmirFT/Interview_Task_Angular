export interface ITaskModel {
  status: number
  details: ITaskDetailModel[]
}

export interface ITaskDetailModel {
  id: number;
  title: string;
  description: string;
  priority: number;
  employee: ITaskDetailModel[]
}

export interface ITaskEmployee {
  id: number;
  name: string;
  isManager: boolean
}
