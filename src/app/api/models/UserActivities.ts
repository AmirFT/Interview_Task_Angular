export interface IUserActivitiesModel {
  id: number;
  created: string;
  duration: number;
  actionName: string;
  requestName: string;
  agentName: string;
  userId: string;
  email: string;
  requestMethod: string;
  outputResult: string;
  clientIp: string;
  inputParameters: string;
  schemeData: string;
  isSuccess: boolean;
  typeName: string;
}
