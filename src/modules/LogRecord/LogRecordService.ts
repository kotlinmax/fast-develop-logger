import {TCallback} from '../../core/servers/interfaces/IWebSocketServer';
import {IProcessEnv} from '../../core/env/IEnvironment';
import {ILogger} from '../../core/loggers/ILogger';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';
import {IQueueConsumer} from '../ICommon';

interface LogRecordServiceConstructor {
  env: IProcessEnv;
  logger: ILogger;
  repository: ILogRecordRepository;
  consumer: IQueueConsumer;
}

export default class LogRecordService implements ILogRecordService {
  private env: IProcessEnv;
  private repository: ILogRecordRepository;
  private logger: ILogger;
  private consumer: IQueueConsumer;

  constructor({env, logger, repository, consumer}: LogRecordServiceConstructor) {
    this.env = env;
    this.logger = logger;
    this.repository = repository;
    this.consumer = consumer;
  }

  public get tag() {
    return 'LogRecordService';
  }

  public listenDatabase(channel: string, callback: TCallback) {
    return this.repository.listen(channel, callback);
  }

  public listenQueue(callback: TCallback) {
    return this.consumer.setCallback(callback);
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
