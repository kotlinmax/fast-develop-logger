import {Kafka} from 'kafkajs';
import {IBaseQueueRouter} from '../../../bases/cntr/routes/IBaseQueueRouter';

export default class QueueServer {
  private routers: IBaseQueueRouter[];

  constructor() {}

  start() {
    this.routers.forEach(async (router) => {
      const {clientId, brokers, groupId, topic} = router.config;

      const queue = new Kafka({clientId, brokers});
      const consumer = queue.consumer({groupId});

      await consumer.connect();
      await consumer.subscribe({topic, fromBeginning: true});

      await consumer.run({
        eachMessage: async (payload) => {
          if (payload.message.value === null) return;

          const json: string = payload.message.value.toString();
          const msg = JSON.parse(json);
          const cb = router.routes[msg.action];

          cb();
        },
      });
    });
  }

  registerRoutes(routers: IBaseQueueRouter[]) {
    this.routers = routers;
  }
}
