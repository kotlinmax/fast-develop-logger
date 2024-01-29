import {Kafka} from 'kafkajs';
import {IBaseQueueRouter} from '../../../bases/cntr/routes/IBaseQueueRouter';
import {IQueueMsg, IQueueServer, TQueueRouterHandler} from '../cnrt/IQueueServer';

export interface IBatchQueueRoute {
  plds: IQueueMsg['payload'][];
  time: number;
}

export default class QueueServer implements IQueueServer {
  private routers: IBaseQueueRouter[] = [];

  private batchHandlersData = new Map<TQueueRouterHandler, IBatchQueueRoute>();
  private batchQueueSize = 100;
  private batchTimeInterval = 10000;

  constructor() {}

  async start() {
    this.routers.forEach(async (router) => {
      const {clientId, brokers, groupId, topic} = router.config;

      const queue = new Kafka({clientId, brokers});
      const consumer = queue.consumer({groupId, maxWaitTimeInMs: 1000, minBytes: 100000});

      await consumer.connect();
      await consumer.subscribe({topic, fromBeginning: true});

      await consumer.run({
        eachMessage: async (payload) => {
          if (payload.message.value === null) return;
          const str: string = payload.message.value.toString();
          const msg: IQueueMsg = JSON.parse(str);

          const route = router.routes[msg.action];
          if (!route) return;

          if (!route.options.isBatching) {
            route.handler(msg.payload);
            return;
          }

          const handler = this.batchHandlersData.get(route.handler);

          if (!handler) {
            this.batchHandlersData.set(route.handler, {
              plds: [msg.payload],
              time: Date.now(),
            });
            return;
          }

          handler.plds.push(msg.payload);

          const isBatchFully = handler.plds.length >= this.batchQueueSize;
          const isTimeForSave = Date.now() >= handler.time + this.batchTimeInterval;

          if (isBatchFully || isTimeForSave) {
            route.handler(handler.plds);
            this.batchHandlersData.set(route.handler, {
              plds: [],
              time: Date.now(),
            });
          }
        },
      });
    });
  }

  registerRoutes(router: IBaseQueueRouter) {
    this.routers.push(router);
  }
}
