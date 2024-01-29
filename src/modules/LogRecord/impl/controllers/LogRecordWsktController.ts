import BaseWsktController from '../../../../bases/impl/controllers/BaseWsktController';

import {TControllerInfrastructure} from '../../../../infra';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {TCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {ILogRecordWsktController} from '../../cntr/controllers/ILogRecordWsktController';
import {ILogRecordWsktService} from '../../cntr/services/ILogRecordWsktService';

interface IConstructor extends TControllerInfrastructure {
  logRecordWsktService: ILogRecordWsktService;
}

export default class LogRecordWsktController extends BaseWsktController implements ILogRecordWsktController {
  readonly tag: string = 'LogRecordWsktController';

  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;
  private service: ILogRecordWsktService;

  constructor(opts: IConstructor) {
    super();
    this.env = opts.env;
    this.logger = opts.logger;
    this.emitter = opts.emitter;
    this.service = opts.logRecordWsktService;
  }

  public async listenDatabase(channel: string, cb: TCallback) {
    return this.service.listenDatabase(channel, cb);
  }

  public async listenQueue(cb: TCallback) {
    this.logger.debug('TEST2');
    return this.service.listenQueue(cb);
  }
}
