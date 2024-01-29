import DatabaseSQL from './db/DatabaseSQL';
import Environment from './env/Environment';
import Emitter from './emitter/Emitter';
import Logger from './logger/Logger';
import HttpServer from './servers/impl/HttpServer';
import WsktServer from './servers/impl/WsktServer';
import QueueServer from './servers/impl/QueueServer';

import {IDatabaseSQL} from './db/IDatabaseSQL';
import {IHttpServer} from './servers/cnrt/IHttpServer';
import {IWsktServer} from './servers/cnrt/IWsktServer';
import {IQueueServer} from './servers/cnrt/IQueueServer';
import {IEnv} from './env/IEnvironment';
import {IEmitter} from './emitter/IEmitter';
import {ILogger} from './logger/ILogger';

export type TServiceInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsktServer'>;
export type TControllerInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsktServer'>;
export type TConsumerInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsktServer'>;
export type TRouterInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsktServer'>;
export type TRepositoryInfrastructure = Omit<IInfrastructure, 'httpServer' | 'wsktServer'>;
export type TModuleInfrastructure = Omit<IInfrastructure, 'httpServer' | 'wsktServer'>;

export interface IInfrastructure {
  db: IDatabaseSQL;
  env: IEnv;
  logger: ILogger;
  emitter: IEmitter;
  httpServer: IHttpServer;
  wsktServer: IWsktServer;
  queueServer: IQueueServer;
}

const env = Environment.getEnv();
const logger = new Logger();
const emitter = new Emitter();

const httpServer = new HttpServer(logger);
const wsktServer = new WsktServer({logger, httpServer});
const queueServer = new QueueServer();

const db = new DatabaseSQL({
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  host: env.POSTGRES_SERVICE,
  password: env.POSTGRES_PASSWORD,
  port: Number(env.POSTGRES_PORT),
  max: Number(env.POSTGRES_MAX),
});

const infra: IInfrastructure = {db, env, logger, emitter, httpServer, wsktServer, queueServer};

export default infra;
