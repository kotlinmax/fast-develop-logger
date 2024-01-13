import {IBaseQueueService} from '../../cntr/services/IBaseQueueService';

export default abstract class BaseQueueService implements IBaseQueueService {
  abstract readonly tag: string;
}
