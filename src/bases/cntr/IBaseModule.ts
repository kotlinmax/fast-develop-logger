import {IBaseClass} from '..';

import {IBaseHttpRouter} from './routes/IBaseHttpRouter';
import {IBaseWsktRouter} from './routes/IBaseWsktRouter';
import {IBaseQueueRouter} from './routes/IBaseQueueRouter';

export interface IBaseModule extends IBaseClass {
  httpRouter: IBaseHttpRouter;
  wsktRouter: IBaseWsktRouter;
  queueRouter: IBaseQueueRouter;
}
