import {IBaseHttpController} from '../../cntr/controllers/IBaseHttpController';

export default abstract class BaseHttpController implements IBaseHttpController {
  abstract readonly tag: string;
}
