import {IBaseValidate} from '../cntr/IBaseValidate';

export default abstract class BaseValidate implements IBaseValidate {
  abstract readonly tag: string;
}
