import {IBaseHttpController} from '../cntr/IBaseHttpController';

export default abstract class BaseHttpController implements IBaseHttpController {
  abstract readonly tag: string;
}
