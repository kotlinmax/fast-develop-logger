import Environment from './infra/env/Environment';
Environment.init();

import infra from './infra';
import LogRecordModule from './modules/LogRecord';

function main() {
  [new LogRecordModule(infra)].forEach(({httpRouter, wsktRouter, queueRouter}) => {
    infra.queueServer.registerRoutes(queueRouter);
    infra.httpServer.registerRoutes(httpRouter);
    infra.wsktServer.registerRoutes(wsktRouter);
  });

  infra.queueServer.start();
  infra.httpServer.start();
  infra.wsktServer.start();

  process.on('unhandledRejection', (err) => {
    infra.logger.fatal(`Unhandled Rejection at: ${err}`);
  });

  process.on('uncaughtException', (err) => {
    infra.logger.fatal(`Uncaught Exception: ${err}`);
  });
}

main();
