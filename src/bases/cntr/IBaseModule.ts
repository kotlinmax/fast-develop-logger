import BaseClass, {IBaseClass} from '..';

import {IBaseHttpRouter} from './routes/IBaseHttpRouter';
import {IBaseQueueConsumer} from './IBaseQueueConsumer';
import {IBaseWsRouter} from './routes/IBaseWsRouter';

export interface IBaseModule extends IBaseClass {
  httpRouter: IBaseHttpRouter;
  wsRouter: IBaseWsRouter;
  consumers: IBaseQueueConsumer[];
}

export default abstract class BaseModule extends BaseClass implements IBaseModule {
  abstract readonly httpRouter: IBaseHttpRouter;
  abstract readonly wsRouter: IBaseWsRouter;
  abstract readonly consumers: IBaseQueueConsumer[];
}
