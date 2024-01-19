import BaseWsController from '../../../../bases/impl/controllers/BaseWsController';

import {TControllerInfrastructure} from '../../../../infra';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {TCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordWsController} from '../../cntr/controllers/ILogRecordWsController';
import {ILogRecordWsService} from '../../cntr/services/ILogRecordWsService';

interface IConstructor extends TControllerInfrastructure {
  logRecordWsService: ILogRecordWsService;
}

export default class LogRecordWsController extends BaseWsController implements ILogRecordWsController {
  readonly tag: string = 'LogRecordWsController';

  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;
  private service: ILogRecordWsService;

  constructor(opts: IConstructor) {
    super();
    this.env = opts.env;
    this.logger = opts.logger;
    this.emitter = opts.emitter;
    this.service = opts.logRecordWsService;
  }

  public async listenDatabase(channel: string, cb: TCallback) {
    return this.service.listenDatabase(channel, cb);
  }

  public async listenQueue(cb: TCallback) {
    return this.service.listenQueue(cb);
  }
}
