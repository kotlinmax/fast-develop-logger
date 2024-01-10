import BaseHttpRouter from '../../../bases/impl/BaseHttpRouter';

import {IHttpRoute} from '../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordHttpController} from '../cntr/ILogRecordHttpController';
import {ILogRecordHttpRouter} from '../cntr/ILogRecordHttpRouter';

export default class LogRecordHttpRouter extends BaseHttpRouter implements ILogRecordHttpRouter {
  readonly tag: string = 'LogRecordHttpRouter';

  constructor(private controller: ILogRecordHttpController) {
    super();
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
