import {IBaseQueueController} from '../../cntr/controllers/IBaseQueueController';

export default abstract class BaseQueueController implements IBaseQueueController {
  abstract readonly tag: string;
}
