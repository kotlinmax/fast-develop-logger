import BaseWsktRouter from '../../../../bases/impl/routes/BaseWsktRouter';
import {ILogger} from '../../../../infra/logger/ILogger';

import {IWsRoutes, TCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {ILogRecordWsktController} from '../../cntr/controllers/ILogRecordWsktController';
import {ILogRecordWsktRouter} from '../../cntr/routes/ILogRecordWsktRouter';

interface IConstructor {
  logRecordWsktController: ILogRecordWsktController;
  logger: ILogger;
}

export default class LogRecordWsRouter extends BaseWsktRouter implements ILogRecordWsktRouter {
  readonly tag: string = 'LogRecordWsRouter';
  private controller: ILogRecordWsktController;
  private logger: ILogger;

  constructor(opts: IConstructor) {
    super();
    this.controller = opts.logRecordWsktController;
    this.logger = opts.logger;
  }

  public get routes(): IWsRoutes {
    return {
      ['/log-records']: {
        channels: {
          1: 'logRecordsInsertChannel',
        },
        actions: {},
        listeners: {
          listenDatabase: async (channel: string, cb: TCallback) => {
            return this.controller.listenDatabase(channel, cb);
          },
          listenQueue: async (cb: TCallback) => {
            this.logger.debug('TEST');
            return this.controller.listenQueue(cb);
          },
        },
      },
    };
  }
}
