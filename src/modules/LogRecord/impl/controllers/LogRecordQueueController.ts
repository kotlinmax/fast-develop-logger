import BaseQueueController from '../../../../bases/impl/controllers/BaseQueueController';

import {TServiceInfrastructure} from './../../../../infra';
import {IHttpRequest, IHttpResponse} from '../../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordQueueController} from '../../cntr/controllers/ILogRecordQueueController';
import {ILogRecordQueueService} from '../../cntr/services/ILogRecordQueueService';
import {ILogger} from '../../../../infra/logger/ILogger';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';

interface IConstructor extends TServiceInfrastructure {
  logRecordQueueService: ILogRecordQueueService;
}

export default class LogRecordQueueController extends BaseQueueController implements ILogRecordQueueController {
  readonly tag: string = 'LogRecordQueueController';

  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;
  private service: ILogRecordQueueService;

  constructor(opts: IConstructor) {
    super();
    this.env = opts.env;
    this.logger = opts.logger;
    this.emitter = opts.emitter;
    this.service = opts.logRecordQueueService;
  }

  public async getLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }

  public async createLogRecord(raw: ILogRecordEntity): Promise<void> {
    this.service.createLogRecord(raw);
  }

  public async handleWebSocketMessage(): Promise<void> {}
}
