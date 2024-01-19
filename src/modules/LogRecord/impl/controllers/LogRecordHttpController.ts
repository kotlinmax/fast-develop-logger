import BaseHttpController from '../../../../bases/impl/controllers/BaseHttpController';

import {TControllerInfrastructure} from '../../../../infra';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {IHttpRequest, IHttpResponse} from '../../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordHttpController} from '../../cntr/controllers/ILogRecordHttpController';
import {ILogRecordHttpService} from '../../cntr/services/ILogRecordHttpService';

interface IConstructor extends TControllerInfrastructure {
  logRecordHttpService: ILogRecordHttpService;
}

export default class LogRecordHttpController extends BaseHttpController implements ILogRecordHttpController {
  readonly tag: string = 'LogRecordHttpController';

  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;
  private service: ILogRecordHttpService;

  constructor(opts: IConstructor) {
    super();
    this.env = opts.env;
    this.logger = opts.logger;
    this.emitter = opts.emitter;
    this.service = opts.logRecordHttpService;
  }

  public async getLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }

  public async createLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }

  public async handleWebSocketMessage(): Promise<void> {}
}
