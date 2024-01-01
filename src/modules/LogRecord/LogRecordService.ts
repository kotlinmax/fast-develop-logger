import {IProcessEnv} from '../../infrastructure/env/IEnvironment';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';

interface LogRecordServiceConstructor {
  env: IProcessEnv;
  repository: ILogRecordRepository;
}

export default class LogRecordService implements ILogRecordService {
  private env: IProcessEnv;
  private repository: ILogRecordRepository;

  constructor({env, repository}: LogRecordServiceConstructor) {
    this.env = env;
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
    if (rows.length > Number(this.env.BATCH_SIZE_LOG_RECORD)) {
      throw new Error(`[${this.tag}] Batch of log records for insert to database must be 100 or less`);
    }

    return this.repository.createBatch(rows);
  }
}
