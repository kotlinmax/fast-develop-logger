import {TCallback, TWsktSubscribeCallback} from '../../../../infra/servers/cnrt/IWsktServer';

export interface ILogRecordWsktController {
  listenDatabase: TWsktSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
}
