import BaseWsController from '../../../../bases/impl/controllers/BaseWsController';

import {TCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordWsController} from '../../cntr/controllers/ILogRecordWsController';
import {ILogRecordWsService} from '../../cntr/services/ILogRecordWsService';

export default class LogRecordWsController extends BaseWsController implements ILogRecordWsController {
  readonly tag: string = 'LogRecordWsController';

  constructor(private service: ILogRecordWsService) {
    super();
  }

  public async listenDatabase(channel: string, cb: TCallback) {
    return this.service.listenDatabase(channel, cb);
  }

  public async listenQueue(cb: TCallback) {
    return this.service.listenQueue(cb);
  }
}
