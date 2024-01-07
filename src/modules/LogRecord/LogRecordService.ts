import {IProcessEnv} from '../../core/env/IEnvironment';
import {ILogger} from '../../core/loggers/ILogger';
import {TWebSocketCallback} from '../../core/servers/interfaces/IWebSocketServer';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';

interface LogRecordServiceConstructor {
  env: IProcessEnv;
  logger: ILogger;
  repository: ILogRecordRepository;
}

export default class LogRecordService implements ILogRecordService {
  private env: IProcessEnv;
  private repository: ILogRecordRepository;
  private logger: ILogger;

  constructor({env, logger, repository}: LogRecordServiceConstructor) {
    this.env = env;
    this.logger = logger;
    this.repository = repository;
  }

  public get tag() {
    return 'LogRecordService';
  }

  public subscribeDatabaseNotification(channel: string, callback: TWebSocketCallback) {
    return this.repository.subscribeDatabaseNotification(channel, callback);
  }

  public getLogRecordById(id: string): Promise<ILogRecordEntity[]> {
    return this.repository.getById(id);
  }

  public createLogRecord(row: ILogRecordEntity): Promise<{id: string}> {
    throw new Error('Method not implemented.');
  }

  public createBatchLogRecords(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    return this.repository.createBatch(rows);
  }
}
