import {IWebSocketRoutes, TCallback} from '../../core/servers/interfaces/IWebSocketServer';
import {IWebSocketRouter} from '../ICommon';
import {ILogRecordWebSocketController} from './interfaces/ILogRecordController';

export default class LogRecordWebSocketRouter implements IWebSocketRouter {
  constructor(private controller: ILogRecordWebSocketController) {}

  public get tag() {
    return 'LogRecordWebSocketRouter';
  }

  public get routes(): IWebSocketRoutes {
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
