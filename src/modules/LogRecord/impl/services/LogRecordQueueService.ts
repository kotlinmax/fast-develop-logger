import BaseQueueService from '../../../../bases/impl/services/BaseQueueService';

import {TCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';
import {ILogRecordQueueService} from '../../cntr/services/ILogRecordQueueService';
import {ILogRecordSqlRepository} from '../../cntr/ILogRecordSqlRepository';

interface LogRecordQueueServiceConstructor {
  env: IEnv;
  logger: ILogger;
  repository: ILogRecordSqlRepository;
}

export default class LogRecordQueueService extends BaseQueueService implements ILogRecordQueueService {
  readonly tag: string = 'LogRecordQueueService';

  private repository: ILogRecordSqlRepository;
  readonly env: IEnv;
  readonly logger: ILogger;

  constructor(infra: LogRecordQueueServiceConstructor) {
    super();
    this.env = infra.env;
    this.logger = infra.logger;
    this.repository = infra.repository;
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
    throw new Error('Method not implemented.');
  }

  public async createBatchLogRecords(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    return this.repository.createBatch(rows);
  }
}
