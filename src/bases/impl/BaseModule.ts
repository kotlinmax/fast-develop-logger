import BaseClass from '..';
import {IBaseModule} from '../cntr/IBaseModule';
import {IBaseHttpRouter} from '../cntr/routes/IBaseHttpRouter';
import {IBaseQueueRouter} from '../cntr/routes/IBaseQueueRouter';
import {IBaseWsktRouter} from '../cntr/routes/IBaseWsktRouter';

export default abstract class BaseModule extends BaseClass implements IBaseModule {
  abstract readonly httpRouter: IBaseHttpRouter;
  abstract readonly wsktRouter: IBaseWsktRouter;
  abstract readonly queueRouter: IBaseQueueRouter;
}
