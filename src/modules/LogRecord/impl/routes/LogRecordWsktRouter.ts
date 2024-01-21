import BaseWsktRouter from '../../../../bases/impl/routes/BaseWsktRouter';

import {IWsRoutes, TCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {ILogRecordWsktController} from '../../cntr/controllers/ILogRecordWsktController';
import {ILogRecordWsktRouter} from '../../cntr/routes/ILogRecordWsktRouter';

interface IConstructor {
  logRecordWsktController: ILogRecordWsktController;
}

export default class LogRecordWsRouter extends BaseWsktRouter implements ILogRecordWsktRouter {
  readonly tag: string = 'LogRecordWsRouter';
  private controller: ILogRecordWsktController;

  constructor(opts: IConstructor) {
    super();
    this.controller = opts.logRecordWsktController;
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
