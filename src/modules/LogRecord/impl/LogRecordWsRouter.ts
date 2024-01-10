import BaseWsRouter from '../../../bases/impl/BaseWsRouter';
import {IWsRoutes, TCallback} from '../../../infra/servers/cnrt/IWsServer';
import {ILogRecordWsController} from '../cntr/ILogRecordWsController';
import {ILogRecordWsRouter} from '../cntr/ILogRecordWsRouter';

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
