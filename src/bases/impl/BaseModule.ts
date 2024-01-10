import {IBaseHttpRouter} from '../cntr/IBaseHttpRouter';
import {IBaseModule} from '../cntr/IBaseModule';
import {IBaseQueueConsumer} from '../cntr/IBaseQueueConsumer';
import {IBaseWsRouter} from '../cntr/IBaseWsRouter';

export default abstract class BaseModule implements IBaseModule {
  abstract readonly tag: string;
  abstract readonly httpRouter: IBaseHttpRouter;
  abstract readonly wsRouter: IBaseWsRouter;
  abstract readonly consumers: IBaseQueueConsumer[];
}
