import {IWebSocketRoutes, TWebSocketCallback} from '../../infrastructure/servers/interfaces/IWebSocketServer';
import {IWebSocketRouter} from '../ICommon';
import {ILogRecordWebSocketController} from './interfaces/ILogRecordController';

export default class LogRecordWebSocketRouter implements IWebSocketRouter {
  constructor(private controller: ILogRecordWebSocketController) {}

  public get tag() {
    return 'LogRecordWebSocketRouter';
  }

  public get routes(): IWebSocketRoutes {
    return {
      ['/log-record']: {
        subscribeDatabaseNotification: async (channel: string, cb: TWebSocketCallback) => {
          return this.controller.subscribeDatabaseNotification(channel, cb);
        },
      },
    };
  }
}
