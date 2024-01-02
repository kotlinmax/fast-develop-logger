import DatabasePostgres from './infrastructure/databases/DatabasePostgres';
import Environment from './infrastructure/env/Environment';

Environment.init();
const env = Environment.getEnv();

import Logger from './infrastructure/loggers/Logger';
import HttpServer from './infrastructure/servers/HttpServer';
import LogRecordModule from './modules/LogRecord/LogRecordModule';

const db = new DatabasePostgres({
  user: env.POSTGRES_USER,
  host: env.POSTGRES_SERVICE,
  password: env.POSTGRES_PASSWORD,
  port: Number(env.POSTGRES_PORT),
  max: Number(env.POSTGRES_MAX),
});

const logger = new Logger();
const httpServer = new HttpServer(logger);
const infrastructure = {db, env, logger};

// Create modules
const logRecordModule = new LogRecordModule(infrastructure);

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
