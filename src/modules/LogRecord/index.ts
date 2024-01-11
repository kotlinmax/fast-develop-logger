import {IModuleConstructor} from '../ICommon';
import {ILogRecordModule} from './cntr/ILogRecordModule';
import {ILogRecordWsRouter} from './cntr/ILogRecordWsRouter';
import {ILogRecordHttpRouter} from './cntr/ILogRecordHttpRouter';
import {IBaseQueueConsumer} from '../../bases/cntr/IBaseQueueConsumer';

import BaseModule from '../../bases/impl/BaseModule';

import LogRecordWsRouter from './impl/LogRecordWsRouter';
import LogRecordWsController from './impl/LogRecordWsController';
import LogRecordHttpRouter from './impl/LogRecordHttpRouter';
import LogRecordHttpController from './impl/LogRecordHttpController';
import LogRecordSqlRepository from './impl/LogRecordSqlRepository';
import LogRecordHttpService from './impl/LogRecordHttpService';
import LogRecordQueueConsumer from './impl/LogRecordQueueConsumer';

export default class LogRecordModule extends BaseModule implements ILogRecordModule {
  readonly tag: string = 'LogRecordModule';

  readonly httpRouter: ILogRecordHttpRouter;
  readonly wsRouter: ILogRecordWsRouter;
  readonly consumers: IBaseQueueConsumer[];

  constructor({db, env, logger}: IModuleConstructor) {
    super();
    const repository = new LogRecordSqlRepository({env, db});
    const service = new LogRecordHttpService({env, logger, repository});

    const consumer = new LogRecordQueueConsumer({env, logger, service});
    // TODO consumerService
    // TODO httpService
    // TODO wsService

    const httpController = new LogRecordHttpController(service);
    const wsController = new LogRecordWsController(service);

    this.httpRouter = new LogRecordHttpRouter(httpController);
    this.wsRouter = new LogRecordWsRouter(wsController);

    this.consumers = [consumer];
  }
}
