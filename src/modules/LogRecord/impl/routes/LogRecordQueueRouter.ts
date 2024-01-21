import BaseQueueRouter from '../../../../bases/impl/routes/BaseQueueRouter';

import {TRouterInfrastructure} from '../../../../infra';
import {IConsumerConfig, IQueueRoutes} from '../../../../infra/servers/cnrt/IQueueServer';
import {ILogRecordQueueController} from '../../cntr/controllers/ILogRecordQueueController';
import {ILogRecordQueueRouter} from '../../cntr/routes/ILogRecordQueueRouter';

interface IConstructor extends TRouterInfrastructure {
  logRecordQueueController: ILogRecordQueueController;
}

export default class LogRecordQueueRouter extends BaseQueueRouter implements ILogRecordQueueRouter {
  readonly tag: string = 'LogRecordWsRouter';
  readonly config: IConsumerConfig;

  private controller: ILogRecordQueueController;

  constructor(opts: IConstructor) {
    super();

    const consumerConfig = {
      brokers: [opts.env.LOG_RECORD_CONSUMER_BROKER],
      groupId: opts.env.LOG_RECORD_CONSUMER_GROUP_ID,
      clientId: opts.env.LOG_RECORD_CONSUMER_CLIENT_ID,
      topic: opts.env.LOG_RECORD_CONSUMER_TOPIC,
    };

    this.controller = opts.logRecordQueueController;
    this.config = consumerConfig;
  }

  public get routes(): IQueueRoutes {
    return {
      insertLogRecord: {
        options: {isBatching: true},
        middlewares: [],
        handler: async () => {
          console.log('some-other-action');
        },
      },
    };
  }
}
