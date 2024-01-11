import BaseHttpService from '../../../bases/impl/BaseHttpService';

import {TCallback} from '../../../infra/servers/cnrt/IWsServer';
import {IProcessEnv} from '../../../infra/env/IEnvironment';
import {ILogger} from '../../../infra/log/ILogger';
import {IBaseQueueConsumer} from '../../../bases/cntr/IBaseQueueConsumer';

import {ILogRecordEntity} from '../cntr/ILogRecordEntity';
import {ILogRecordHttpService} from '../cntr/ILogRecordHttpService';
import {ILogRecordSqlRepository} from '../cntr/ILogRecordSqlRepository';

interface LogRecordHttpServiceConstructor {
  env: IProcessEnv;
  logger: ILogger;
  repository: ILogRecordSqlRepository;
}

export default class LogRecordHttpService extends BaseHttpService implements ILogRecordHttpService {
  readonly tag: string = 'LogRecordHttpService';

  private repository: ILogRecordSqlRepository;
  private env: IProcessEnv;
  private logger: ILogger;

  constructor({env, logger, repository}: LogRecordHttpServiceConstructor) {
    super();
    this.env = env;
    this.logger = logger;
    this.repository = repository;
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
