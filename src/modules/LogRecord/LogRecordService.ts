import {IProcessEnv} from '../../infrastructure/env/IEnvironment';
import {ILogger} from '../../infrastructure/loggers/ILogger';
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

  getLogRecordById(id: string): Promise<ILogRecordEntity[]> {
    return this.repository.getById(id);
  }

  createLogRecord(row: ILogRecordEntity): Promise<{id: string}> {
    throw new Error('Method not implemented.');
  }

  createBatchLogRecords(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    return this.repository.createBatch(rows);
  }
}
