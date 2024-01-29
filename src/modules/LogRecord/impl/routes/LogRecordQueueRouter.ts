import BaseQueueRouter from '../../../../bases/impl/routes/BaseQueueRouter';

import {TRouterInfrastructure} from '../../../../infra';
import {ILogger} from '../../../../infra/logger/ILogger';
import {IConsumerConfig, IQueueMsg, IQueueRoutes} from '../../../../infra/servers/cnrt/IQueueServer';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';
import {ILogRecordQueueController} from '../../cntr/controllers/ILogRecordQueueController';
import {ILogRecordQueueRouter} from '../../cntr/routes/ILogRecordQueueRouter';

interface IConstructor extends TRouterInfrastructure {
  logRecordQueueController: ILogRecordQueueController;
  logger: ILogger;
}

export default class LogRecordQueueRouter extends BaseQueueRouter implements ILogRecordQueueRouter {
  readonly tag: string = 'LogRecordWsRouter';
  readonly config: IConsumerConfig;

  private controller: ILogRecordQueueController;
  private logger: ILogger;

  constructor(opts: IConstructor) {
    super();

    const consumerConfig = {
      brokers: [opts.env.LOG_RECORD_CONSUMER_BROKER],
      groupId: opts.env.LOG_RECORD_CONSUMER_GROUP_ID,
      clientId: opts.env.LOG_RECORD_CONSUMER_CLIENT_ID,
      topic: opts.env.LOG_RECORD_CONSUMER_TOPIC,
    };

    this.controller = opts.logRecordQueueController;
    this.logger = opts.logger;
    this.config = consumerConfig;
  }

  public routes: IQueueRoutes<ILogRecordEntity> = {
    insertLogRecord: {
      options: {isBatching: true},
      middlewares: [],
      handler: async (payload) => {
        if (Array.isArray(payload)) this.logger.debug(`payload.length ${payload.length}`);
        else this.controller.createLogRecord(payload);

        this.logger.debug(`payload str ${JSON.stringify(payload)}`);
      },
    },
  };
}
