import BaseWsRouter from '../../../../bases/impl/routes/BaseWsRouter';
import {IWsRoutes, TCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordWsController} from '../../cntr/controllers/ILogRecordWsController';
import {ILogRecordWsRouter} from '../../cntr/routes/ILogRecordWsRouter';

export default class LogRecordWsRouter extends BaseWsRouter implements ILogRecordWsRouter {
  readonly tag: string = 'LogRecordWsRouter';

  constructor(private controller: ILogRecordWsController) {
    super();
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
