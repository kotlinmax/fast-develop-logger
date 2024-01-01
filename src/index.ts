import Environment from './infrastructure/env/Environment';

Environment.init();

import Logger from './infrastructure/loggers/Logger';
import HttpServer from './infrastructure/servers/HttpServer';
import LogRecordModule from './modules/LogRecord/LogRecordModule';

const env = Environment.getEnv();
const logger = new Logger();
const httpServer = new HttpServer(logger);

// Create modules
const logRecordModule = new LogRecordModule({logger, env});

const modules = [logRecordModule];

function main() {
  modules.forEach(({router, consumers}) => {
    consumers.forEach((consumer) => consumer.run());
    httpServer.registerRoutes(router.httpRoutes);
  });

  httpServer.start();

  process.on('unhandledRejection', (err) => {
    logger.fatal(`Unhandled Rejection at: ${err}`);
  });

  process.on('uncaughtException', (err) => {
    logger.fatal(`Uncaught Exception: ${err}`);
  });
}

main();
