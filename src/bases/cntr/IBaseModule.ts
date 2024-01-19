import {IBaseHttpRouter} from './routes/IBaseHttpRouter';
import {IBaseQueueConsumer} from './IBaseQueueConsumer';
import {IBaseWsRouter} from './routes/IBaseWsRouter';
import {IDatabaseSQL} from '../../infra/db/IDatabaseSQL';
import {IEnv} from '../../infra/env/IEnvironment';
import {ILogger} from '../../infra/logger/ILogger';

export interface IBaseModule {
  tag: string;
  httpRouter: IBaseHttpRouter;
  wsRouter: IBaseWsRouter;
  consumers: IBaseQueueConsumer[];
}

export interface IBaseModuleConstructor {
  logger: ILogger;
  env: IEnv;
  db: IDatabaseSQL;
}

export default abstract class BaseModule implements IBaseModule {
  abstract readonly tag: string;
  abstract readonly httpRouter: IBaseHttpRouter;
  abstract readonly wsRouter: IBaseWsRouter;
  abstract readonly consumers: IBaseQueueConsumer[];
}
