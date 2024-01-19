import BaseHttpRouter from '../../../../bases/impl/routes/BaseHttpRouter';

import {IHttpRoute} from '../../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordHttpController} from '../../cntr/controllers/ILogRecordHttpController';
import {ILogRecordHttpRouter} from '../../cntr/routes/ILogRecordHttpRouter';

interface IConstructor {
  logRecordHttpController: ILogRecordHttpController;
}

export default class LogRecordHttpRouter extends BaseHttpRouter implements ILogRecordHttpRouter {
  readonly tag: string = 'LogRecordHttpRouter';
  private controller: ILogRecordHttpController;

  constructor(opts: IConstructor) {
    super();
    this.controller = opts.logRecordHttpController;
  }

  public get routes(): IHttpRoute[] {
    return [
      {
        url: '/log-records',
        method: 'GET',
        constraints: {version: '1.0.0'},
        handler: this.controller.getLogRecord.bind(this.controller),
      },
      {
        url: '/log-records',
        method: 'POST',
        constraints: {version: '1.0.0'},
        handler: this.controller.createLogRecord.bind(this.controller),
      },
    ];
  }
}
