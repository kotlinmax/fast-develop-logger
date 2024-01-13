import {TCallback, TWsSubscribeCallback} from '../../../../infra/servers/cnrt/IWsServer';

export interface ILogRecordWsController {
  listenDatabase: TWsSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
}
