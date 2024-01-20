import {IBaseClass} from '..';

export interface IBaseQueueConsumer extends IBaseClass {
  run(): Promise<void>;
}
