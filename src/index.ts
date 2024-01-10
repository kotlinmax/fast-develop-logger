import DatabaseSQL from './infra/db/DatabaseSQL';
import Environment from './infra/env/Environment';

Environment.init();
const env = Environment.getEnv();

import Logger from './infra/log/Logger';
import HttpServer from './infra/servers/impl/httpServer';
import WsServer from './infra/servers/impl/wsServer';
import LogRecordModule from './modules/LogRecord';

const db = new DatabaseSQL({
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  host: env.POSTGRES_SERVICE,
  password: env.POSTGRES_PASSWORD,
  port: Number(env.POSTGRES_PORT),
  max: Number(env.POSTGRES_MAX),
});

const logger = new Logger();

const httpServer = new HttpServer(logger);
const wsServer = new WsServer({logger, httpServer});

// Create modules
const logRecordModule = new LogRecordModule({db, env, logger});

const modules = [logRecordModule];

function main() {
  modules.forEach(({httpRouter, wsRouter, consumers}) => {
    consumers.forEach((consumer) => consumer.run());
    httpServer.registerRoutes(httpRouter.routes);
    wsServer.registerRoutes(wsRouter.routes);
  });

  httpServer.start();
  wsServer.start();

  process.on('unhandledRejection', (err) => {
    logger.fatal(`Unhandled Rejection at: ${err}`);
  });

  process.on('uncaughtException', (err) => {
    logger.fatal(`Uncaught Exception: ${err}`);
  });
}

main();
