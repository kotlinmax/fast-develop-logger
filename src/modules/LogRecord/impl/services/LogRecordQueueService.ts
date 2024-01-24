import BaseQueueService from '../../../../bases/impl/services/BaseQueueService';

import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';
import {ILogRecordQueueService} from '../../cntr/services/ILogRecordQueueService';
import {ILogRecordSqlRepository} from '../../cntr/ILogRecordSqlRepository';
import {TServiceInfrastructure} from '../../../../infra';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {TCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {ILogRecordEvents} from '../../cntr/ILogRecordEvents';

interface IConstructor extends TServiceInfrastructure {
  logRecordRepository: ILogRecordSqlRepository;
  logRecordEvents: ILogRecordEvents;
}

export default class LogRecordQueueService extends BaseQueueService implements ILogRecordQueueService {
  readonly tag: string = 'LogRecordQueueService';

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
    // this.consumer.setCallback(callback);
  }

  public async getLogRecordById(id: string): Promise<ILogRecordEntity[]> {
    return this.repository.getById(id);
  }

  public async createLogRecord(row: ILogRecordEntity): Promise<{id: string}> {
    this.emitter.emit(this.events.LISTEN_QUEUE_CONSUMER);
    return {id: '1'};
  }

  public async createBatchLogRecords(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    return this.repository.createBatch(rows);
  }
}
