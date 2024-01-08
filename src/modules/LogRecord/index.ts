import {IQueueConsumer, IModule, IHttpRouter, IModuleConstructor, IWebSocketRouter} from '../ICommon';
import {ILogRecordHttpController, ILogRecordWebSocketController} from './interfaces/ILogRecordController';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';

import LogRecordController from './impl/LogRecordHttpController';
import LogRecordRepository from './impl/LogRecordRepository';
import LogRecordHttpRouter from './impl/LogRecordHttpRouter';
import LogRecordService from './impl/LogRecordService';
import LogRecordConsumer from './impl/LogRecordConsumer';
import LogRecordWebSocketController from './impl/LogRecordWebSocketController';
import LogRecordWebSocketRouter from './impl/LogRecordWebSocketRouter';

export default class LogRecordModule implements IModule {
  repository: ILogRecordRepository;
  service: ILogRecordService;

  httpController: ILogRecordHttpController;
  httpRouter: IHttpRouter;

  wsController: ILogRecordWebSocketController;
  wsRouter: IWebSocketRouter;

  consumers: IQueueConsumer[];

  constructor({db, env, logger}: IModuleConstructor) {
    const consumer = new LogRecordConsumer({env, logger, service: this.service});

    this.repository = new LogRecordRepository({env, db});
    this.service = new LogRecordService({env, logger, consumer, repository: this.repository});

    this.httpController = new LogRecordController(this.service);
    this.httpRouter = new LogRecordHttpRouter(this.httpController);

    this.wsController = new LogRecordWebSocketController(this.service);
    this.wsRouter = new LogRecordWebSocketRouter(this.wsController);

    this.consumers = [consumer];
  }

  get tag() {
    return 'LogRecordModule';
  }
}
