import {IQueueConsumer, IModule, IHttpRouter, IModuleConstructor} from '../ICommon';
import {ILogRecordController} from './interfaces/ILogRecordController';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';

import LogRecordController from './LogRecordController';
import LogRecordRepository from './LogRecordRepository';
import LogRecordRouter from './LogRecordRouter';
import LogRecordService from './LogRecordService';
import LogRecordConsumer from './LogRecordConsumer';

export default class LogRecordModule implements IModule {
  repository: ILogRecordRepository;
  service: ILogRecordService;
  controller: ILogRecordController;
  router: IHttpRouter;
  consumers: IQueueConsumer[];

  constructor({logger, env}: IModuleConstructor) {
    this.repository = new LogRecordRepository({env});
    this.service = new LogRecordService({env, logger, repository: this.repository});
    this.controller = new LogRecordController(this.service);
    this.router = new LogRecordRouter(this.controller);
    this.consumers = [new LogRecordConsumer({env, logger, service: this.service})];
  }

  get tag() {
    return 'LogRecordModule';
  }
}
