import {IBaseClass} from '../..';
import {IConsumerConfig, IQueueRoutes} from '../../../infra/servers/cnrt/IQueueServer';

export interface IBaseQueueRouter extends IBaseClass {
  routes: IQueueRoutes;
  config: IConsumerConfig;
}
