import BaseWsService from '../../../../bases/impl/services/BaseWsService';

import {TCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';
import {ILogRecordWsService} from '../../cntr/services/ILogRecordWsService';
import {ILogRecordSqlRepository} from '../../cntr/ILogRecordSqlRepository';

interface LogRecordWsServiceConstructor {
  env: IEnv;
  logger: ILogger;
  repository: ILogRecordSqlRepository;
}

export default class LogRecordWsService extends BaseWsService implements ILogRecordWsService {
  readonly tag: string = 'LogRecordWsService';

  private repository: ILogRecordSqlRepository;
  private env: IEnv;
  private logger: ILogger;

  constructor({env, logger, repository}: LogRecordWsServiceConstructor) {
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
