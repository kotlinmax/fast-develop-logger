import {IBaseQueueProducer} from '../cntr/IBaseQueueProducer';

export default abstract class BaseQueueProducer implements IBaseQueueProducer {
  abstract readonly tag: string;
}
