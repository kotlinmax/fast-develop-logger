import {IBaseHttpRouter} from './cntr/routes/IBaseHttpRouter';
import {IBaseQueueConsumer} from './cntr/IBaseQueueConsumer';
import {IBaseWsRouter} from './cntr/routes/IBaseWsRouter';
import {IDatabaseSQL} from '../infra/db/IDatabaseSQL';
import {IEnv} from '../infra/env/IEnvironment';
import {ILogger} from '../infra/logger/ILogger';

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
