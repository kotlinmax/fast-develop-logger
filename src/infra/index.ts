import DatabaseSQL from './db/DatabaseSQL';
import Environment from './env/Environment';
import Emitter from './emitter/Emitter';
import Logger from './logger/Logger';
import HttpServer from './servers/impl/httpServer';
import WsServer from './servers/impl/wsServer';

import {IDatabaseSQL} from './db/IDatabaseSQL';
import {IHttpServer} from './servers/cnrt/IHttpServer';
import {IWsServer} from './servers/cnrt/IWsServer';
import {IEnv} from './env/IEnvironment';
import {IEmitter} from './emitter/IEmitter';
import {ILogger} from './logger/ILogger';

export type TServiceInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsServer'>;
export type TControllerInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsServer'>;
export type TConsumerInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsServer'>;
export type TRouterInfrastructure = Omit<IInfrastructure, 'db' | 'httpServer' | 'wsServer'>;
export type TRepositoryInfrastructure = Omit<IInfrastructure, 'httpServer' | 'wsServer'>;
export type TModuleInfrastructure = Omit<IInfrastructure, 'httpServer' | 'wsServer'>;

export interface IInfrastructure {
  db: IDatabaseSQL;
  env: IEnv;
  logger: ILogger;
  emitter: IEmitter;
  httpServer: IHttpServer;
  wsServer: IWsServer;
}

const env = Environment.getEnv();
const logger = new Logger();
const emitter = new Emitter();
const httpServer = new HttpServer(logger);
const wsServer = new WsServer({logger, httpServer});

const db = new DatabaseSQL({
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  host: env.POSTGRES_SERVICE,
  password: env.POSTGRES_PASSWORD,
  port: Number(env.POSTGRES_PORT),
  max: Number(env.POSTGRES_MAX),
});

const infra: IInfrastructure = {db, env, logger, emitter, httpServer, wsServer};

export default infra;
