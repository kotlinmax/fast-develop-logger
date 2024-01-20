import {IBaseClass} from '../..';
import {IConsumerConfig} from '../../../infra/queue/cntr/IQueueConsumers';

export interface IBaseQueueRouter extends IBaseClass {
  routes: any;
  config: IConsumerConfig;
}
