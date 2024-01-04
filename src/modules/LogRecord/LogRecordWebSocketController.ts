// src/controllers/LogRecordController.ts

import {ILogRecordWebSocketController} from './interfaces/ILogRecordController';
import {ILogRecordService} from './interfaces/ILogRecordService';

export default class LogRecordControllerWS implements ILogRecordWebSocketController {
  constructor(private logRecordService: ILogRecordService) {}

  public get tag() {
    return 'LogRecordControllerWS';
  }

  public async getSingleLogRecordFromStream(): Promise<any> {
    console.log('test');
    return {data: 'privet'};
  }
}
