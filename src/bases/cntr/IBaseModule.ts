import {IDatabaseSQL} from '../../infra/db/IDatabaseSQL';
import {IProcessEnv} from '../../infra/env/IEnvironment';
import {ILogger} from '../../infra/log/ILogger';
import {IBaseHttpRouter} from './IBaseHttpRouter';
import {IBaseQueueConsumer} from './IBaseQueueConsumer';
import {IBaseWsRouter} from './IBaseWsRouter';

export interface IBaseModule {
  tag: string;
  httpRouter: IBaseHttpRouter;
  wsRouter: IBaseWsRouter;
  consumers: IBaseQueueConsumer[];
}

export interface IBaseModuleConstructor {
  logger: ILogger;
  env: IProcessEnv;
  db: IDatabaseSQL;
}
