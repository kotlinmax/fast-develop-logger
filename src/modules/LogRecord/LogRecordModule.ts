import {IQueueConsumer, IModule, IHttpRouter} from '../ICommon';
import {ILogger} from '../../infrastructure/loggers/ILogger';

import {ILogRecordController} from './interfaces/ILogRecordController';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';

import LogRecordController from './LogRecordController';
import LogRecordRepositoryPostgres from './LogRecordRepositoryPostgres';
import LogRecordRouter from './LogRecordRouter';
import LogRecordService from './LogRecordService';
import LogRecordConsumerKafka from './LogRecordConsumerKafka';

export default class LogRecordModule implements IModule {
  repository: ILogRecordRepository;
  service: ILogRecordService;
  controller: ILogRecordController;
  router: IHttpRouter;
  consumers: IQueueConsumer[];

  constructor(private logger: ILogger) {
    this.repository = new LogRecordRepositoryPostgres();
    this.service = new LogRecordService(this.repository);
    this.controller = new LogRecordController(this.service);
    this.router = new LogRecordRouter(this.controller);
    this.consumers = [new LogRecordConsumerKafka(this.logger)];
  }

  get tag() {
    return 'LogRecordModule';
  }
}
