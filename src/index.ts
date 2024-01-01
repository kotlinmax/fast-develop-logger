import Environment from './infrastructure/env/Environment';

Environment.init();

import {IQueueConsumer, IModule} from './modules/ICommon';

import PinoLogger from './infrastructure/loggers/PinoLogger';
import HttpFastifyServer from './infrastructure/servers/HttpFastifyServer';
import LogRecordModule from './modules/LogRecord/LogRecordModule';

const env = Environment.getEnv();
const logger = new PinoLogger();
const httpServer = new HttpFastifyServer(logger);

// Create modules
const logRecordModule = new LogRecordModule({logger, env});

const modules = [logRecordModule];

function main() {
  modules.forEach(({router, consumers}: IModule) => {
    consumers.forEach((consumer: IQueueConsumer) => consumer.run());
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
