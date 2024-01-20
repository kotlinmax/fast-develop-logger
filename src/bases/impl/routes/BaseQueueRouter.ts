import BaseClass from '../..';
import {IConsumerConfig} from '../../../infra/queue/cntr/IQueueConsumers';
import {IBaseQueueRouter} from '../../cntr/routes/IBaseQueueRouter';

export default abstract class BaseQueueRouter extends BaseClass implements IBaseQueueRouter {
  public abstract config: IConsumerConfig;
  public abstract routes: any;
}
