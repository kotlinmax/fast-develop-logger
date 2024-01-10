import BaseWsController from '../../../bases/impl/BaseWsController';

import {TCallback} from '../../../infra/servers/cnrt/IWsServer';
import {ILogRecordWsController} from '../cntr/ILogRecordWsController';
import {ILogRecordService} from '../cntr/ILogRecordService';

export default class LogRecordWsController extends BaseWsController implements ILogRecordWsController {
  readonly tag: string = 'LogRecordWsController';

  constructor(private service: ILogRecordService) {
    super();
  }

  public async listenDatabase(channel: string, cb: TCallback) {
    return this.service.listenDatabase(channel, cb);
  }

  public async listenQueue(cb: TCallback) {
    return this.service.listenQueue(cb);
  }
}
