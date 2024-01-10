import {IBaseWsController} from '../cntr/IBaseWsController';

export default abstract class BaseWsController implements IBaseWsController {
  abstract readonly tag: string;
}
