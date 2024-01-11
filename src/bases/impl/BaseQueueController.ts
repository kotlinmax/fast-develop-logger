import {IBaseQueueController} from '../cntr/IBaseQueueController';

export default abstract class BaseQueueController implements IBaseQueueController {
  abstract readonly tag: string;
}
