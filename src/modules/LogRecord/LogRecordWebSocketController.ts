import {TCallback} from '../../core/servers/interfaces/IWebSocketServer';
import {ILogRecordWebSocketController} from './interfaces/ILogRecordController';
import {ILogRecordService} from './interfaces/ILogRecordService';

export default class LogRecordWebSocketController implements ILogRecordWebSocketController {
  constructor(private service: ILogRecordService) {}

  public get tag() {
    return 'LogRecordWebSocketController';
  }

  public async listenDatabase(channel: string, cb: TCallback) {
    return this.service.listenDatabase(channel, cb);
  }

  public async listenQueue(cb: TCallback) {
    return this.service.listenQueue(cb);
  }
}
