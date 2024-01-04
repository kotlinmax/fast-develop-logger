import {TWebSocketCallback} from '../../infrastructure/servers/interfaces/IWebSocketServer';
import {ILogRecordWebSocketController} from './interfaces/ILogRecordController';
import {ILogRecordService} from './interfaces/ILogRecordService';

export default class LogRecordWebSocketController implements ILogRecordWebSocketController {
  constructor(private service: ILogRecordService) {}

  public get tag() {
    return 'LogRecordControllerWS';
  }

  public async subscribeDatabaseNotification(channel: string, cb: TWebSocketCallback) {
    return this.service.subscribeDatabaseNotification(channel, cb);
  }
}
