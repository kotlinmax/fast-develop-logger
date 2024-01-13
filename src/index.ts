import Environment from './infra/env/Environment';
Environment.init();

import infra from './infra';
import LogRecordModule from './modules/LogRecord';

function main() {
  [new LogRecordModule(infra)].forEach(({httpRouter, wsRouter, consumers}) => {
    consumers.forEach((consumer) => consumer.run());

    infra.httpServer.registerRoutes(httpRouter.routes);
    infra.wsServer.registerRoutes(wsRouter.routes);
  });

  infra.httpServer.start();
  infra.wsServer.start();

  process.on('unhandledRejection', (err) => {
    infra.logger.fatal(`Unhandled Rejection at: ${err}`);
  });

  process.on('uncaughtException', (err) => {
    infra.logger.fatal(`Uncaught Exception: ${err}`);
  });
}

main();
