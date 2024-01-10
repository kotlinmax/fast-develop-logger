import {IBaseService} from '../cntr/IBaseService';

export default abstract class BaseService implements IBaseService {
  abstract readonly tag: string;
}
