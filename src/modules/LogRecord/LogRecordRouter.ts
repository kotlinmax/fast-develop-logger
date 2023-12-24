import {IHttpRoute} from '../../infrastructure/servers/IHttpServer';
import {IHttpRouter} from '../ICommon';
import {ILogRecordController} from './interfaces/ILogRecordController';

export default class LogRecordRouter implements IHttpRouter {
  constructor(private controller: ILogRecordController) {}

  public get tag() {
    return 'LogRecordRouter';
  }

  public get httpRoutes(): IHttpRoute[] {
    return [
      {
        url: '/log-record',
        method: 'GET',
        constraints: {version: '1.0.0'},
        handler: this.controller.getLogRecord.bind(this.controller),
      },
      {
        url: '/log-record',
        method: 'POST',
        constraints: {version: '1.0.0'},
        handler: this.controller.createLogRecord.bind(this.controller),
      },
    ];
  }
}
