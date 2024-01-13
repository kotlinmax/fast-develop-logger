import {IBaseWsController} from '../../cntr/controllers/IBaseWsController';

export default abstract class BaseWsController implements IBaseWsController {
  abstract readonly tag: string;
}
