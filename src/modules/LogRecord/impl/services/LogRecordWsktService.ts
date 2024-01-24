import BaseWsktService from '../../../../bases/impl/services/BaseWsktService';

import {TCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';
import {ILogRecordWsktService} from '../../cntr/services/ILogRecordWsktService';
import {ILogRecordSqlRepository} from '../../cntr/ILogRecordSqlRepository';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {TServiceInfrastructure} from '../../../../infra';
import {ILogRecordEvents} from '../../cntr/ILogRecordEvents';

interface IConstructor extends TServiceInfrastructure {
  logRecordRepository: ILogRecordSqlRepository;
  logRecordEvents: ILogRecordEvents;
}

export default class LogRecordWsktService extends BaseWsktService implements ILogRecordWsktService {
  readonly tag: string = 'LogRecordWsktService';

  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;
  private repository: ILogRecordSqlRepository;
  private events: ILogRecordEvents;

  constructor(opts: IConstructor) {
    super();
    this.env = opts.env;
    this.logger = opts.logger;
    this.emitter = opts.emitter;
    this.repository = opts.logRecordRepository;
    this.events = opts.logRecordEvents;
  }

  public listenDatabase(channel: string, callback: TCallback) {
    return this.repository.listen(channel, callback);
  }

  public async listenQueue(callback: TCallback) {
    this.emitter.on(this.events.LISTEN_QUEUE_CONSUMER, callback);
  }

  public async getLogRecordById(id: string): Promise<ILogRecordEntity[]> {
    return this.repository.getById(id);
  }

  public async createLogRecord(row: ILogRecordEntity): Promise<{id: string}> {
    throw new Error('Method not implemented.');
  }

  public async createBatchLogRecords(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    return this.repository.createBatch(rows);
  }
}
