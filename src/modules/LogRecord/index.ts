import {IModuleConstructor} from '../ICommon';
import {ILogRecordWsRouter} from './cntr/routes/ILogRecordWsRouter';
import {ILogRecordHttpRouter} from './cntr/routes/ILogRecordHttpRouter';
import {IBaseQueueConsumer} from '../../bases/cntr/IBaseQueueConsumer';
import {ILogRecordHttpService} from './cntr/services/ILogRecordHttpService';
import {ILogRecordQueueService} from './cntr/services/ILogRecordQueueService';
import {ILogRecordWsService} from './cntr/services/ILogRecordWsService';

import BaseModule from '../../bases';
import LogRecordWsRouter from './impl/routes/LogRecordWsRouter';
import LogRecordWsController from './impl/controllers/LogRecordWsController';
import LogRecordHttpRouter from './impl/routes/LogRecordHttpRouter';
import LogRecordHttpController from './impl/controllers/LogRecordHttpController';
import LogRecordSqlRepository from './impl/LogRecordSqlRepository';
import LogRecordHttpService from './impl/services/LogRecordHttpService';
import LogRecordQueueConsumer from './impl/LogRecordQueueConsumer';
import LogRecordQueueService from './impl/services/LogRecordQueueService';
import LogRecordWsService from './impl/services/LogRecordWsService';
import LogRecordQueueController from './impl/controllers/LogRecordQueueController';

export interface ILogRecordModule extends BaseModule {}

export default class LogRecordModule extends BaseModule implements ILogRecordModule {
  readonly tag: string = 'LogRecordModule';

  readonly httpRouter: ILogRecordHttpRouter;
  readonly wsRouter: ILogRecordWsRouter;
  readonly consumers: IBaseQueueConsumer[];

  constructor(infra: IModuleConstructor) {
    super();

    // ONE REPO FOR ALL SERVICE
    const repository = new LogRecordSqlRepository(infra);

    // SERVICES
    const infraService = {...infra, repository};
    const queueService: ILogRecordQueueService = new LogRecordQueueService(infraService);
    const httpService: ILogRecordHttpService = new LogRecordHttpService(infraService);
    const wsService: ILogRecordWsService = new LogRecordWsService(infraService);

    // CONTROLLERS
    const queueController = new LogRecordQueueController(queueService);
    const httpController = new LogRecordHttpController(httpService);
    const wsController = new LogRecordWsController(wsService);

    // TODO consumer same ws (actions or type message)
    const infraConsumer = {...infra, service: queueService};
    const consumer = new LogRecordQueueConsumer(infraConsumer);

    this.httpRouter = new LogRecordHttpRouter(httpController);
    this.wsRouter = new LogRecordWsRouter(wsController);

    this.consumers = [consumer];
  }
}
