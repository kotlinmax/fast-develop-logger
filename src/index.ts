import Environment from './infra/env/Environment';
Environment.init();

import infra from './infra';
import LogRecordModule from './modules/LogRecord';
import QueueClient from './infra/clients/impl/QueueClient';

async function startProducer() {
  try {
    const queue = new QueueClient({
      brokers: [infra.env.LOG_RECORD_CONSUMER_BROKER],
      clientId: infra.env.LOG_RECORD_CONSUMER_CLIENT_ID,
      logger: infra.logger,
    });

    let count = 0;

    setInterval(async () => {
      const msg = JSON.stringify({payload: ++count, action: 'insertLogRecord'});
      await queue.sendMsg({topic: infra.env.LOG_RECORD_CONSUMER_TOPIC, messages: [{value: msg}]});
    }, 1000);
  } catch (error) {
    infra.logger.error(`startProducer ${JSON.stringify(error)}`);
  }
}

async function main() {
  [new LogRecordModule(infra)].forEach(({httpRouter, wsktRouter, queueRouter}) => {
    infra.queueServer.registerRoutes(queueRouter);
    infra.httpServer.registerRoutes(httpRouter);
    infra.wsktServer.registerRoutes(wsktRouter);
  });

  await Promise.all([infra.queueServer.start(), infra.httpServer.start(), infra.wsktServer.start()]);
  // await startProducer();

  process.on('unhandledRejection', (err) => {
    infra.logger.fatal(`Unhandled Rejection at: ${err}`);
  });

  process.on('uncaughtException', (err) => {
    infra.logger.fatal(`Uncaught Exception: ${err}`);
  });
}

main();
