import {IHttpRoute} from '../../core/servers/interfaces/IHttpServer';
import {IHttpRouter} from '../ICommon';
import {ILogRecordHttpController} from './interfaces/ILogRecordController';

export default class LogRecordHttpRouter implements IHttpRouter {
  constructor(private controller: ILogRecordHttpController) {}

  public get tag() {
    return 'LogRecordRouter';
  }

  public get routes(): IHttpRoute[] {
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
