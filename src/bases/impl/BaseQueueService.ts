import {IBaseQueueService} from '../cntr/IBaseQueueService';

export default abstract class BaseQueueService implements IBaseQueueService {
  abstract readonly tag: string;
}
