import BaseWsRouter from '../../../../bases/impl/routes/BaseWsRouter';

import {IWsRoutes, TCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordWsController} from '../../cntr/controllers/ILogRecordWsController';
import {ILogRecordWsRouter} from '../../cntr/routes/ILogRecordWsRouter';

interface IConstructor {
  logRecordWsController: ILogRecordWsController;
}

export default class LogRecordWsRouter extends BaseWsRouter implements ILogRecordWsRouter {
  readonly tag: string = 'LogRecordWsRouter';
  private controller: ILogRecordWsController;

  constructor(opts: IConstructor) {
    super();
    this.controller = opts.logRecordWsController;
  }

  public get routes(): IWsRoutes {
    return {
      ['/log-records']: {
        channels: {
          1: 'logRecordsInsertChannel',
        },
        actions: {
          listenDatabase: async (channel: string, cb: TCallback) => {
            return this.controller.listenDatabase(channel, cb);
          },
          listenQueue: async (cb: TCallback) => {
            return this.controller.listenQueue(cb);
          },
        },
      },
    };
  }
}
